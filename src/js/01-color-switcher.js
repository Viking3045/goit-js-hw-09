function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const body = document.querySelector('body')
const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
start.style.padding = "10px";
start.style.marginLeft = "700px";
start.style.marginTop = "200px";
stop.style.padding = "10px";
start.style.cursor = "pointer";
stop.style.cursor = "pointer";

let timerStyleBackgroundColor = null;

start.addEventListener("click", () => {
    timerStyleBackgroundColor = setInterval(() => {
      body.style.backgroundColor = `${getRandomHexColor()}`;
        start.setAttribute('disabled', true);
        stop.removeAttribute('disabled');
    }, 1000);
});


stop.addEventListener("click", () => {
    clearInterval(timerStyleBackgroundColor);
    start.removeAttribute('disabled');
    stop.setAttribute('disabled', true);
});
