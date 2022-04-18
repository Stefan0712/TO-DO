const content = document.querySelector(".content");
const allTasksView = document.getElementById('allTasksView');
const completedTasksView = document.getElementById('completedTasksView');
const sideMenu = document.querySelector(".groupList");
const addBtn = document.getElementById("addBtn");
const deletedTasks = document.getElementById("deletedItems");
const allTasksBtn = document.getElementById("allTasks")
const completedTasksBtn = document.getElementById("completedTasks")
const addGroupBtn = document.getElementById('newGroupBtn');
let tasks = [];
let currentIndex = 0;
let groups = ["allTasks", "Completed"];
let views = ['allTasksView','completedTasksView'];

const lightBtn = document.getElementById("lightMode");
const darkBtn = document.getElementById("darkMode");



lightBtn.onclick = function lightMode(){
    darkBtn.style.cssText = "background-color: white";
    lightBtn.style.cssText = "background-color: #0a1c30";
    sideMenu.style.cssText = "background-color: #85F4FF";
    document.querySelector(".content").style.cssText = "background-color: #F7F7F7";
    document.querySelector(".header").style.cssText = "background-color: #8D8DAA";
    document.querySelector(".sideMenu").style.cssText = "background-color: #DFDFDE; border: none;";
    document.querySelector(".groupList").style.cssText = "background-color: rgba(223, 223, 222, 0.5); border: none;";
    addGroupBtn.style.cssText = "background-color: #8D8DAA";
    addBtn.style.cssText = "background-color: #8D8DAA";
    



}


darkBtn.onclick = function darkMode(){
    lightBtn.style.cssText = "background-color: white";
    darkBtn.style.cssText = "background-color: #0a1c30";
    sideMenu.style.cssText = "background-color: #85F4FF";
    document.querySelector(".content").style.cssText = "background-color: #5584AC";
    document.querySelector(".header").style.cssText = "background-color: #112D4E";
    document.querySelector(".sideMenu").style.cssText = "background-color: #3F72AF";
    document.querySelector(".groupList").style.cssText = "background-color: rgba(17, 45, 78, 0.3)";
}



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
    if(document.querySelector(".taskMenu") === null){
    const taskMenu = document.createElement('div')
    taskMenu.classList.add('taskMenu')
    content.appendChild(taskMenu)
    const closeIcon = document.createElement('div')
    closeIcon.innerHTML = "✖";
    closeIcon.setAttribute('onclick','document.querySelector(".taskMenu").remove();')

    taskMenu.appendChild(closeIcon);

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
    
}

function addTask(){
    

    //get the values from the inputs
    const titleValue = document.getElementById('title').value;
    const dateValue = document.getElementById('date').value;
    const descriptionValue = document.getElementById("description").value;
    const groupValue = document.getElementById('group').value;

    if(titleValue =="" || titleValue==" "){
        document.getElementById("titleLabel").innerHtml = 
        document.getElementById("title").style.cssText = " border: 3px solid red; font-size: 20px";
    } else {
    //creates a new object with those values
    var task = new Task(titleValue, groupValue, dateValue, descriptionValue, currentIndex);
    
 

    currentIndex++;
    console.log(task);
    tasks.push(task);
    addTaskToUI(task);
    }
    
}

