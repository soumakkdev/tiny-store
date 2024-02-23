import { customAlphabet } from 'nanoid'

export const formatCurrency = (num: number) => {
	return `₹ ${num.toLocaleString('en-IN')}`
}

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)
export function getId() {
	return nanoid()
}
