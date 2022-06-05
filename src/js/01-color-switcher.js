const startButton = document.querySelector(`[data-start]`)
const stopButton = document.querySelector(`[data-stop]`)
const bodyEl = document.querySelector(`body`);

startButton.addEventListener(`click`, onStartButtonClick)
stopButton.addEventListener(`click`, onStopButtonClick)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyBackgroundColor() {
    return bodyEl.style.backgroundColor = getRandomHexColor();
}


function onStartButtonClick(event) {

    const intervalID = setInterval(changeBodyBackgroundColor, 1000)

    startButton.disabled = true;
}


function onStopButtonClick(event) {

    const intervalID = setInterval(getRandomHexColor(), 1000)

    startButton.disabled = true;
}