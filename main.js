const spanTime = document.querySelector(".time__span");
const inputName = document.querySelector(".name__inputName");
const formName = document.querySelector(".name__form");
const divName = document.querySelector(".name");
const todolist = document.querySelector(".todolist");
const undo = document.querySelector(".btn-undo");

function mkClock() {
  const clock = new Date();
  const time = clock.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  spanTime.textContent = `${time}`;
  setInterval(mkClock, 1000);
}

function mkName() {
  const btn = document.querySelector(".btn-undo");
  const span = document.createElement("span");
  span.classList.add("js-name");
  divName.insertBefore(span, divName.firstChild);
  if (localStorage.getItem("name")) {
    inputName.style.display = "none";
    span.innerHTML = `Hello ${localStorage.getItem("name")}!`;
  } else {
    formName.addEventListener("submit", function (e) {
      const name = inputName.value.trim();

      e.preventDefault();
      if (name) {
        inputName.style.display = "none";
        divName.insertBefore(span, divName.firstChild);

        span.innerHTML = `Hello ${name}!`;
        localStorage.setItem("name", name);
      }
      showHide();
    });
  }
  btn.addEventListener("click", function () {
    localStorage.removeItem("name");
    span.remove();
    inputName.style.display = "block";
    inputName.focus();
  });
}
function showHide() {
  const todolist = document.querySelector(".todolist");
  console.log(inputName.style.display);
  if (inputName.style.display !== "none") {
    console.log("true");
    todolist.style.display = "none";
  } else {
    todolist.style.display = "flex";
  }
}
function init() {
  mkClock();
  mkName();
  showHide();
  undo.addEventListener("click", showHide);
}
init();
