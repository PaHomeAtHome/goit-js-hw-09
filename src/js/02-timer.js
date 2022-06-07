import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector(`[data-start]`)
const timerEl = document.querySelector(`.timer`)
const days = timerEl.querySelector(`[data-days]`)
const hours = timerEl.querySelector(`[data-hours]`)
const minutes = timerEl.querySelector(`[data-minutes]`)
const seconds = timerEl.querySelector(`[data-seconds]`)

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

startButton.addEventListener(`click`, onStartButton)
startButton.disabled = true;

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
