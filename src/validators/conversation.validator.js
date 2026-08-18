const z = require("zod")

const roles = ["MEMBER", "ADMIN"]

const conversationCreateRequestSchema = z.object({
    type: z.enum(["PERSONAL", "GROUP"]),
    name: z.string().optional(),
    members: z.array(z.object({
        userId: z.coerce.number().int().positive(),
        role: z.enum(roles).default("MEMBER")
    })).min(1)
}).refine(
    data => !(data.type === "GROUP" && data.name === undefined),
    {
        message: "Name is required for group conversations",
        path: ["name"]
    }
);

const membersAddingRequestSchema = z.object({
    conversationId: z.coerce.number().int().positive(),
    members: z.array(z.object({
        userId: z.coerce.number().int().positive(),
        role: z.enum(roles).default("MEMBER")
    })).min(1),
})

const removeMemerRequestSchema = z.object({
    conversationId: z.coerce.number().int().positive(),
    userId: z.coerce.number().int().positive()
})

module.exports = {
    conversationCreateRequestSchema,
    membersAddingRequestSchema,
    removeMemerRequestSchema
};