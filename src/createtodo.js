import React from 'react'
import axios from 'axios';
export default async function CreateTodo(){
    const val = document.getElementById("input").value;
        const token = localStorage.getItem("authToken"); 
    
        try {
            await axios.post(
                "http://localhost:3001/createtodo",
                { todo: val },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            document.getElementById("input").value = '';
        }
         catch (error) {
            console.error("Failed to create todo:", error);
        }
}