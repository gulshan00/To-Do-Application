// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function InputTodo() {
//   const [input, setInput] = useState('');
//   const [todos, setTodos] = useState([]);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/todos');
//         console.log('API Response:', response.data); 

  
//         const validTodos = response.data.filter(todo => todo.description !== null && todo.description.trim() !== '');
//         setTodos(validTodos); 
//       } catch (error) {
//         console.error('Error fetching todos:', error);
//       }
//     };
//     fetchTodos();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) {
//         toast.error("Please add your task!");
//         return;
//     }

//     try {
//         if (editId) {
//             await axios.put(`http://localhost:5000/todos/${editId}`, { description: input });
//             setTodos(todos.map((todo) => (todo.todo_id === editId ? { ...todo, description: input } : todo)));
//             setEditId(null);
//             toast.success("Todo updated successfully!");
//         } else {
//             const response = await axios.post('http://localhost:5000/todos', { description: input });
//             console.log('Response from POST:', response.data); // Log response
//             setTodos([...todos, response.data]);
//             toast.success("Todo added successfully!");
//         }
//         setInput('');
//     } catch (error) {
//         console.error('Error adding/updating todo:', error);
//         toast.error("Failed to add/update todo.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/todos/${id}`);
//       setTodos(todos.filter((todo) => todo.todo_id !== id));
//       toast.success("Todo deleted successfully!");
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//       toast.error("Failed to delete todo.");
//     }
//   };

//   const handleEdit = (id, description) => {
//     setEditId(id);
//     setInput(description);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-600 p-4 flex flex-col items-center">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <h1 className="text-center text-3xl font-bold underline text-white mt-10 mb-4">To-Do List Application</h1>

//       <form onSubmit={handleSubmit} className="flex justify-center gap-2 mb-4 w-full max-w-md">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter a new task"
//           className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
//         />
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
//           {editId ? 'Update' : 'Add'}
//         </button>
//       </form>

//       <div className="mt-6 w-full max-w-md">
//         <h2 className="text-center font-semibold text-lg mb-4 text-white">Tasks</h2>
//         <ul className="space-y-2">
//           {todos.map((todo, index) => (
//             <li key={todo.todo_id} className="border p-2 rounded bg-white shadow-sm flex justify-between items-center">
//               <span className="flex-1">{index + 1}. {todo.description}</span> {/* Display serial number */}
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleEdit(todo.todo_id, todo.description)}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-200"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(todo.todo_id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default InputTodo;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // EditModal component
// function EditModal({ isOpen, onClose, todo, onSubmit }) {
//   const [input, setInput] = useState(todo ? todo.description : '');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       onSubmit(todo.todo_id, input);
//       setInput(''); // Clear input after submission
//       onClose();
//     }
//   };

//   useEffect(() => {
//     if (todo) {
//       setInput(todo.description);
//     }
//   }, [todo]);

//   return (
//     isOpen && (
//       <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//         <div className="bg-white p-4 rounded shadow-lg w-full max-w-lg">
//           <h2 className="text-lg font-bold mb-4">Edit Todo</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Edit your task"
//               className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
//             />
//             <div className="flex justify-between mt-4">
//               <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
//                 Update
//               </button>
//               <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-200">
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//   );
// }

// // Main InputTodo component
// function InputTodo() {
//   const [input, setInput] = useState('');
//   const [todos, setTodos] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
//   const [editTodo, setEditTodo] = useState(null); // Store the todo being edited

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/todos');
//         const validTodos = response.data.filter(todo => todo.description !== null && todo.description.trim() !== '');
//         setTodos(validTodos); 
//       } catch (error) {
//         console.error('Error fetching todos:', error);
//       }
//     };
//     fetchTodos();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) {
//       toast.error("Please add your task!");
//       return;
//     }

//     try {
//       if (editTodo) {
//         await axios.put(`http://localhost:5000/todos/${editTodo.todo_id}`, { description: input });
//         setTodos(todos.map((todo) => (todo.todo_id === editTodo.todo_id ? { ...todo, description: input } : todo)));
//         setEditTodo(null);
//         toast.success("Todo updated successfully!");
//       } else {
//         const response = await axios.post('http://localhost:5000/todos', { description: input });
//         setTodos([...todos, response.data]);
//         toast.success("Todo added successfully!");
//       }
//       setInput('');
//     } catch (error) {
//       console.error('Error adding/updating todo:', error);
//       toast.error("Failed to add/update todo.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/todos/${id}`);
//       setTodos(todos.filter((todo) => todo.todo_id !== id));
//       toast.success("Todo deleted successfully!");
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//       toast.error("Failed to delete todo.");
//     }
//   };

