

const deleteAll = document.getElementById('delete-all-btn')
const alertMessage = document.getElementById("alert_message")
const taskInp = document.getElementById("taskInp")
const dateInp = document.getElementById("dateInp")
const addBtn = document.querySelector(".addBtn")
const editBtn = document.querySelector(".editBtn")
const todoFilterBtn = document.querySelectorAll(".filter-todos")




const todosBody = document.querySelector("tbody")


let todos = JSON.parse(localStorage.getItem("todos")) || [];


const generateId = () => {
  return Math.round(Math.random() * Math.random() * Math.pow(10, 15)).toString()
}

const saveToLocaStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos))
}



generateId()

const ShowAlert = (message, type) => {
  alertMessage.innerHTML = " "
  const alert = document.createElement("p")

  alert.innerText = message;
  alert.classList.add("alert")
  alert.classList.add(`alert-${type}`)
  alertMessage.appendChild(alert)

  setTimeout(() => {
    alert.style.display = "none"
  }, 2000)

}

const displayTodo = (data) => {
  const todolist = data || todos
  todosBody.innerHTML = "";


  if (!todolist.length) {
    todosBody.innerHTML = " <tr><td colspan='4'>No task found!</td></tr>"
    return;
  }
  todolist.forEach(todo => {
    todosBody.innerHTML += `
            <tr>
            <td >${todo.task}</td>
            <td >${todo.date || "No Date"}</td>
            <td >${todo.completed ? "Completed" : "pending"}</td>
            <td >
            <button onClick="editHandler('${todo.id}')">Edit</button>
            <button onClick="toggleHandlar('${todo.id}')">
            ${todo.completed ? "Undo" : "Do"} </button>
            <button onclick="deleteHeandlar('${todo.id}')">Delete</button>
            </td> 
             

            </tr>`
  });
}

const addHeandlar = event => {
  const task = taskInp.value
  const date = dateInp.value

  const todo = {
    id: generateId(),
    completed: false,
    task,
    date,

  }
  if (task) {
    todos.push(todo);
    saveToLocaStorage(),
      displayTodo()
    taskInp.value = "";
    dateInp.value = "";

    ShowAlert("Todo added  successfully", "success")
  } else {
    ShowAlert("Please enter a todo!", "error")
  }
}

const allDeleteHeandlar = () => {
  if (todos.length) {
    todos = []
    saveToLocaStorage()
    displayTodo()
    ShowAlert("All todos cleared successfully", "success")
  } else {
    ShowAlert("No todos to clear", "error")
  }

}

const deleteHeandlar = (id) => {
  const newTodos = todos.filter(todo => todo.id !== id)
  todos = newTodos;
  saveToLocaStorage()
  displayTodo()
  ShowAlert("todo delete successfully", "success")
}

const toggleHandlar = (id) => {
  /* const newTodos = todos.map(todo => {
    if (todo.id === id) {
       return {
        id: todo.id,
        task: todo.task,
        date: todo.date,
        completed: !todo.completed
      } 
     return{
      ...todo,
        completed: !todo.completed
     }
    }
    else {
      return todo
    }
    
  })
  todos = newTodos; */
  const todo = todos.find((todo) => todo.id === id)
  todo.completed = !todo.completed


  saveToLocaStorage()
  displayTodo()
  ShowAlert("Todo status changed uccessfully", "success")




}


const editHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id)
  taskInp.value = todo.task;
  dateInp.value = todo.date;
  addBtn.style.display = "none"
  editBtn.style.display = "inline-block"
  editBtn.dataset.id = id;


}

const applyEditHandler = (event) => {
  const id = event.target.dataset.id
  const todo = todos.find((todo) => todo.id === id)
  todo.task = taskInp.value
  todo.date = dateInp.value
  taskInp.value = ""
  dateInp.value = ""
  addBtn.style.display = "inline-block"
  editBtn.style.display = "none"

  saveToLocaStorage()
  displayTodo()
  ShowAlert("Todo edited uccessfully", "success")



}

const filterHandler = (event) => {
  let filterTddos = null
  const filter = event.target.dataset.filter

  switch (filter) {
    case "pending":
      filterTddos = todos.filter((todo) => todo.completed === false);
      break;
    case "completed":
      filterTddos = todos.filter((todo) => todo.completed === true);
      break;





    default:
      filterTddos = todos
      break;
  }

  displayTodo(filterTddos)


}

window.addEventListener("load", () => displayTodo())
addBtn.addEventListener("click", addHeandlar)
deleteAll.addEventListener("click", allDeleteHeandlar)
editBtn.addEventListener("click", applyEditHandler)
todoFilterBtn.forEach(filterBtn => {
  filterBtn.addEventListener("click", filterHandler)
})