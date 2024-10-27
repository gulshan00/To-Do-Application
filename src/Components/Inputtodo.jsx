import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InputTodo() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todos');
        console.log('API Response:', response.data); // Log the API response for debugging

        // Filter out todos with null descriptions
        const validTodos = response.data.filter(todo => todo.description !== null && todo.description.trim() !== '');
        setTodos(validTodos); // Set the valid todos
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
        toast.error("Please add your task!");
        return;
    }

    try {
        if (editId) {
            await axios.put(`http://localhost:5000/todos/${editId}`, { description: input });
            setTodos(todos.map((todo) => (todo.todo_id === editId ? { ...todo, description: input } : todo)));
            setEditId(null);
            toast.success("Todo updated successfully!");
        } else {
            const response = await axios.post('http://localhost:5000/todos', { description: input });
            console.log('Response from POST:', response.data); // Log response
            setTodos([...todos, response.data]);
            toast.success("Todo added successfully!");
        }
        setInput('');
    } catch (error) {
        console.error('Error adding/updating todo:', error);
        toast.error("Failed to add/update todo.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.todo_id !== id));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error("Failed to delete todo.");
    }
  };

  const handleEdit = (id, description) => {
    setEditId(id);
    setInput(description);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-600 p-4 flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-center text-3xl font-bold underline text-white mt-10 mb-4">To-Do List Application</h1>

      <form onSubmit={handleSubmit} className="flex justify-center gap-2 mb-4 w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new task"
          className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      <div className="mt-6 w-full max-w-md">
        <h2 className="text-center font-semibold text-lg mb-4 text-white">Tasks</h2>
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li key={todo.todo_id} className="border p-2 rounded bg-white shadow-sm flex justify-between items-center">
              <span className="flex-1">{index + 1}. {todo.description}</span> {/* Display serial number */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(todo.todo_id, todo.description)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.todo_id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InputTodo;