//   const handleEdit = (todo) => {
//     setEditTodo(todo);
//     setIsModalOpen(true); // Open modal
//   };

//   const handleModalSubmit = (id, description) => {
//     setTodos(todos.map((todo) => (todo.todo_id === id ? { ...todo, description } : todo)));
//     toast.success("Todo updated successfully!");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-600 p-4 flex flex-col items-center">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <h1 className="text-center text-3xl font-bold underline text-white mt-10 mb-4">To-Do List Application</h1>

//       <form onSubmit={handleSubmit} className="flex justify-center gap-2 mb-4 w-full max-w-md">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter a new task"
//           className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
//         />
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
//           Add
//         </button>
//       </form>

//       <div className="mt-6 w-full max-w-md">
//         <h2 className="text-center font-semibold text-lg mb-4 text-white">Tasks</h2>
//         <ul className="space-y-2">
//           {todos.map((todo, index) => (
//             <li key={todo.todo_id} className="border p-2 rounded bg-white shadow-sm flex justify-between items-center">
//               <span className="flex-1">{index + 1}. {todo.description}</span> {/* Display serial number */}
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleEdit(todo)} // Pass entire todo object
//                   className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-200"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(todo.todo_id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <EditModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         todo={editTodo}
//         onSubmit={handleModalSubmit}
//       />
//     </div>
//   );
// }

// export default InputTodo;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditModal({ isOpen, onClose, todo, onSubmit }) {
  const [input, setInput] = useState(todo ? todo.description : '');
  const [recurrenceType, setRecurrenceType] = useState(todo ? todo.recurrence_type : '');
  const [recurrenceInterval, setRecurrenceInterval] = useState(todo ? todo.recurrence_interval : 1);
  const [recurrenceDaysOfWeek, setRecurrenceDaysOfWeek] = useState(todo ? todo.recurrence_days_of_week : null);
  const [recurrenceNthDayOfMonth, setRecurrenceNthDayOfMonth] = useState(todo ? todo.recurrence_nth_day_of_month : null);
  const [startDate, setStartDate] = useState(todo ? todo.recurrence_start_date.slice(0, 10) : '');
  const [endDate, setEndDate] = useState(todo ? todo.recurrence_end_date.slice(0, 10) : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(todo.todo_id, {
        description: input,
        recurrence_type: recurrenceType,
        recurrence_interval: recurrenceInterval,
        recurrence_days_of_week: recurrenceDaysOfWeek,
        recurrence_nth_day_of_month: recurrenceNthDayOfMonth,
        recurrence_start_date: startDate,
        recurrence_end_date: endDate,
      });
      setInput('');
      onClose();
    }
  };

  useEffect(() => {
    if (todo) {
      setInput(todo.description);
      setRecurrenceType(todo.recurrence_type || '');
      setRecurrenceInterval(todo.recurrence_interval || 1);
      setRecurrenceDaysOfWeek(todo.recurrence_days_of_week || null);
      setRecurrenceNthDayOfMonth(todo.recurrence_nth_day_of_month || null);
      setStartDate(todo.recurrence_start_date.slice(0, 10) || '');
      setEndDate(todo.recurrence_end_date.slice(0, 10) || '');
    }
  }, [todo]);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg w-full max-w-lg">
          <h2 className="text-lg font-bold mb-4">Edit Todo</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Edit your task"
              className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />

            {/* Recurrence Type */}
            <select value={recurrenceType} onChange={(e) => setRecurrenceType(e.target.value)} className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4">
              <option value="">No Recurrence</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            {/* Interval */}
            <input
              type="number"
              min="1"
              value={recurrenceInterval}
              onChange={(e) => setRecurrenceInterval(e.target.value)}
              placeholder="Interval (e.g., every 2 days)"
              className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />

            {/* Days of the week (optional) */}
            <input
              type="text"
              value={recurrenceDaysOfWeek}
              onChange={(e) => setRecurrenceDaysOfWeek(e.target.value)}
              placeholder="Days of the week (e.g., Mon,Wed,Fri)"
              className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />

            {/* Nth day of the month (optional) */}
            <input
              type="number"
              value={recurrenceNthDayOfMonth}
              onChange={(e) => setRecurrenceNthDayOfMonth(e.target.value)}
              placeholder="Nth day of the month (e.g., 2 for second day)"
              className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />

            {/* Start and End Date */}
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
            />

            <div className="flex justify-between mt-4">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
                Update
              </button>
              <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

