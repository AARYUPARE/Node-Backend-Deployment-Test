const { includes } = require("zod");
const prisma = require("../configs/prisma")
const userService = require("../services/user.service")

const followUser = async (followRequestDTO) => 
{
    let follow = await prisma.follow.create({
        data: followRequestDTO
    })

    return follow;
}

const unfollowUser = async (unfollowRequestDTO) =>
{
    const {followerId, followingId} = unfollowRequestDTO;

    return await prisma.follow.delete({
        where: {
            followerId_followingId : {
                followerId,
                followingId
            }
        }
    })
}

const getUserFollowersById = async (id) => {
    let followers = await prisma.follow.findMany({
        where: {
            followingId: id
        },

        include:{
            follower: true
        }
    }) || [];
    return followers.map(follow => userService.userToUserResposeDTO(follow.follower));
}

const getUserFollowingById = async (id) => {
    let following = await prisma.follow.findMany({
        where:{
            followerId: id
        },
        include: {
            following: true
        }
    })

    return following.map(follow => userService.userToUserResposeDTO(follow.following))
}

module.exports = {
    followUser,
    unfollowUser,
    getUserFollowersById,
    getUserFollowingById
}