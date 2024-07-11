document.addEventListener('DOMContentLoaded', function() {
    let workMinutes = localStorage.getItem('workMinutes') ? parseInt(localStorage.getItem('workMinutes')) : 25;
    let breakMinutes = localStorage.getItem('breakMinutes') ? parseInt(localStorage.getItem('breakMinutes')) : 5;
    let longBreakMinutes = localStorage.getItem('longBreakMinutes') ? parseInt(localStorage.getItem('longBreakMinutes')) : 15;
    let seconds = localStorage.getItem('seconds') ? parseInt(localStorage.getItem('seconds')) : 0;
    let isWorkTime = localStorage.getItem('isWorkTime') ? JSON.parse(localStorage.getItem('isWorkTime')) : true;
    let sessionCount = localStorage.getItem('sessionCount') ? parseInt(localStorage.getItem('sessionCount')) : 0;
    let isRunning = localStorage.getItem('isRunning') ? JSON.parse(localStorage.getItem('isRunning')) : false;
    let speed = localStorage.getItem('speed') ? parseInt(localStorage.getItem('speed')) : 1000;  // Default speed is normal
    let hasBeenSpedUp = localStorage.getItem('hasBeenSpedUp') ? JSON.parse(localStorage.getItem('hasBeenSpedUp')) : false; // To track if timer has been sped up
    let interval;

    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const sessionCountElement = document.getElementById('session-count');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const customStartButton = document.getElementById('start-custom');
    const darkModeToggle = document.getElementById('toggle-dark-mode');
    const customWorkMinutesInput = document.getElementById('custom-work-minutes');
    const customBreakMinutesInput = document.getElementById('custom-break-minutes');

    function updateTimer() {
        minutesElement.textContent = String(workMinutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            localStorage.setItem('isRunning', isRunning);
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (workMinutes === 0) {
                        clearInterval(interval);
                        isRunning = false;
                        localStorage.setItem('isRunning', isRunning);
                        if (isWorkTime) {
                            sessionCount++;
                            sessionCountElement.textContent = sessionCount;
                            workMinutes = sessionCount % 4 === 0 ? longBreakMinutes : breakMinutes;
                            isWorkTime = false;
                        } else {
                            workMinutes = parseInt(customWorkMinutesInput.value);
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
                saveTimerState();
                updateTimer();
            }, speed);
        }
    }

    function pauseTimer() {
        clearInterval(interval);
        isRunning = false;
        localStorage.setItem('isRunning', isRunning);
        saveTimerState();
    }

    function resetTimer() {
        clearInterval(interval);
        workMinutes = parseInt(customWorkMinutesInput.value);
        breakMinutes = parseInt(customBreakMinutesInput.value);
        longBreakMinutes = breakMinutes * 3;
        seconds = 0;
        isWorkTime = true;
        sessionCount = 0;
        isRunning = false;
        speed = 1000;
        hasBeenSpedUp = false;
        saveTimerState();
        updateTimer();
    }

    function saveTimerState() {
        localStorage.setItem('workMinutes', workMinutes);
        localStorage.setItem('breakMinutes', breakMinutes);
        localStorage.setItem('longBreakMinutes', longBreakMinutes);
        localStorage.setItem('seconds', seconds);
        localStorage.setItem('isWorkTime', isWorkTime);
        localStorage.setItem('sessionCount', sessionCount);
        localStorage.setItem('isRunning', isRunning);
        localStorage.setItem('speed', speed);
        localStorage.setItem('hasBeenSpedUp', hasBeenSpedUp);
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    startButton.addEventListener('click', function() {
        if (!hasBeenSpedUp && !isRunning) {
            speed /= 2;
            hasBeenSpedUp = true;
            clearInterval(interval);
            startTimer();
        } else if (!isRunning) {
            startTimer();
        }
    });

    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    customStartButton.addEventListener('click', function() {
        workMinutes = parseInt(customWorkMinutesInput.value);
        breakMinutes = parseInt(customBreakMinutesInput.value);
        longBreakMinutes = breakMinutes * 3;
        seconds = 0;
        isWorkTime = true;
        isRunning = false;
        speed = 1000;
        hasBeenSpedUp = false;
        updateTimer();
        startTimer();
    });
    darkModeToggle.addEventListener('click', toggleDarkMode);

    updateTimer();
});
