const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", allTodosRemove);
    filterInput.addEventListener("keyup", filter);
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");

    if (todoListesi.length > 0) {
        todoListesi.forEach(todo => {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {

                todo.setAttribute("style", "display : block");
            }
            else {
                todo.setAttribute("style", "display : none ! important");
            }
        });
    }
    else {
        showAlert("warning", "Filtreleme için en az bir todo olmalıdır.")
    }

}

function allTodosRemove() {
    const todoListesi = document.querySelectorAll(".list-group-item");

    //Ekrandan silme
    if (todoListesi.length > 0) {
        todoListesi.forEach(todo => {
            todo.remove();
        });

        // Storage'dan silme

        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "Başarılı bir şekilde temizlendi.")

    } else {
        showAlert("warning", "Silmek için bir todo olmalıdır.");
    }
}


function removeTodoToUI(e) {
    if (e.target.className === "fa fa-remove") {
        // Ekrandan silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        // Storagedan silme
        removeTodoToStorage(todo.textContent);

        showAlert("success", "Todo başarıyla silindi.")

    }
}
function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
function addTodo(e) {
    //UI'a ekleme
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Lütfen boş bırakmayınız!")

    }
    else {
        addTodoToUI(inputText);
        addTodoFromToStorage(inputText);
        showAlert("success", "Todo Eklendi.")

    }

    e.preventDefault();
}
function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";

}

function checkTodosFromStorage(newTodo) {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function addTodoFromToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`; // literal template
    div.textContent = message;

    firstCardBody.appendChild(div);
    setTimeout(() => {
        div.remove();

    }, 2000);
}
