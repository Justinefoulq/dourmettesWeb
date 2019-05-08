import Api from '@/services/Api'

/*eslint-disable*/


export default {
	register (credentials){
		return Api().post('register', credentials)
	}
}