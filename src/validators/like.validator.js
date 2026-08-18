const z = require("zod")

const likeRequestSchema = z.object({
    contentId: z.coerce.number().int().positive(),
    userId: z.coerce.number().int().positive()
})

const undoLikeRequestDTO = z.object({
    contentId: z.coerce.number().int().positive(),
    userId: z.coerce.number().int().positive()
})

module.exports = {
    likeRequestSchema,
    undoLikeRequestDTO
}