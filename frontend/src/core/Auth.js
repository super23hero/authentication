import router from '../router'

// URL and endpoint constants
const LOGIN_URL = API_URL + 'auth'
// const SIGNUP_URL = API_URL + 'users/'

// Set config defaults when creating the instance
var authAxiosInstance = axios.create({
    baseURL: LOGIN_URL
});

// Alter defaults after instance has been created
// authAxiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
authAxiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

module.exports =  {

    // User object will let us check authentication status
    user: {
        authenticated: false
    },

    // Send a request to the login URL and save the returned JWT
    login(creds, redirect) {
        return authAxiosInstance.post(LOGIN_URL, creds, {'Content-Type':'application/x-www-form-urlencoded'})
            .then((response) => {
                let data = response.data;
                // localStorage.setItem('id_token', data.id_token)
                localStorage.setItem('access_token', data.token);

                this.user.authenticated = true;

                // Redirect to a specified route
                if(redirect) {
                    router.push(redirect);
                }
            })
            .catch((response) => {
                console.log(response);
            });
    },

    signup(context, creds, redirect) {
        context.$http.post(SIGNUP_URL, creds, (data) => {
            // localStorage.setItem('id_token', data.id_token)
            localStorage.setItem('access_token', data.access_token);

            this.user.authenticated = true;

            if(redirect) {
                router.push(redirect);
            }

        }).error((err) => {
            context.error = err
        })
    },

    // To log out, we just need to remove the token
    logout(redirect) {
        // localStorage.removeItem('id_token')
        localStorage.removeItem('access_token')
        this.user.authenticated = false
        router.push(redirect);
    },

    checkAuth() {
        let token = localStorage.getItem('access_token')
        if(token) {
            this.user.authenticated = true
        }
        else {
            this.user.authenticated = false
        }
    },

    // The object to be passed as a header for authenticated requests
    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    }
}