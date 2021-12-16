//GET: Get the(initial) list of tasks from the database.
const getTask = async () => {
  var requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  const response = await fetch("http://localhost:3000", requestOptions);
  const data = await response.json();
  console.log(data);

  return data;
};

const getdescription = (taskData) => {
  const description = taskData.description;
  console.log(description);
  return description;
};

const getid = (taskData) => {
  const idTask = taskData._id;
  console.log(idTask);
  return idTask;
};

const getdone = (taskData) => {
  const doneTask = taskData.done;
  console.log(doneTask);
  return doneTask;
};

// //POST: Update the task list with 1 new task. Send only {description: "blah", done: false}
const postTask = async () => {
  var raw = JSON.stringify({
    description: taskInput.value,
    done: false,
  });

  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    body: raw,
  };

  const response = await fetch("http://localhost:3000", requestOptions);
  const data = await response.json();
  console.log(data);
  return data;
};
//postTask();

const taskInput = document.querySelector(".todo");
const submit = document.querySelector(".submit");
const list = document.querySelector(".tasks");

submit.addEventListener("click", addTasktoDOM);

function addTasktoDOM(e) {
  const taskItem = document.createElement("p");
  const tasktextnode = document.createTextNode(taskInput.value);

  const trashcan = document.createElement("img");
  const trashButton = document.createElement("button");
  trashcan.setAttribute("src", "trashcan.png");
  trashcan.setAttribute("style", "width:12px; color:red");
  trashcan.setAttribute("alt", "Delete-task");
  trashcan.setAttribute("class", "delete");
  trashButton.appendChild(trashcan);

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");

  taskItem.appendChild(input);
  taskItem.appendChild(tasktextnode);
  taskItem.appendChild(trashButton);
  list.appendChild(taskItem);

  postTask();

  taskInput.value = "";
  document.location.reload(true);
}

function tasktoDOM(taskData) {
  const taskItem = document.createElement("p");

  const taskList = getdescription(taskData);
  const idList = getid(taskData);
  const doneList = getdone(taskData);
  const tasktextnode = document.createTextNode(taskList);

  const trashcan = document.createElement("img");
  const trashButton = document.createElement("button");
  trashcan.setAttribute("src", "trashcan.png");
  trashcan.setAttribute("style", "width:12px; color:red");
  trashcan.setAttribute("alt", "Delete-task");
  trashcan.setAttribute("id", "del");
  trashButton.appendChild(trashcan);

  trashButton.addEventListener("click", () => {
    alert("Verwijder de taak " + taskList);
    if (window.confirm) {
      deleteTask(idList);
    } else {
      return false;
    }
  });

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", "myCheck");

  if (doneList == true) {
    input.checked = true;
  }

  input.addEventListener("click", () => {
    if ((document.getElementById("myCheck").checked = true)) {
      putTask(idList);
      //text.style.textDecoration="line-through";
    } else {
      return false;
    }
  });

  taskItem.appendChild(input);
  taskItem.appendChild(tasktextnode);
  taskItem.appendChild(trashButton);
  list.appendChild(taskItem);
}

const showTasks = async () => {
  const tasks = await getTask();
  tasks.map((taskData) => tasktoDOM(taskData));
};
showTasks();

// //DELETE: Delete a task from the database. Use the id you get back as an identifier.
const deleteTask = async (id) => {
  var requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  const response = await fetch("http://localhost:3000/" + id, requestOptions);
  document.location.reload(true);
};

// //PUT: update an existing task the property done or not done.
const putTask = async (id) => {
  var raw = JSON.stringify({
    done: true,
  });

  var requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: raw,
    redirect: "follow",
  };

  const response = await fetch("http://localhost:3000/" + id, requestOptions);
  document.location.reload(true);
};
