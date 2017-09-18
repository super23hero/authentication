class RequestService {

	create(url, data) {
		return axios.post(API_URL+url, data);
	}

	retrieve(url, id, filters) {
		let config = {
		  params: filters || {}
    };

		if(id) {
			url = url+'/'+id;
		}

		return axios.get(API_URL+url, config);
	}

	update(url, id, data) {

		return axios.put(API_URL+url+'/'+id, data);
	}

	delete(url, id) {
		return axios.delete(API_URL+url+'/'+id);
	}
}

export default RequestService;
