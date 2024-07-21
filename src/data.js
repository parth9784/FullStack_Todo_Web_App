import axios from 'axios';

export default async function fetchTodos() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.log("No token found. Please log in.");
            return;
        }
        const response = await axios.get('http://localhost:3001/gettodo', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:',error);
    }
}
