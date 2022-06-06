import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayEl = document.querySelector(`[name="delay"]`);
const stepEl = document.querySelector(`[name="step"]`);
const amountEl = document.querySelector(`[name="amount"]`);
const formEl = document.querySelector(`.form`);

formEl.addEventListener(`submit`, onSubmit)

let position = 0;
let intervalId = null;

function onSubmit(event) {
  event.preventDefault();
  const delay = parseInt(delayEl.value, 10);
  const step = parseInt(stepEl.value, 10);
  const amount = parseInt(amountEl.value, 10);

  makeTimeout(delay, step, amount)
}

function makeTimeout(delay, step, amount) {
  const timeoutId = setTimeout(makeInterval, delay, amount, delay, step)
}

function makeInterval(amount, delay, step) {
  callPromise(amount, delay, step)
  intervalId = setInterval(callPromise, step, amount, delay, step)
}

function callPromise(amount, delay, step) {
  const time = delay + step * position;
    position += 1;
  if (position > amount) {
    clearInterval(intervalId)
    position = 0;
    return;
  }
  
  createPromise(position, time)
} 
  
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notify.success(`Fullfilled promise ${position} in ${delay}ms`);
  } else {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  }

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay })
    }
    reject({ position, delay })
  }).then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}


  
