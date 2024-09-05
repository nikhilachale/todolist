// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// app.use(cors()); // Enable CORS for frontend-backend communication
// app.use(express.json()); // Middleware to parse JSON bodies

// let tasks = []; // In-memory task storage

// // Route to get all tasks
// app.get('/tasks', (req, res) => {
//     res.json(tasks);
// });

// // Route to add a new task
// app.post('/tasks', (req, res) => {
//     const newTask = req.body.task;
//     tasks.push(newTask); // Add the new task to the in-memory array
//     res.json({ msg: 'Task added successfully', tasks });
// });

// // Route to delete a specific task
// app.delete('/tasks/:index', (req, res) => {
//     const index = parseInt(req.params.index);
//     if (index >= 0 && index < tasks.length) {
//         tasks.splice(index, 1); // Remove task by index
//         res.json({ msg: 'Task deleted successfully', tasks });
//     } else {
//         res.status(400).json({ msg: 'Invalid task index' });
//     }
// });

// // Route to clear all tasks
// app.delete('/tasks', (req, res) => {
//     tasks = []; // Clear all tasks
//     res.json({ msg: 'All tasks cleared', tasks });
// });

// app.listen(port, () => {
//     console.log(`Task server running at http://localhost:${port}`);
// });

// const task_ADD = async () => {
//     console.log("CLICKED");
    
//     const new_task = document.getElementById("task").value.trim();
//     const taskList = document.getElementById("taskList");
//     const new_btn = document.getElementById("clear");

//     if (new_task === "") {
//         alert("Task can't be empty");
//         return;
//     } else {
//         // Send the new task to the server
//         try {
//             const response = await fetch('http://localhost:3000/tasks', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ task: new_task })
//             });
//             const result = await response.json();
//             console.log(result);
//         } catch (error) {
//             console.error('Error adding task:', error);
//         }

//         // Update the task list
//         renderTasks();
//     }
// };

// const renderTasks = async () => {
//     const taskList = document.getElementById("taskList");
//     taskList.innerHTML = ''; // Clear the current list

//     try {
//         // Fetch all tasks from the server
//         const response = await fetch('http://localhost:3000/tasks');
//         const tasks = await response.json();

//         tasks.forEach((task, index) => {
//             const newobj = document.createElement('li'); // Create a new list item
//             newobj.textContent = task; // Set the text content of the new list item

//             const delbtn = document.createElement('button'); // Create the delete button
//             delbtn.textContent = 'X'; // Set button text
//             delbtn.style.float = 'right';
//             delbtn.style.backgroundColor = '#a6c6e6';
//             delbtn.style.borderRadius = '.5rem';
//             delbtn.style.border = 'none';

//             // Add event listener to the delete button
//             delbtn.addEventListener('click', async () => {
//                 await fetch(`http://localhost:3000/tasks/${index}`, {
//                     method: 'DELETE'
//                 });
//                 renderTasks(); // Re-render tasks after deletion
//             });

//             const chkbtn = document.createElement('button'); // Create the check button
//             chkbtn.textContent = '';
//             chkbtn.style.float = 'left';
//             chkbtn.style.height = '1rem';
//             chkbtn.style.width = '1rem';
//             chkbtn.style.marginRight = '10px';
//             chkbtn.style.backgroundColor = '#ffff';
//             chkbtn.style.borderRadius = '.5rem';
//             chkbtn.style.border = 'none';

//             // Add event listener to the check button
//             chkbtn.addEventListener('click', () => {
//                 newobj.style.textDecoration = 'line-through'; // Strike through the text
//                 chkbtn.style.backgroundColor = 'blue';
//                 newobj.style.backgroundColor = '#ffff';
//             });

//             newobj.appendChild(chkbtn); // Append the check button to the list item
//             newobj.appendChild(delbtn); // Append the delete button to the list item
//             taskList.appendChild(newobj); // Append the new list item to the task list
//         });

