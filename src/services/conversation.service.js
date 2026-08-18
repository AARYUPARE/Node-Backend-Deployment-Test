const prisma = require("../configs/prisma")
const ResourseNotFoundException = require("../exceptions/ResourseNotFoundException");
const ValidationError = require("../exceptions/ValidationError");
const userService = require("../services/user.service")

const createConversation = async (conversationCreateRequestDTO, tx = prisma) => {
    if (conversationCreateRequestDTO.type === "PERSONAL") {
        const existingConversation = await tx.conversation.findFirst({
            where: {
                type: "PERSONAL",

                AND: [
                    {
                        conversationMemberRelation: {
                            some: {
                                userId: conversationCreateRequestDTO.members[0].userId
                            }
                        }
                    },
                    {
                        conversationMemberRelation: {
                            some: {
                                userId: conversationCreateRequestDTO.members[1].userId
                            }
                        }
                    }
                ]
            }
        });

        if (existingConversation !== null)
            return;
    }

    const conversationToSave = {
        name: conversationCreateRequestDTO.name,
        type: conversationCreateRequestDTO.type
    };

    const membersToAdd = [...conversationCreateRequestDTO.members];

    const fullConversation = await prisma.$transaction(async (tx) => {
        const conversation = await tx.conversation.create({
            data: conversationToSave
        })

        const members = []

        for (let i = 0; i < membersToAdd.length; i++) {
            const member = await tx.conversationMember.create({
                data: {
                    conversationId: conversation.id,
                    userId: membersToAdd[i].userId,
                    role: membersToAdd[i].role
                }
            });

            members.push(member);
        }

        return mapToConversationResponseDTO(conversation, members);
    })

    return fullConversation;
}

const getConversationById = async (conversationId, tx = prisma) => {
    const conversation = await tx.conversation.findUnique({
        where: {
            id: conversationId
        }
    })

    const members = await tx.conversationMember.findMany({
        where: {
            conversationId
        },
    })

    return await mapToDetailedConversationResponseDTO(conversation, members)
}

const getUserConversation = async (userId, tx = prisma) => {
    const conversations = await tx.conversation.findMany({
        where: {
            conversationMemberRelation: {
                some: {
                    userId
                }
            },
        },
        include: {
            conversationMemberRelation: true
        }
    });

    let userConversations = [];

    for (let i = 0; i < conversations.length; i++) {
        if (conversations[i].type == "GROUP") {
            const group = {
                name: conversations[i].name,
                type: conversations[i].type
            }
            userConversations.push(group);
        }
        else {
            let member1 = conversations[i].conversationMemberRelation[0];
            let member2 = conversations[i].conversationMemberRelation[1];

            const members = [member1, member2];

            const personalChat = await mapToDetailedConversationResponseDTO(conversations[i], members);

            userConversations.push(personalChat);
        }
    }

    return userConversations;
}

const deleteConversation = async (conversationId, tx = prisma) => {
    const conversation = await tx.conversation.findUnique({
        where: {
            id: conversationId
        }
    })

    if (conversation === null)
        throw new ResourseNotFoundException("Conversation Not found");

    return await tx.conversation.delete({
        where: {
            id: conversationId
        }
    })
}

const addMember = async (memberAddingRequestDTO, tx = prisma) => {
    const conversation = await tx.conversation.findUnique({
        where: {
            id: memberAddingRequestDTO.conversationId
        }
    })

    if (conversation === null)
        throw new ResourseNotFoundException("Conversation Not found");

    const member = await tx.conversationMember.create({
        data: {
            conversationId: conversation.id,
            userId: memberAddingRequestDTO.memberId,
            role: memberAddingRequestDTO.role
        }
    })

    return mapToConversationResponseDTO(conversation, member)
}

const removeMember = async (removeMemberRequestDTO, tx = prisma) => {
    const conversation = await tx.conversation.findUnique({
        where: {
            id: removeMemberRequestDTO.conversationId
        }
    })

    if (conversation === null)
        throw new ResourseNotFoundException("Conversation Not found");

    const member = await tx.conversationMember.findUnique({
        where: {
            conversationId_userId: {
                conversationId: removeMemberRequestDTO.conversationId,
                userId: removeMemberRequestDTO.userId
            }
        }
    })

    if (member === null)
        throw new ResourseNotFoundException("User with id " + removeMemberRequestDTO.userId + " is not part of the " + conversation.name + " converstion");

    return await tx.conversationMember.delete({
        where: {
            conversationId_userId: {
                conversationId: removeMemberRequestDTO.conversationId,
                userId: removeMemberRequestDTO.userId
            }
        }
    });
}

const getOrCreatePersonalConversation = async (conversationId, member1Id, member2Id, tx = prisma) => {

    let existing = null;

    if(conversationId !== null)
    {
        existing = await tx.conversation.findUnique({
            where: {
                id: conversationId
            }
        })
    }

    if (existing !== null)
        return existing;

    if(member1Id !== null && member2Id !== null)
    {
        existing = await tx.conversation.findFirst({
            where: {
                type: "PERSONAL",
                AND : [
                    {
                        conversationMemberRelation: {
                            some:{
                                userId: member1Id
                            }
                        }
                    },
                    {
                        conversationMemberRelation:{
                            some:{
                                userId: member2Id
                            }
                        }
                    }
                ]
            }
        })
    }
    else
    {
        throw new ResourseNotFoundException("Both Sender and Receiver Ids needed");
    }

    if (existing !== null)
        return existing;


    const conversationCreateRequestDTO = {
        type: "PERSONAL",
        members: [
            {
                userId: member1Id,
                role: "MEMBER"
            },
            {
                userId: member2Id,
                role: "MEMBER"
            }
        ]
    }

    return await createConversation(conversationCreateRequestDTO);
}

const mapToConversationResponseDTO = (conversation, members) => {
    return {
        ...conversation,
        members
    }
}

const mapToDetailedConversationResponseDTO = async (conversation, members) => {
    let detailedConvsersation = {
        name: conversation.name,
        type: conversation.type,
        members: []
    }

    for (let i = 0; i < members.length; i++) {
        const user = await userService.getUserById(members[i].userId);
        detailedConvsersation.members.push({
            role: members[i].role,
            user
        })
    }

    return detailedConvsersation;
}

const convsersationService = {
    createConversation,
    deleteConversation,
    getConversationById,
    getUserConversation,
    addMember,
    removeMember,
    getOrCreatePersonalConversation
}

module.exports = convsersationService;