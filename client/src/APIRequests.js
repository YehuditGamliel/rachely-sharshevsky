export class APIRequests {

    async postRequest(url, body) {
        try {
            const response = await fetch('http://localhost:8082' + url, {
                method: 'POST',
                credentials: 'include',
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

    async getRequest(url) {
        try {
            const response = await fetch('http://localhost:8082' + url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
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
