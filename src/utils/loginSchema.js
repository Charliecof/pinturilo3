import * as Yup from 'yup'

export const schema = Yup.object({
	email: Yup.string().required('Mail required'),
	password: Yup.string().required('Wrong password')
})
