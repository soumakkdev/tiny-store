import z from 'zod'

const ZLoginParams = z.object({
	email: z.string().email(),
	password: z.string(),
})
export type ILoginParams = z.infer<typeof ZLoginParams>

const ZSignUpReqBody = z.object({
	uid: z.string(),
	name: z.string(),
	email: z.string().email(),
	phoneNo: z.string(),
})
export type ISignUpReqBody = z.infer<typeof ZSignUpReqBody>

const ZSignUpFormFields = z.object({
	name: z.string(),
	email: z.string().email(),
	phoneNo: z.string(),
	password: z.string(),
})
export type ISignUpFormFields = z.infer<typeof ZSignUpFormFields>
