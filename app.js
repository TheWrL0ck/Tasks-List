//define UI vars
const form=document.querySelector('#task-form');
const tasklist=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks'); 
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

//load all event listeners
loadEventListeners();

//load all event listeners function defination
function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //add task event
    form.addEventListener('submit',addTask);
    //remove task list
    tasklist.addEventListener('click',removeTask);
    //clear task event
    clearBtn.addEventListener('click',clearTasks);
    //filter task events
    filter.addEventListener('keyup',filterTasks);
}

//get tasks
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(
        function(task){
            //create li element
            const li=document.createElement('li');

            //add class
            li.className='collection-item';

            //create text node to append li
            li.appendChild(document.createTextNode(task));

            //create new link element
            const link=document.createElement('a');

            //add class
            link.className='delete-item secondary-content';

            //add icon html
            link.innerHTML='<i class="fa fa-remove"><i>';

            //append link to li
            li.appendChild(link);

            //append li to ul
            tasklist.appendChild(li);
        }
    )
}

//Add task
function addTask(e){
    if(taskInput.value===''){
        alert('Add a task');
    }

    //create li element
    const li=document.createElement('li');

    //add class
    li.className='collection-item';

    //create text node to append li
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link=document.createElement('a');

    //add class
    link.className='delete-item secondary-content';

    //add icon html
    link.innerHTML='<i class="fa fa-remove"><i>';

    //append link to li
    li.appendChild(link);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //append li to ul
    tasklist.appendChild(li);
    taskInput.value='';
    e.preventDefault();
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //remove tasks from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//remove tasks from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clear tasks
function clearTasks(){
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }
    localStorage.clear();
}

//filter tasks
function filterTasks(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item=task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)!=-1){
                task.style.display='block';
            }else{
                task.style.display='none';
            }
        }
    );
}

//store in local storage
function storeTaskInLocalStorage(e){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(e);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}