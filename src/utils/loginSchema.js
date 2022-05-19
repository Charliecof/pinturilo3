import * as Yup from 'yup'

export const schema = Yup.object({
	email: Yup.string().required('Mail required'),
	password: Yup.string().required('Wrong password')
})

export const signInSchema = Yup.object({
	name: Yup.string().required('Required Field'),
	lastname: Yup.string().required('Required Field'),
	email: Yup.string().required('Required Field'),
	password: Yup.string().required('Required Field').min(8,'Minimum length 8'),
})
