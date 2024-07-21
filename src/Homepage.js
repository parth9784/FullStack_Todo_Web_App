import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchTodos from './data'; 
import Navbar from './Navbar';
import Todoitem from './todoitem';
import CreateTodo from './createtodo';
import Getdone from './Getdone';
import Get_Del from './Get_Del';
import Loading from './Loading';

export default function Homepage() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [input, setInput] = useState(false);
    const [change, setChange] = useState(false);
    const navi = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navi('/signup');
        } else {
            const getTodos = async () => {
                try {
                    const data = await fetchTodos(token); // Ensure token is passed if needed
                    setTodos(data || []);
                } catch (err) {
                    setError('Failed to fetch todos');
                } finally {
                    setLoading(false);
                }
            };
            getTodos();
        }
    }, [navi, change]);

    async function handlechange(id) {
        await Getdone(id);
        setChange(!change);
    }

    async function handledel(id) {
        await Get_Del(id);
        setChange(!change);
    }

    async function handlesave() {
        const val = document.getElementById("input").value;
        await CreateTodo(val);
        setChange(!change);
    }

    function handlecancel() {
        setInput(false);
    }

    function handleinput() {
        setInput(true);
    }

    if (loading) {
        return <Loading/>
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Navbar />
            <div className='m-10'>
                <h1 className='popsemi text-3xl'>Things to get done</h1>
                <h3 className='popr text-xl mt-4 font-semibold'>Things to do</h3>
                <ul id="todo-list" className="mt-1">
                    {todos.length > 0 ? todos.map(p => {
                        if (!p.status) {
                            return (
                                <Todoitem 
                                    key={p._id} 
                                    title={p.todo} 
                                    checked={p.status} 
                                    id={p.element_id} 
                                    handlechange={handlechange} 
                                    handledel={handledel} 
                                />
                            );
                        }
                        return null;
                    }) : <p className='popr mb-1'>Your day is clear! Add a task to make things happen.</p>}
                </ul>
                {input ? (
                    <div className='h-[160px] rounded shadow-lg'>
                        <h2 className='pop font-semibold text-xl ml-6 mt-4'>Create a Todo</h2>
                        <input type="text" id="input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[250px] ml-5 mt-3 p-2.5" placeholder='Enter a Todo' />
                        <div className='flex gap-4 mt-4 ml-4'>
                            <button type="button" onClick={handlesave} className="popr font-semibold text-white bg-yellow-500 hover:bg-yellow-600  rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Save</button>
                            <button type="button" onClick={handlecancel} className="popr font-semibold border border-black bg-white rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Cancel</button>
                        </div>
                    </div>
                ) : (
                    <button type="button" onClick={handleinput} className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">+ Add a Todo</button>
                )}
                <h3 className='font-semibold text-xl mt-4'>Things Done</h3>
                <ul className="mt-1" id="completed-list">
                    {todos.length > 0 ? todos.map(p => {
                        if (p.status) {
                            return (
                                <Todoitem 
                                    key={p._id} 
                                    title={p.todo} 
                                    checked={p.status} 
                                    id={p.element_id} 
                                    handlechange={handlechange} 
                                    handledel={handledel} 
                                />
                            );
                        }
                        return null;
                    }) : <p></p>}
                </ul>
            </div>
        </div>
    );
}
