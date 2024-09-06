// Function to display date on page load
const displaydate = () => {
    const d = new Date();
    const dd = d.getDate();
    const mm = d.getMonth() + 1; // Month is zero-based, so add 1
    const yy = d.getFullYear();
    const date = `${dd}/${mm}/${yy}`;
    
    document.getElementById("dt").innerHTML = date;
};

// Function to create task elements
const createTaskElement = (task) => {
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

    return newobj;
};

// Function to add a new task
const task_ADD = () => {
    console.log("CLICKED");
    
    const new_task = document.getElementById("task").value.trim();
    const taskList = document.getElementById("taskList");
    const new_btn = document.getElementById("clear");

    if (new_task === "") {
        alert("Task can't be empty");
        return;
    }

    const newobj = createTaskElement(new_task);

    // Store the new task in local storage
    saveTaskToLocalStorage(new_task);

    // Check if the clearALL button already exists
    if (!document.getElementById('clearAllButton')) {
        const clearALL = document.createElement('button'); // Create the clear all button
        clearALL.textContent = 'Clear All';
        clearALL.id = 'clearAllButton';
        
        // Style the button
        clearALL.style.backgroundColor = '#ffff';
        clearALL.style.borderRadius = '.5rem';
        clearALL.style.border = 'none';
        clearALL.style.height = '2rem';
        clearALL.style.width = '5rem';
    
        // Create a wrapper to center the button
        const buttonWrapper = document.createElement('div');
        buttonWrapper.style.display = 'flex';
        buttonWrapper.style.justifyContent = 'center';
        buttonWrapper.style.margin = '1rem 0'; // Add some margin for spacing
    
        buttonWrapper.appendChild(clearALL); // Add the button to the wrapper
    
        clearALL.addEventListener('click', () => {
            taskList.innerHTML = ''; // Clear all tasks
            clearTasksFromLocalStorage(); // Clear tasks from local storage
            buttonWrapper.remove(); // Remove the clear all button and wrapper
        });
    
        new_btn.appendChild(buttonWrapper); // Append the wrapper to the parent element
    }

    taskList.appendChild(newobj); // Append the new list item to the task list

    document.getElementById("task").value = ""; // Clear the input field
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
        const newobj = createTaskElement(task);
        taskList.appendChild(newobj);
    });
};

// Combined window.onload to handle both date display and loading tasks
window.onload = () => {
    displaydate();  // Display the date
    loadTasksFromLocalStorage();  // Load stored tasks
};