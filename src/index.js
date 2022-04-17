const content = document.querySelector(".content");
const allTasksView = document.getElementById('allTasksView');
const completedTasksView = document.getElementById('completedTasksView');
const sideMenu = document.querySelector(".sideMenu");
const addBtn = document.getElementById("addBtn");
const deletedTasks = document.getElementById("deletedItems");
const allTasksBtn = document.getElementById("allTasks")
const completedTasksBtn = document.getElementById("completedTasks")
const addGroupBtn = document.getElementById('newGroupBtn');
let tasks = [];
let currentIndex = 0;
let groups = ["Default", "Completed"];
let views = ['allTasksView','completedTasksView'];





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
    allTasksView.appendChild(taskMenu)

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

    for(let i=0;i<groups.length;i++){
        const option = document.createElement('option')
        option.setAttribute('value',`${groups[i]}`)
        option.innerText = `${groups[i]}`
        group.appendChild(option);

    }


   

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
    const allTasksView = document.getElementById('allTasksView')
    const taskMenu = document.querySelector('.taskMenu')
    taskMenu.remove();

    //creates the item that will be the task
    const item = document.createElement('div')
    item.setAttribute('id',`item${task.index}`)
    item.classList.add('item')
    allTasksView.appendChild(item)

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

    let viewID = `${task.group}View`;
    document.getElementById(viewID).appendChild(item.cloneNode(true))


}
function completeItem(index){
    const item = document.getElementById(`item${index}`)
    const checkBox = document.getElementById(`task${index}`)
    if(checkBox.checked == true){
        tasks[index].group = "completed";
        item.style.cssText = "background-color: lightgreen; border: 1px solid green;";
        completedTasksView.appendChild(item);

    } else {
        tasks[index].group = tasks[index].oldGroup;
        item.style.cssText = "background-color: rgba(67, 145, 155,0.5); border: none;";
        allTasksView.appendChild(item);


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
    






function createNewGroupMenu(){
    if(document.getElementById("newGroupMenu") === null){
    //creates menu for a new group
    const content = document.querySelector(".content");
    const newGroupMenu = document.createElement("div")
    newGroupMenu.setAttribute("id",'newGroupMenu')
    content.appendChild(newGroupMenu)

        const closeIcon = document.createElement('div')
        closeIcon.innerText = "✖";
        closeIcon.setAttribute('id','closeIcon');
        closeIcon.setAttribute('onclick','document.getElementById("newGroupMenu").remove();')
        newGroupMenu.appendChild(closeIcon)

    const nameLabel = document.createElement('label')
    nameLabel.innerHTML = "Group name"
    newGroupMenu.appendChild(nameLabel)

    const nameInput = document.createElement('input')
    nameInput.setAttribute('type','text')
    nameInput.setAttribute('id','nameInput')

    const groupSubmitBtn = document.createElement("button")
    groupSubmitBtn.setAttribute("type","button")
    groupSubmitBtn.setAttribute('id','groupSubmitBtn')
    groupSubmitBtn.setAttribute('onclick','createNewGroup()')
    groupSubmitBtn.innerHTML = "Add";

    newGroupMenu.appendChild(nameInput);
    newGroupMenu.appendChild(groupSubmitBtn);
    } 


}


function createNewGroup(){
    const name = document.getElementById('nameInput').value;
    let btnId = name.replace(/\s+/g, '');
    let viewId = `${btnId}View`;
    const button = document.createElement('div')
    button.classList.add('menuItem')
    button.setAttribute('id',`${btnId}`)
    button.innerHTML = name;
    button.setAttribute('onclick',`changeView("${viewId}")`);
    sideMenu.appendChild(button);
    const newView = document.createElement('div')
    newView.setAttribute('id',`${viewId}`);
    newView.classList.add('views')
    newView.style.cssText = "height: 100%; width: 100%;";
    content.appendChild(newView);
    views.push(`${viewId}`);
    groups.push(name);
    document.getElementById("newGroupMenu").remove();


  
}

//changes the view from a group to another
function changeView(viewId){
    
    for(let i=0;i<views.length;i++){
        
        document.getElementById(`${views[i]}`).style.cssText = "display: none";
    }
    document.getElementById(viewId).style.cssText = "display: flex";
}








