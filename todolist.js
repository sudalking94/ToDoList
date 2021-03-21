const tbody = document.querySelector(".todolist__tbody");
const form = document.querySelector(".todolist__form");
const inputText = document.getElementById("todolist__text");
const name = document.querySelector(".name");
const LOCALTODO = "todo";
const LOCALFINISH = "finish";
let todoList = [];
let finishList = [];
function saveToDos() {
  localStorage.setItem(LOCALTODO, JSON.stringify(todoList));
}
function saveFinish() {
  localStorage.setItem(LOCALFINISH, JSON.stringify(finishList));
}
function deleteToDo(e) {
  const parentTr = e.target.parentNode.parentNode;
  parentTr.remove();
  const cleanToDos = todoList.filter(function (todo) {
    return parseInt(todo.id) !== parseInt(parentTr.id);
  });
  todoList = cleanToDos;
  saveToDos();
}
function deleteFinish(e) {
  const parentTr = e.target.parentNode.parentNode;
  parentTr.remove();
  const cleanDones = finishList.filter(function (done) {
    return parseInt(done.id) !== parseInt(parentTr.id);
  });
  finishList = cleanDones;
  saveFinish();
}

function finishToDo(e) {
  deleteToDo(e);
  const text = e.target.parentNode.parentNode.childNodes[0].innerHTML;
  const tbody = document.querySelector(".done__tbody");
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const secondTd = document.createElement("td");
  const btnF = document.createElement("button");

  tbody.appendChild(tr);
  tr.appendChild(td);
  tr.appendChild(secondTd);

  secondTd.appendChild(btnF);
  tr.classList.add("todolist__todo__tbody__tr");
  tr.id = finishList.length + 1;
  td.innerHTML = text;
  btnF.innerHTML = "👋";
  const finishObj = {
    id: tr.id,
    text: text,
  };
  btnF.addEventListener("click", returnDone);
  finishList.push(finishObj);
  saveFinish();
}
function addToDo(e) {
  e.preventDefault();
  if (inputText.value.trim()) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const secondTd = document.createElement("td");
    const btnD = document.createElement("button");
    const btnF = document.createElement("button");

    tbody.appendChild(tr);
    tr.appendChild(td);
    tr.appendChild(secondTd);
    secondTd.appendChild(btnD);
    secondTd.appendChild(btnF);
    tr.classList.add("todolist__todo__tbody__tr");
    tr.id = todoList.length + 1;
    td.innerHTML = inputText.value;
    btnD.innerHTML = "✘";
    btnF.innerHTML = "✔";
    const todoValue = {
      id: todoList.length + 1,
      text: inputText.value,
    };
    todoList.push(todoValue);
    inputText.value = "";

    localStorage.setItem("todo", JSON.stringify(todoList));

    btnD.addEventListener("click", deleteToDo);
    btnF.addEventListener("click", finishToDo);
  }
}

function makeToDo(text) {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const secondTd = document.createElement("td");
  const btnD = document.createElement("button");
  const btnF = document.createElement("button");
  tbody.appendChild(tr);
  tr.appendChild(td);
  tr.appendChild(secondTd);
  secondTd.appendChild(btnD);
  secondTd.appendChild(btnF);
  tr.classList.add("todolist__todo__tbody__tr");
  tr.id = todoList.length + 1;
  const todoValue = {
    id: tr.id,
    text: text,
  };
  td.innerHTML = text;
  btnD.innerHTML = "✘";
  btnF.innerHTML = "✔";
  todoList.push(todoValue);
  btnD.addEventListener("click", deleteToDo);
  btnF.addEventListener("click", finishToDo);
}
function returnDone(e) {
  deleteFinish(e);
  const text = e.target.parentNode.parentNode.childNodes[0].innerHTML;
  makeToDo(text);
}

function makeDone(text) {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const secondTd = document.createElement("td");
  const btnF = document.createElement("button");
  const tbody = document.querySelector(".done__tbody");

  btnF.addEventListener("click", returnDone);

  tbody.appendChild(tr);
  tr.appendChild(td);
  tr.appendChild(secondTd);
  secondTd.appendChild(btnF);
  tr.classList.add("todolist__todo__tbody__tr");
  tr.id = finishList.length + 1;
  const doneValue = {
    id: tr.id,
    text: text,
  };
  td.innerHTML = text;

  btnF.innerHTML = "👋";
  finishList.push(doneValue);
}
function init() {
  const loadedToDos = localStorage.getItem(LOCALTODO);
  const loadedDone = localStorage.getItem(LOCALFINISH);
  if (loadedToDos) {
    const parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach(function (toDo) {
      makeToDo(toDo.text);
    });
  }
  if (loadedDone) {
    const parseDones = JSON.parse(loadedDone);
    parseDones.forEach(function (done) {
      makeDone(done.text);
    });
  }
  form.addEventListener("submit", addToDo);
}
init();
