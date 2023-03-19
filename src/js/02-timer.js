import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;
 const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const flatpickrInput = document.querySelector('#datetime-picker');

startBtn.disabled = true;
startBtn.addEventListener('click', onStartCounter);
flatpickrInput.addEventListener('click', onSecondCounter);
function onSecondCounter() {
  counter.restart()
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.failure('Sorry', 'Please, choose a date and click on start', 'ok');
    } else {
      selectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;

    }
  },
};

flatpickr(flatpickrInput, options);





function onStartCounter() {
  counter.start();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const counter = {
  start() {
    intervalId = setInterval(() => {
      currentDate = Date.now();
      const deltaTime = selectedDate - currentDate;
      updateTimerface(convertMs(deltaTime));
      startBtn.disabled = true;
      // flatpickrInput.disabled = true;

      if (deltaTime <= 1000) {
        this.stop();
       
      }
    }, TIMER_DELAY);
  },

  stop() {
    startBtn.disabled = true;
    flatpickrInput.disabled = false;
    clearInterval(intervalId);
    return;
  },
  restart() {
    startBtn.disabled = true;
    flatpickrInput.disabled = false;
    clearInterval(intervalId);
    dataDays.textContent = `00`;
  dataHours.textContent = `00`;
  dataMinutes.textContent = `00`;
  dataSeconds.textContent = `00`;
    return;
  }
};

function updateTimerface({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


