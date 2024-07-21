import React from 'react';
import axios from 'axios';

export default async function Get_Del(id) {
    const token = localStorage.getItem("authToken");
    try {
        await axios.delete(
            "http://localhost:3001/deletetodo",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    element_id: id
                }
            }
        );
    } catch (error) {
        console.error("Failed to delete todo:", error);
    }
}