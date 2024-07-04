
// helper function for connecting to php

export const HelperThunkFunction = async (url, method, body, isFormData = false) => {
    try {
        let temp = {};
        if (method === 'GET') {
            temp = {
                method: method, 
            }
        }
        else if (method === 'POST'){
            temp = {
                method: method,
                headers: isFormData ? {} : { 'Content-Type': 'application/json' },
                body: isFormData ? body : JSON.stringify(body),
            }
        }
        const res = await fetch(`http://localhost/reviewerwebapp/server/${url}`, temp);
       
        return await res.json();

    } catch (error) {
        console.log('Error', error);
        throw error;
    }
};