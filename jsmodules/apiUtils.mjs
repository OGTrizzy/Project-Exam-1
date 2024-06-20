/**
 * api request
 * @param {string} url
 * @param {string} method
 * @param {string} [accessToken]
 * @param {Object} [body]
 * @returns {Promise<Object>}
 */
export async function performApiRequest(url, method, accessToken = null, body = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (accessToken) {
        options.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

/**
 * get data from api
 * @param {string} endpoint
 * @param {string} accessToken
 * @returns {Promise<Object>}
 */
export async function getData(endpoint, accessToken) {
    const url = `https://v2.api.noroff.dev/blog/posts/${endpoint}`;
    return performApiRequest(url, 'GET', accessToken);
}

/**
 * post to api
 * @param {string} endpoint
 * @param {Object} body
 * @param {string} accessToken
 * @returns {Promise<Object>} 
 */
export async function postData(endpoint, body, accessToken = null) {
    let url;
    if (endpoint === 'register' || endpoint === 'login') {
        url = `https://v2.api.noroff.dev/auth/${endpoint}`;
    } else {
        url = `https://v2.api.noroff.dev/blog/posts/${endpoint}`;
    }

    console.log(`POST URL: ${url}`);
    return performApiRequest(url, 'POST', accessToken, body);
}

/**
 * update post in api
 * @param {string} endpoint
 * @param {Object} body
 * @param {string} accessToken
 * @returns {Promise<Object>}
 */
export async function updateData(endpoint, body, accessToken) {
    const url = `https://v2.api.noroff.dev/blog/posts/${endpoint}`;
    return performApiRequest(url, 'PUT', accessToken, body);
}

/**
 * delete data from api
 * @param {string} endpoint
 * @param {string} accessToken
 * @returns {Promise<Object>}
 */
export async function deleteData(endpoint, accessToken) {
    const url = `https://v2.api.noroff.dev/blog/posts/${endpoint}`;
    return performApiRequest(url, 'DELETE', accessToken);
}

/*get specific api data*/
export async function fetchPostData(postId) {
    const user = 'Tristian';
    const url = `https://v2.api.noroff.dev/blog/posts/${user}/${postId}`;
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch post data');
    }

    const data = await response.json();
    return data.data;
}

