const z = require("zod")

const contentCreateSchema = z.object({
    userId: z.coerce.number().int().positive(),
    contentUrl: z.string(),
    contentType: z.enum(["POST", "REEL", "STORY"])
})

module.exports = {
    contentCreateSchema
}