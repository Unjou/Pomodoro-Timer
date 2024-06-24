let workMinutes = 25;
let breakMinutes = 5;
let longBreakMinutes = 15;
let seconds = 0;
let isWorkTime = true;
let sessionCount = 0;
let interval;

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const sessionCountElement = document.getElementById('session-count');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function updateTimer() {
    minutesElement.textContent = String(workMinutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    interval = setInterval(() => {
        if (seconds === 0) {
            if (workMinutes === 0) {
                clearInterval(interval);
                if (isWorkTime) {
                    sessionCount++;
                    sessionCountElement.textContent = sessionCount;
                    workMinutes = sessionCount % 4 === 0 ? longBreakMinutes : breakMinutes;
                    isWorkTime = false;
                } else {
                    workMinutes = 25;
                    isWorkTime = true;
                }
                alert(isWorkTime ? "Break time is over! Back to work!" : "Time for a break!");
            } else {
                workMinutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        updateTimer();
    }, 1000);
}

function pauseTimer() {
    clearInterval(interval);
}

function resetTimer() {
    clearInterval(interval);
    workMinutes = 25;
    seconds = 0;
    isWorkTime = true;
    updateTimer();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateTimer();
