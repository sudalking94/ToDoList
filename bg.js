const body = document.querySelector("body");
const IMG_NUMBER = 7;
function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.png`;
  image.classList.add("bgImage");
  body.prepend(image);
}
function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}
function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
}
init();