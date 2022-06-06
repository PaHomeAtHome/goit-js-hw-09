import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector(`[data-start]`)
const timerEl = document.querySelector(`.timer`)
const days = timerEl.querySelector(`[data-days]`)
const hours = timerEl.querySelector(`[data-hours]`)
const minutes = timerEl.querySelector(`[data-minutes]`)
const seconds = timerEl.querySelector(`[data-seconds]`)
const inputEl = document.querySelector(`#datetime-picker`)

let timeChosen = null;
let intervalID = null;

const timeObject = { days, hours, minutes, seconds }

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
         const timeNow = Date.now();
        timeChosen = selectedDates[0].getTime();
        const diff = timeChosen - timeNow;

          if (diff < 0) {
            Notify.failure('Please select time in Future');
              return;
        }

        startButton.disabled = false;
        return timeChosen;
  },
};

inputEl.style.padding = `20px`
inputEl.style.textAlign = `center`

startButton.addEventListener(`click`, onStartButton)
startButton.disabled = true;
startButton.style.padding = `20px`

timerEl.style.display = `flex`
timerEl.style.fontSize = `36px`
timerEl.style.justifyContent = `center`
timerEl.style.textAlign = `center`

days.style.padding = `20px` 
days.style.margin = `40px` 
days.style.color = `purple`
days.style.display = `block`
days.style.backgroundColor = `#DDDDDD`
days.style.borderRadius = `20px`

hours.style.padding = `20px`
hours.style.margin = `40px` 
hours.style.color = `green`
hours.style.display = `block`
hours.style.backgroundColor = `#DDDDDD`
hours.style.borderRadius = `20px`

minutes.style.padding = `20px`
minutes.style.margin = `40px` 
minutes.style.color = `blue`
minutes.style.display = `block`
minutes.style.backgroundColor = `#DDDDDD`
minutes.style.borderRadius = `20px`

seconds.style.padding = `20px`
seconds.style.margin = `40px` 
seconds.style.color = `red`
seconds.style.display = `block`
seconds.style.backgroundColor = `#DDDDDD`
seconds.style.borderRadius = `20px`

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.padStart(2, '0')
}

function onStartButton(event) {
    intervalID = setInterval(startCountdown, 1000)
}

function startCountdown() {

    startButton.disabled = true;
    const timeNow = Date.now();
    const diff = timeChosen - timeNow;
    const convertedTime = convertMs(diff);

    for (const time in timeObject) {
        if  (Object.keys(convertedTime).includes(time)) {
        timeObject[time].textContent = addLeadingZero(convertedTime[time].toString());
        }
    }

    if (diff <= 0) {
        stopCountdown()
    }
}

function stopCountdown() {
    clearInterval(intervalID);
    Notify.success(`Time is over`)
    for (const time in timeObject) {
        timeObject[time].textContent = `00`;
    }
    startButton.disabled = true;
}
