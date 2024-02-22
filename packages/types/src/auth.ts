import z from 'zod'

const ZLoginParams = z.object({
	email: z.string().email(),
	password: z.string(),
})
export type ILoginParams = z.infer<typeof ZLoginParams>
