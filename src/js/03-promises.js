import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayEl = document.querySelector(`[name="delay"]`);
const stepEl = document.querySelector(`[name="step"]`);
const amountEl = document.querySelector(`[name="amount"]`);
const formEl = document.querySelector(`.form`);

formEl.addEventListener(`submit`, onSubmit)

function onSubmit(event) {
  event.preventDefault();
  const delay = parseInt(delayEl.value, 10);
  const step = parseInt(stepEl.value, 10);
  const amount = parseInt(amountEl.value, 10);

  for (let i = 0; i < amount; i++) {
    if (i === 0) { setTimeout(createPromise, delay, i + 1, delay); continue}
    const time = i * step + delay;
    setTimeout(createPromise, time, i + 1, time)
  }
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


  
