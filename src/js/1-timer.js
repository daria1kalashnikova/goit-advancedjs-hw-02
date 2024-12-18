import flatpickr from 'flatpickr';

const startBtnEl = document.querySelector('.data-start');
console.log(startBtnEl);

const timer = {
  deadline: null,
  intervalID: null,
  elements: {},

  start() {},

  stop() {},
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
      alert('Please choose a date in the future');
      return;
    }

    timer.deadline = selectedDates[0];

    timer.start();
  },
});