//         // Check if the clearALL button already exists
//         if (!document.getElementById('clearAllButton')) {
//             const clearALL = document.createElement('button'); // Create the clear all button
//             clearALL.textContent = 'Clear All';
//             clearALL.id = 'clearAllButton';
//             clearALL.style.margin = 'auto';
//             clearALL.style.textAlign = 'center';
//             clearALL.style.marginLeft = '250px';
//             clearALL.style.backgroundColor = '#ffff';
//             clearALL.style.borderRadius = '.5rem';
//             clearALL.style.border = 'none';
//             clearALL.style.height = '2rem';
//             clearALL.style.width = '5rem';

//             clearALL.addEventListener('click', async () => {
//                 await fetch('http://localhost:3000/tasks', { method: 'DELETE' });
//                 renderTasks(); // Clear the task list
//                 clearALL.remove(); // Remove the clear all button
//             });

//             new_btn.appendChild(clearALL);
//         }

//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//     }
// };

// // Initialize task list on page load
// document.addEventListener('DOMContentLoaded', () => {
//     renderTasks();
// });

// // Add event listener for Enter key to add a task
// document.getElementById("task").addEventListener("keypress", (event) => {
//     if (event.key === "Enter") {
//         task_ADD();
//     }
// });

/*
const task_ADD = () => {
    console.log("CLICKED");
    
    const new_task = document.getElementById("task").value.trim();
    const taskList = document.getElementById("taskList");
    const new_btn =  document.getElementById("clear");

    if (new_task === "") {
        alert("Task can't be empty");
        return;
    } else {
        console.log(new_task);
        
        const newobj = document.createElement('li'); // Create a new list item
        newobj.textContent = new_task; // Set the text content of the new list item
        
        const delbtn = document.createElement('button'); // Create the delete button
        delbtn.textContent = 'X'; // Set button text
        delbtn.style.float = 'right';
        delbtn.style.backgroundColor = '#a6c6e6';
        delbtn.style.borderRadius = '.5rem';
        delbtn.style.border = 'none';

        const chkbtn = document.createElement('button'); // Create the check button
        chkbtn.textContent = '';
        chkbtn.style.float = 'left';
        chkbtn.style.height = '1rem';
        chkbtn.style.width = '1rem';
        chkbtn.style.marginRight = '10px';
        chkbtn.style.backgroundColor = '#ffff';
        chkbtn.style.borderRadius = '.5rem';
        chkbtn.style.border = 'none';

        // Add event listener to the delete button
        delbtn.addEventListener('click', () => {
            newobj.remove(); // Remove the list item
        });

        // Add event listener to the check button
        chkbtn.addEventListener('click', () => {
            newobj.style.textDecoration = 'line-through'; // Strike through the text
            chkbtn.style.backgroundColor = 'blue';
            newobj.style.backgroundColor = '#ffff';
            
        });

        // Check if the clearALL button already exists
        if (!document.getElementById('clearAllButton')) {
            const clearALL = document.createElement('button'); // Create the clear all button
            clearALL.textContent = 'Clear All';
            clearALL.id = 'clearAllButton';
            clearALL.style.margin='auto';
            clearALL.style.textAlign='center';
            clearALL.style.marginLeft='250px';
            clearALL.style.backgroundColor = '#ffff';
            clearALL.style.borderRadius = '.5rem';
            clearALL.style.border = 'none';
            clearALL.style.height = '2rem';
            clearALL.style.width = '5rem';
            clearALL.addEventListener('click', () => {
                taskList.innerHTML = ''; // Clear all tasks
                clearALL.remove(); // Remove the clear all button
            });
            new_btn.appendChild(clearALL);
        }

        newobj.appendChild(chkbtn); // Append the check button to the list item
        newobj.appendChild(delbtn); // Append the delete button to the list item
        taskList.appendChild(newobj); // Append the new list item to the task list

        document.getElementById("task").value = ""; // Clear the input field
    }
};
*/



/*add http server in this which can store todo on HTTP server*/




