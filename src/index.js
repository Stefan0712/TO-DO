const content = document.querySelector(".content");
const sideMenu = document.querySelector(".sideMenu");
const addBtn = document.getElementById("addBtn");
const deletedTasks = document.getElementById("deletedItems");
let tasks = [];
let currentIndex = 0;





//task object
function Task(title,group,date, description, index){
    this.title = title;
    this.date = date;
    this.description = description;
    this.group = group;
    this.index = index;
    this.oldGroup = group;
}

addBtn.onclick = function createTaskMenu(){
    //create task menu
    const taskMenu = document.createElement('div')
    taskMenu.classList.add('taskMenu')
    content.appendChild(taskMenu)

    //create title label and input
    const titleLabel = document.createElement('label')
    titleLabel.innerText = "Enter a title"
    const title = document.createElement("input")
    title.setAttribute('id','title')
    title.setAttribute('type','text')
    title.setAttribute('placeholder','Title')
    taskMenu.appendChild(titleLabel)
    taskMenu.appendChild(title)

    //create group selection 
    const groupLabel = document.createElement('label')
    groupLabel.innerText = "Select a group"
    const group = document.createElement("select")
    group.setAttribute('id','group')
    taskMenu.appendChild(groupLabel)
    taskMenu.appendChild(group)

    //create selection options

    const defaultOption = document.createElement('option')
    defaultOption.setAttribute('value','group0')
    defaultOption.innerText = "Default group"

    const option2 = document.createElement('option')
    option2.setAttribute('value','group2')
    option2.innerText = "Group 2"

    const option3 = document.createElement('option')
    option3.setAttribute('value','group3')
    option3.innerText = "Group 3"

    const option4 = document.createElement('option')
    option4.setAttribute('value','group4')
    option4.innerText = "Group 4"

    group.appendChild(defaultOption);
    group.appendChild(option2)
    group.appendChild(option3)
    group.appendChild(option4)

    //create date input for due date
    const dueDateLabel = document.createElement('label')
    dueDateLabel.innerText = "Due date"

    const dueDate = document.createElement('input')
    dueDate.setAttribute('type','date')
    dueDate.setAttribute('id','date')

    taskMenu.appendChild(dueDateLabel)
    taskMenu.appendChild(dueDate)
    

    //add description input
    const descriptionLabel = document.createElement('label')
    descriptionLabel.innerText = "Description"
    const description = document.createElement('textarea')
    description.setAttribute('id','description')
    description.setAttribute('placeholder','Description..')
    taskMenu.appendChild(descriptionLabel)
    taskMenu.appendChild(description)

    //create the add task button

    const taskBtn = document.createElement('button')
    taskBtn.setAttribute("type","button")
    taskBtn.setAttribute('id','addTask')
    taskBtn.setAttribute("onclick","addTask()")
    taskBtn.innerHTML = "Add"
    taskMenu.appendChild(taskBtn)
    
}

function addTask(){
    

    //gets the values from the inputs
    const titleValue = document.getElementById('title').value;
    const dateValue = document.getElementById('date').value;
    const descriptionValue = document.getElementById("description").value;
    const groupValue = document.getElementById('group').value;

    //creates a new object with those values
    var task = new Task(titleValue,groupValue, dateValue, descriptionValue, currentIndex);
    
    /*var task = Object.create(Task);
    task.title = titleValue;
    task.date = dateValue;
    task.description = descriptionValue;
    task.group = groupValue;
    task.index = currentIndex;*/
    currentIndex++;
    console.log(task);
    tasks.push(task);
    addTaskToUI(task);
    
    
}

function addTaskToUI(task){

    //removes task menu
    const content = document.querySelector(".content");
    const taskMenu = document.querySelector('.taskMenu')
    taskMenu.remove();

    //creates the item that will be the task
    const item = document.createElement('div')
    item.setAttribute('id',`item${task.index}`)
    item.classList.add('item')
    content.appendChild(item)

    const itemTitle = document.createElement('div')
    itemTitle.setAttribute('id','title')
    itemTitle.innerHTML = task.title
    item.appendChild(itemTitle);
    
    const itemDueDate = document.createElement('div')
    itemDueDate.setAttribute('id','dueDate')
    itemDueDate.innerText = task.date;
    item.appendChild(itemDueDate)

    const itemCheckBox = document.createElement('input')
    itemCheckBox.setAttribute('type','checkbox')
    itemCheckBox.setAttribute('id',`task${task.index}`);
    itemCheckBox.setAttribute('onclick',`completeItem(${task.index})`);
    item.appendChild(itemCheckBox)


}
function completeItem(index){
    //need to implement something to change all the indexex after the deleted item so they match with their current place in the array
    const item = document.getElementById(`item${index}`)
    const checkBox = document.getElementById(`task${index}`)
    if(checkBox.checked == true){
        tasks[index].group = "completed";
        item.style.cssText = "background-color: lightgreen; border: 1px solid green;";
    } else {
        tasks[index].group = tasks[index].oldGroup;
        item.style.cssText = "background-color: rgba(67, 145, 155,0.5); border: none;";
    }



    /*
    item.remove();
    tasks.splice(index,1);
    for(let i=index-1;i<tasks.length;i++){
        tasks[i].index--;
    }
    console.log(tasks)
    */
}
    
    
/*function createUpdateTaskMenu(task){
    //create task menu
    const taskMenu = document.createElement('div')
    taskMenu.classList.add('taskMenu')
    content.appendChild(taskMenu)

    //create title label and input
    const titleLabel = document.createElement('label')
    titleLabel.innerText = "Enter a title"
    const title = document.createElement("input")
    title.setAttribute('id','title')
    title.setAttribute('type','text')
    title.setAttribute('placeholder','Title')
    taskMenu.appendChild(titleLabel)
    taskMenu.appendChild(title)

    //create group selection 
    const groupLabel = document.createElement('label')
    groupLabel.innerText = "Select a group"
    const group = document.createElement("select")
    group.setAttribute('id','group')
    taskMenu.appendChild(groupLabel)
    taskMenu.appendChild(group)

    //create selection options

    const defaultOption = document.createElement('option')
    defaultOption.setAttribute('value','group0')
    defaultOption.innerText = "Default group"

    const option2 = document.createElement('option')
    option2.setAttribute('value','group2')
    option2.innerText = "Group 2"

    const option3 = document.createElement('option')
    option3.setAttribute('value','group3')
    option3.innerText = "Group 3"

    const option4 = document.createElement('option')
    option4.setAttribute('value','group4')
    option4.innerText = "Group 4"

    group.appendChild(defaultOption);
    group.appendChild(option2)
    group.appendChild(option3)
    group.appendChild(option4)

    //create date input for due date
    const dueDateLabel = document.createElement('label')
    dueDateLabel.innerText = "Due date"

    const dueDate = document.createElement('input')
    dueDate.setAttribute('type','date')
    dueDate.setAttribute('id','date')

    taskMenu.appendChild(dueDateLabel)
    taskMenu.appendChild(dueDate)
    

    //add description input
    const descriptionLabel = document.createElement('label')
    descriptionLabel.innerText = "Description"
    const description = document.createElement('textarea')
    description.setAttribute('id','description')
    description.setAttribute('placeholder','Description..')
    taskMenu.appendChild(descriptionLabel)
    taskMenu.appendChild(description)

    //create the add task button

    const taskBtn = document.createElement('button')
    taskBtn.setAttribute("type","button")
    taskBtn.setAttribute('id','addTask')
    taskBtn.setAttribute("onclick","addTask()")
    taskBtn.innerHTML = "Add"
    taskMenu.appendChild(taskBtn)
    
}*/