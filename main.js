const div_time = document.querySelector(".time");
const inputName = document.querySelector(".name__inputName");
const formName = document.querySelector(".name__form");
const divName = document.querySelector(".name");

function mkClock() {
  const span = document.createElement("span");
  div_time.appendChild(span);

  setInterval(function () {
    const clock = new Date();
    const time = clock.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const second = clock.getSeconds();
    const s = second < 10 ? "0" + second : second;
    span.textContent = `${time} ${s}`;
  }, 1000);
}

function mkName() {
  const btn = document.querySelector(".btn-undo");
  const span = document.createElement("span");
  divName.appendChild(span);
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
    });
  }
  btn.addEventListener("click", function () {
    localStorage.removeItem("name");
    span.remove();
    inputName.style.display = "block";
    inputName.focus();
  });
}

function init() {
  mkClock();
  mkName();
}
init();
