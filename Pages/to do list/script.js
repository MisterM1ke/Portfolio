const taskList = [];
let inputTask = document.getElementById("task");

function addTask(){    
    if(inputTask.value.length == 0) return; // prevents adding empty tasks
    taskList.push(inputTask.value);
    makeHtmlTaskList(inputTask.value,taskList.length);
    inputTask.value = ""; // clears input box
    inputTask.focus(); // focus inputbox
}

function removeTask(e){
    e.parentElement.remove();
    taskList.splice(e.value,1); // removes item from array
}

function makeHtmlTaskList(task,index){ //creates dom li element with children
    const ul = document.getElementById("resultList");
    const li = document.createElement("li");
    const checkbox = document.createElement("input"); //creates a checkbox input element that strikesthrough completed tasks
    const span = document.createElement("span"); // span constains task text
    const btn = document.createElement("button"); // button to delete task

    li.className = "row";

    btn.textContent = 'X';
    btn.onclick = function() {
        removeTask(this);
    }
    btn.value = index;

    span.textContent = task;
    span.className = "strikethrough";

    checkbox.type = "checkbox";

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btn);
    ul.appendChild(li);
}

// add event handlers


inputTask.addEventListener("keyup", function(e) {
    if (e.key === "Enter"){
        addTask();
    }
})
