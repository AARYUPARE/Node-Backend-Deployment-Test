const z = require("zod")

const userCreateRequestSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    gender: z.string(),
    password: z.string().min(8)
})

const userUpdateRequestSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(10),
    gender: z.string().optional(),
    password: z.string().min(8).optional()
})

module.exports = {
    userCreateRequestSchema,
    userUpdateRequestSchema
}