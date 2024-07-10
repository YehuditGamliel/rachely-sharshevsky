import { Cookie } from "@mui/icons-material";
import { allFaces } from "face-api.js";


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
            if (!response.ok) {
                const errorData = await response.json();
                 throw new Error(errorData.error);
            }
            return response;
        } catch (error) {
            throw error;
        }
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
            if (!response.ok) {
                const errorData = await response.json();
                 throw new Error(errorData.error);
            }
            return response;
    
        } catch (error) {
            throw error;
        }
    }

    async putRequest(url, body) {
        try {
            const response = await fetch('http://localhost:8082' + url, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                     'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                const errorData = await response.json();
                 throw new Error(errorData.error);
            }
            return response;
    
        } catch (error) {
            throw error;
        }
    }

}
