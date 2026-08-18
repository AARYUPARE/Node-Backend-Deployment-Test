const z = require("zod")

const authLoginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16)
})

module.exports ={ 
    authLoginRequestSchema
}