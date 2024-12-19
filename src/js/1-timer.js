import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const startBtnEl = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker');

const timer = {
  deadline: null,
  intervalID: null,
  elements: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },

  start() {
    this.intervalID = setInterval(() => {
      const diff = this.deadline.getTime() - Date.now();
      if (diff <= 0) {
        this.stop();
        return;
      }
      let { days, hours, minutes, seconds } = this.convertMs(diff);
      this.elements.days.textContent = this.pad(days);
      this.elements.hours.textContent = this.pad(hours);
      this.elements.minutes.textContent = this.pad(minutes);
      this.elements.seconds.textContent = this.pad(seconds);
    }, 1000);

    startBtnEl.disabled = true;
    datePicker.disabled = true;
  },

  stop() {
    clearInterval(this.intervalID);
    datePicker.disabled = false;
    startBtnEl.disabled = true;
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

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    const isCorrectDate = selectedDates[0] - Date.now() > 0;
    if (!isCorrectDate) {
      iziToast.error({
        title: 'Error!',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtnEl.disabled = true;
      return;
    }

    startBtnEl.disabled = false;

    timer.deadline = selectedDates[0];

    startBtnEl.addEventListener('click', event => {
      timer.start();
    });
  },
});