function InputTodo() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [recurrenceType, setRecurrenceType] = useState('');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [recurrenceDaysOfWeek, setRecurrenceDaysOfWeek] = useState(null);
  const [recurrenceNthDayOfMonth, setRecurrenceNthDayOfMonth] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todos');
        setTodos(response.data);
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

    const todoData = {
      description: input,
      recurrence_type: recurrenceType,
      recurrence_interval: recurrenceInterval,
      recurrence_days_of_week: recurrenceDaysOfWeek,
      recurrence_nth_day_of_month: recurrenceNthDayOfMonth,
      recurrence_start_date: startDate,
      recurrence_end_date: endDate,
    };

    try {
      if (editTodo) {
        await axios.put(`http://localhost:5000/todos/${editTodo.todo_id}`, todoData);
        setTodos(todos.map((todo) => (todo.todo_id === editTodo.todo_id ? { ...todo, ...todoData } : todo)));
        setEditTodo(null);
        toast.success("Todo updated successfully!");
      } else {
        const response = await axios.post('http://localhost:5000/todos', todoData);
        setTodos([...todos, response.data]);
        toast.success("Todo added successfully!");
      }
      setInput('');
      setRecurrenceType('');
      setRecurrenceInterval(1);
      setRecurrenceDaysOfWeek(null);
      setRecurrenceNthDayOfMonth(null);
      setStartDate('');
      setEndDate('');
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

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-600 p-4 flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">{editTodo ? 'Edit Todo' : 'Add Todo'}</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
        />
        
        {/* Recurrence Type */}
        <select value={recurrenceType} onChange={(e) => setRecurrenceType(e.target.value)} className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4">
          <option value="">No Recurrence</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        {/* Interval */}
        <input
          type="number"
          min="1"
          value={recurrenceInterval}
          onChange={(e) => setRecurrenceInterval(e.target.value)}
          placeholder="Interval (e.g., every 2 days)"
          className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
        />

        {/* Days of the week (optional) */}
        <input
          type="text"
          value={recurrenceDaysOfWeek}
          onChange={(e) => setRecurrenceDaysOfWeek(e.target.value)}
          placeholder="Days of the week (e.g., Mon,Wed,Fri)"
          className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
        />

        {/* Nth day of the month (optional) */}
        <input
          type="number"
          value={recurrenceNthDayOfMonth}
          onChange={(e) => setRecurrenceNthDayOfMonth(e.target.value)}
          placeholder="Nth day of the month (e.g., 2 for second day)"
          className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
        />

        {/* Start and End Date */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-400 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-200 mb-4"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
          {editTodo ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>

      <ul className="w-full max-w-md">
        {todos.map((todo) => (
          <li key={todo.todo_id} className="bg-white rounded shadow p-4 mb-2 flex flex-col">
            <div className="flex justify-between items-center">
              <p className="font-bold">{todo.description}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(todo)} className="text-blue-500 hover:text-blue-700">Edit</button>
                <button onClick={() => handleDelete(todo.todo_id)} className="text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          
            {todo.recurrence_type && (
              <p className="text-sm text-gray-500">Recurrence: {todo.recurrence_type} (every {todo.recurrence_interval} days)</p>
            )}
            {todo.recurrence_days_of_week && (
              <p className="text-sm text-gray-500">Days of Week: {todo.recurrence_days_of_week}</p>
            )}
            {todo.recurrence_nth_day_of_month && (
              <p className="text-sm text-gray-500">Nth Day of Month: {todo.recurrence_nth_day_of_month}</p>
            )}
            <p className="text-sm text-gray-500">Start Date: {new Date(todo.recurrence_start_date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">End Date: {new Date(todo.recurrence_end_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          todo={editTodo}
          onSubmit={(id, data) => {
            handleSubmit({ todo_id: id, ...data });
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default InputTodo;
