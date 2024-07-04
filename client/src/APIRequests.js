import { allFaces } from "face-api.js";

export class APIRequests {

    async postRequest(url, body) {
        //const token = document.cookie(['x-access-token'])
        try {
            const response = await fetch('http://localhost:8082' + url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                return response;
            } 
            else {
              throw({errorCode:response.status,errorText:response.statusText})
            }
        } catch (error) {
            alert(error.errorText);
        };
    }

    async getRequest(url) {
        const cookies = document.cookie;
        //alert(cookies)
        const token = cookies.split(';').find(cookie => cookie.trim().startsWith('x-access-token'));
        //alert(token)
        try {
            const response = await fetch('http://localhost:8082' + url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response;
        } catch (error) {
            throw error;
        };
    }

    async putRequest(url, body) {
        try {
            const response = await fetch('http://localhost:8082' + url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            return response;
        } catch (error) {
            throw error;
        };

    }

}
