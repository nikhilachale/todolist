


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
