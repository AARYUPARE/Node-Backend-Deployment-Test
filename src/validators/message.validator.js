const z = require("zod")

const addMessageRequestSchema = z.object({
    conversationId: z.coerce.number().int().positive(),
    senderId: z.coerce.number().int().positive(),
    receiverId: z.coerce.number().int().positive().optional(),
    message: z.string().nonempty()
})

module.exports = {
    addMessageRequestSchema
}