const task_ADD = () => {
    console.log("CLICKED");
    
    const new_task = document.getElementById("task").value.trim();
    const taskList = document.getElementById("taskList");
    const new_btn =  document.getElementById("clear");

    if (new_task === "") {
        alert("Task can't be empty");
        return;
    } else {
        console.log(new_task);
        
        const newobj = document.createElement('li'); // Create a new list item
        newobj.textContent = new_task; // Set the text content of the new list item
        
        const delbtn = document.createElement('button'); // Create the delete button
        delbtn.textContent = 'X'; // Set button text
        delbtn.style.float = 'right';
        delbtn.style.backgroundColor = '#a6c6e6';
        delbtn.style.borderRadius = '.5rem';
        delbtn.style.border = 'none';

        const chkbtn = document.createElement('button'); // Create the check button
        chkbtn.textContent = '';
        chkbtn.style.float = 'left';
        chkbtn.style.height = '1rem';
        chkbtn.style.width = '1rem';
        chkbtn.style.marginRight = '10px';
        chkbtn.style.backgroundColor = '#ffff';
        chkbtn.style.borderRadius = '.5rem';
        chkbtn.style.border = 'none';

        // Add event listener to the delete button
        delbtn.addEventListener('click', () => {
            newobj.remove(); // Remove the list item
            removeTaskFromLocalStorage(new_task); // Remove from local storage
        });

        // Add event listener to the check button
        chkbtn.addEventListener('click', () => {
            newobj.style.textDecoration = 'line-through'; // Strike through the text
            chkbtn.style.backgroundColor = 'blue';
            newobj.style.backgroundColor = '#ffff';
        });

        // Store the new task in local storage
        saveTaskToLocalStorage(new_task);

        // Check if the clearALL button already exists
        if (!document.getElementById('clearAllButton')) {
            const clearALL = document.createElement('button'); // Create the clear all button
            clearALL.textContent = 'Clear All';
            clearALL.id = 'clearAllButton';
            clearALL.style.margin = 'auto';
            clearALL.style.textAlign = 'center';
            clearALL.style.marginLeft = '250px';
            clearALL.style.backgroundColor = '#ffff';
            clearALL.style.borderRadius = '.5rem';
            clearALL.style.border = 'none';
            clearALL.style.height = '2rem';
            clearALL.style.width = '5rem';
            clearALL.addEventListener('click', () => {
                taskList.innerHTML = ''; // Clear all tasks
                clearTasksFromLocalStorage(); // Clear tasks from local storage
                clearALL.remove(); // Remove the clear all button
            });
            new_btn.appendChild(clearALL);
        } 

        newobj.appendChild(chkbtn); // Append the check button to the list item
        newobj.appendChild(delbtn); // Append the delete button to the list item
        taskList.appendChild(newobj); // Append the new list item to the task list

        document.getElementById("task").value = ""; // Clear the input field
    }
};

// Function to save tasks to local storage
const saveTaskToLocalStorage = (task) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to remove task from local storage
const removeTaskFromLocalStorage = (task) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to clear all tasks from local storage
const clearTasksFromLocalStorage = () => {
    localStorage.removeItem('tasks');
};

// Function to load tasks from local storage on page load
const loadTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskList = document.getElementById("taskList");
        
        const newobj = document.createElement('li');
        newobj.textContent = task;

        const delbtn = document.createElement('button');
        delbtn.textContent = 'X';
        delbtn.style.float = 'right';
        delbtn.style.backgroundColor = '#a6c6e6';
        delbtn.style.borderRadius = '.5rem';
        delbtn.style.border = 'none';
        delbtn.addEventListener('click', () => {
            newobj.remove();
            removeTaskFromLocalStorage(task); // Remove from local storage
        });

        const chkbtn = document.createElement('button');
        chkbtn.textContent = '';
        chkbtn.style.float = 'left';
        chkbtn.style.height = '1rem';
        chkbtn.style.width = '1rem';
        chkbtn.style.marginRight = '10px';
        chkbtn.style.backgroundColor = '#ffff';
        chkbtn.style.borderRadius = '.5rem';
        chkbtn.style.border = 'none';
        chkbtn.addEventListener('click', () => {
            newobj.style.textDecoration = 'line-through';
            chkbtn.style.backgroundColor = 'blue';
            newobj.style.backgroundColor = '#ffff';
        });

        newobj.appendChild(chkbtn);
        newobj.appendChild(delbtn);
        taskList.appendChild(newobj);
    });
};

// Load tasks when the page is loaded
window.onload = loadTasksFromLocalStorage;