function addTaskToUI(task){

    //removes task menu
    const taskMenu = document.querySelector('.taskMenu')
    taskMenu.remove();

    //creates the item that will be the task
    let viewId = task.group.replace(/\s+/g, '');        //creates an id by eliminating all white spaces from group name
    const item = document.createElement('div')
    item.setAttribute('id',`item${task.index}`)         //every item will have the id "item + index"
    item.classList.add('item')
    document.getElementById(`${viewId}View`).appendChild(item)

    const itemTitle = document.createElement('div')
    itemTitle.setAttribute('id',`itemTitle${task.index}`)
    itemTitle.innerHTML = task.title
    itemTitle.setAttribute('onclick',`editTaskMenu(${task.index})`)
    item.appendChild(itemTitle);
    
    const itemDueDate = document.createElement('div')
    itemDueDate.setAttribute('id',`dueDate${task.index}`);
    if(task.date == ""|| task.date == null){
        itemDueDate.innerText = "Due date not set";

    } else {
    itemDueDate.innerText = task.date;
    }
    itemDueDate.setAttribute('onclick',`editTaskMenu(${task.index})`)
    item.appendChild(itemDueDate)

    const itemCheckBox = document.createElement('input')
    itemCheckBox.setAttribute('type','checkbox')
    itemCheckBox.setAttribute('id',`task${task.index}`);
    itemCheckBox.classList.add('checkBoxes');
    itemCheckBox.setAttribute('onclick',`completeItem(${task.index})`);    
    
    item.appendChild(itemCheckBox)
    


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
        let viewId = tasks[index].group.replace(/\s+/g, '');
        document.getElementById(`${viewId}View`).appendChild(item);
        

    }



   
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
    for(let i=0;i<groups.length;i++){
        if(groups[i] == name || name=="" || name==" "){
            const input = document.getElementById("nameInput");
            input.style.cssText = "border: 1px solid red";
            if(document.querySelector("nameError")!==null){

                document.querySelector('nameError').remove();
            }
            const error = document.createElement('div')
            error.classList.add('nameError')
            error.innerText = "The group name already exists!";
            document.getElementById("newGroupMenu").appendChild(error);
            document.getElementById("groupSubmitButton").disable = true;
        }
    }
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





function editTaskMenu(index){
    if(document.querySelector(".taskMenu") === null){
    //create task menu
    const taskMenu = document.createElement('div')
    taskMenu.classList.add('taskMenu')
    content.appendChild(taskMenu)
    const closeIcon = document.createElement('div')
    closeIcon.innerHTML = "✖";
    closeIcon.setAttribute('onclick','document.querySelector(".taskMenu").remove();')

    taskMenu.appendChild(closeIcon);

    //create title label and input
    const titleLabel = document.createElement('label')
    titleLabel.innerText = "Enter a title"
    const title = document.createElement("input")
    title.setAttribute('id','title')
    title.setAttribute('type','text')
    title.setAttribute('value',tasks[index].title)
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
        if(groups[i]==tasks[index].group){
            option.setAttribute("selected","true")
        }
        option.innerText = `${groups[i]}`
        group.appendChild(option);

    }


   

    //create date input for due date
    const dueDateLabel = document.createElement('label')
    dueDateLabel.innerText = "Due date"

    const dueDate = document.createElement('input')
    dueDate.setAttribute('type','date')
    dueDate.setAttribute('id','date')
    dueDate.setAttribute('value',`${tasks[index].date}`);

    taskMenu.appendChild(dueDateLabel)
    taskMenu.appendChild(dueDate)
    

    //add description input
    const descriptionLabel = document.createElement('label')
    descriptionLabel.innerText = "Description"
    const description = document.createElement('textarea')
    description.setAttribute('id','description')
    description.setAttribute('value',tasks[index].description)
    taskMenu.appendChild(descriptionLabel)
    taskMenu.appendChild(description)

    //create the add task button

    const taskBtn = document.createElement('button')
    taskBtn.setAttribute("type","button")
    taskBtn.setAttribute('id','addTask')
    taskBtn.setAttribute("onclick",`editTask(${index})`)
    taskBtn.innerHTML = "Save changes"
    taskMenu.appendChild(taskBtn)
    }
    
}
function editTask(index){
    tasks[index].title = document.getElementById('title').value;
    tasks[index].group = document.getElementById('group').value;
    tasks[index].date = document.getElementById('date').value;
    tasks[index].description = document.getElementById('description').value;

    document.getElementById(`itemTitle${index}`).innerText = document.getElementById('title').value;
    document.getElementById(`dueDate${index}`).innerText = tasks[index].date;


    document.querySelector('.taskMenu').remove();


}




