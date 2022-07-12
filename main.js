const task_input = document.getElementById('task-input');
const add_button = document.getElementById('add-button');
const task_list = document.getElementById('task-list')
const inputForm = document.forms['input-form'];
const categorySelect = document.getElementById('category-select');
const clearBtn = document.getElementById('clear-completed')

// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', checkCompletedTasks)

task_list.addEventListener('click', handleChanges);

inputForm.addEventListener('submit', addTodo);

categorySelect.addEventListener('change', showCategoryList);

clearBtn.addEventListener('click', clearCompleted)

function renderTodo(){
    for(let i = 0; i<localStorage.length; i++ ){
        const key =  localStorage.key(i);  
        let newTask = createNewTask(key);
        task_list.appendChild(newTask);    
    }
}

renderTodo();

// FUNCTIONS

//keep completed tasks checked
function checkCompletedTasks(){
    for(let i = 0; i<localStorage.length; i++){
        if(localStorage.getItem(localStorage.key(i))== 'done'){
            let list_item  = task_list.children[i]
            list_item.querySelector('.completed-btn').checked  = 'true' 
            list_item.classList.add('completed-display')
        }
    }
}

//new todo
function addTodo(e){
    e.preventDefault();
    let taskValue = task_input.value.trim();
    // console.log(key)
    if(taskValue){
        localStorage.setItem(taskValue, "undone");
        let task = createNewTask(taskValue);
        task_list.appendChild(task)   
    }
    inputForm.reset();
}

function createNewTask(key){
    const newTask = document.createElement('li');
    newTask.setAttribute('class', 'list-itemss');
    const isCompleted = document.createElement('input');
    isCompleted.setAttribute(
        'type', 'checkbox' 
        
    );
    isCompleted.setAttribute(
        'class', 'completed-btn'
    );
    
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class=" fas fa-trash-alt"></i>';

    deleteBtn.setAttribute('class', 'delete-btn');
    
    const task_text = document.createElement('div');

    task_text.innerText = key;
    newTask.appendChild(isCompleted);
    newTask.appendChild(task_text);
    newTask.appendChild(deleteBtn);
    
    return newTask;
}

function handleChanges(e){

   //use event bubbling for both delete and check

    if(e.target.className == "delete-btn"){
        const li = e.target.parentElement;
        console.log(e.target.children)
        const to_delete = e.target.previousSibling.innerText;
        localStorage.removeItem(to_delete);
        task_list.removeChild(li);
    }

    else if(e.target.className == 'completed-btn'){
        const li = e.target.parentElement;
        const to_edit = e.target.nextSibling.innerText;
        if(e.target.checked){
            localStorage.setItem(to_edit, 'done')
            li.classList.add('completed-display')
        }else{
            localStorage.setItem(to_edit, 'undone');
            li.classList.remove('completed-display')
        }
    }
};

function showCategoryList () {
    let category = categorySelect.options[categorySelect.selectedIndex].value;
    taskStatusList(category.toLowerCase());
}

function taskStatusList(value){
    for(let i = 0; i<localStorage.length; i++){
        let list_item  = task_list.children[i]
        let task = list_item.children[1].innerText
        let status  = localStorage.getItem(task)       
        if(value == 'all'){
            list_item.style.display = 'flex'
        }
        else if( status == value){
            list_item.style.display = 'flex'
        }else{
            list_item.style.display = 'none'
        }
    }
}

function clearCompleted(){
    let list = document.querySelectorAll( "ul .completed-display")
    for(let i= 0; i<list.length; i++){       
        let task = list[i].children[1].innerText
        list[i].remove();
        localStorage.removeItem(task);
    }
}