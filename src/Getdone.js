import React from 'react'
import axios from 'axios';
export default async function Getdone(id){
        const token = localStorage.getItem("authToken");
        try {
            await axios.patch(
                "http://localhost:3001/getdone",
                { element_id: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }
         catch (error) {
            console.error("Failed to change todo:", error);
        }
}