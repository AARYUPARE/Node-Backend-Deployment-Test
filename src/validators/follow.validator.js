const z = require("zod")

const followRequestSchema = z.object({
    followerId: z.coerce.number().int().positive(),
    followingId: z.coerce.number().int().positive()
})

const unfollowRequestSchema = z.object({
    followerId: z.coerce.number().int().positive(),
    followingId: z.coerce.number().int().positive() 
})

module.exports = {
    followRequestSchema,
    unfollowRequestSchema
}