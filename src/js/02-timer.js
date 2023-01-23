import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputField = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');

startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= Date.now()) {
      window.alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }

    const timer = {
      deadline: selectedDates[0],
      intervalId: null,
      rootSelector: document.querySelector('.timer'),

      start() {
        inputField.setAttribute('disabled', '');

        this.intervalId = setInterval(() => {
          const ms = this.deadline - Date.now();

          if (ms <= 0) {
            this.stop();

            return;
          }

          let { days, hours, minutes, seconds } = this.convertMs(ms);

          this.rootSelector.querySelector('[data-days]').textContent =
            this.addLeadingZero(days);
          this.rootSelector.querySelector('[data-hours]').textContent =
            this.addLeadingZero(hours);
          this.rootSelector.querySelector('[data-minutes]').textContent =
            this.addLeadingZero(minutes);
          this.rootSelector.querySelector('[data-seconds]').textContent =
            this.addLeadingZero(seconds);
        }, 1000);
      },

      stop() {
        clearInterval(this.intervalId);
      },

      convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
      },

      addLeadingZero(value) {
        return String(value).padStart(2, 0);
      },
    };

    const onStartBtnClick = () => {
      timer.start();
      startBtn.setAttribute('disabled', '');
    };

    startBtn.addEventListener('click', onStartBtnClick);
  },
};

flatpickr(inputField, options);
