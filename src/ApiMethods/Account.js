export const API_BASE_URL = 'http://localhost:8080/api';
//export const API_BASE_URL = 'https://jwaexpensemanagerserver.herokuapp.com/api';
export const ACCESS_TOKEN = 'accessToken';
export const REDUX_TOKEN = 'reduxState';

export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            return json;
        })
    ).catch(function() {
        return ({failed: true})
    });
};

export const signup = (signupRequest) => {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export const signin = (signinRequest) => {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(signinRequest)
    });
}

export const UsernameAvailabile =(username) => {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailable?username=" + username,
        method: 'GET'
    });
}

export const EmailAvailabile = (email)=> {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailable?email=" + email,
        method: 'GET'
    });
}

export const TaskNameAvailability = (task)=> {
    return request({
        url: API_BASE_URL + "/items/task?name=" + task,
        method: 'GET'
    });
}

export const getCurrentUser = () => {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export const CreateItem = (Item) => {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/items",
        method: 'POST',
        body: JSON.stringify(Item)
    }
    );
}

export const GetItems = () => {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/items",
        method: 'GET'
    });
}

export const UpdateItems = (Item) => {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/items",
        method: 'PUT',
        body: JSON.stringify(Item)
    });
}


export const DeleteItem = (Item) => {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/items",
        method: 'DELETE',
        body: JSON.stringify(Item)
    });
}
