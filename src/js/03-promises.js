const promisesForm = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}

const onSubmit = event => {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  const delayNmb = Number(delay.value);
  const stepNmb = Number(step.value);
  const amountNmb = Number(amount.value);

  for (let i = 0; i < amountNmb; i += 1) {
    createPromise(i + 1, delayNmb + stepNmb * i)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

promisesForm.addEventListener('submit', onSubmit);
