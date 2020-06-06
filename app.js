// Define UI VARS

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Function to load all event listeners
loadEventListeners();

// Load all event listeners 

function loadEventListeners() {
  // Add task event 
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);

  // Filter task event 
  filter.addEventListener('keyup', filterTasks);

};

//Add Task 
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  //create li element 
  const li = document.createElement('li');
  //add a class to it
  li.className = 'collection-item';
  // Create text node and append to li 
  li.appendChild(document.createTextNode(taskInput.value));

  // Create a new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  // Add icon html 
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li 
  li.appendChild(link);

  // Append li to ul

  taskList.appendChild(li);

  // Clear input 
  taskInput.value = '';

  e.preventDefault();
}

// Remove Task--- by clicking x we want the whole box to be removed not only the x item. so li would be the parent of parent on x --it's two level up in node tree
function removeTask(e) {

  if (e.target.parentElement.classList.contains('delete-item')) {

    //getting confirmation
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}
// clear task
function clearTasks(e){
  // taskList.innerHTML = ''; // or we can do this 
  
  //Faster ---while there is a first child or something in the list remove the thing 
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
}

// Filter task
function filterTasks(e){
  //1-First  will get whatever we type in the filter place
  const text = e.target.value.toLowerCase();

  //2- then we get all of the list items
  // we use query selector which will give us node list so we can use for each in it 
  document.querySelectorAll('.collection-item').forEach(function(task){
    //3- then we go through each text content
    const item = task.firstChild.textContent;
    //4- if no match it will be = -1 so we turn it to opposite 
    if(item.toLocaleLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }

  });

// console.log(text);

}