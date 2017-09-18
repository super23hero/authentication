import Auth from './Auth'

class RequestService {
	
	constructor() {
        this.config = Auth.getAuthHeader();
	}

	create(url, data) {
		return axios.post(API_URL+url, data, this.config);
	}

	retrieve(url, id, filters) {
		let methodConfig = this.config;

        methodConfig.params = filters || {};

		if(id) {
			url = url+'/'+id;
		}

		return axios.get(API_URL+url, methodConfig);
	}

	update(url, id, data) {

		return axios.put(API_URL+url+'/'+id, data, this.config);
	}

	delete(url, id) {
		return axios.delete(API_URL+url+'/'+id, this.config);
	}
}

export default RequestService;
