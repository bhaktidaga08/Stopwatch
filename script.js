let interval;
let startTime;
let offset = 0;
let splitTimes = [];

function start() {
    if (!interval) {
        startTime = Date.now() - offset;
        interval = setInterval(updateTimer, 1000);
    }
}

function pause() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        offset = Date.now() - startTime;
    }
}

function reset() {
    clearInterval(interval);
    interval = null;
    offset = 0;
    startTime = 0;
    updateTimer();
    resetLap();
}

function restart() {
    reset();
    start();
}

function lap() {
    if (interval) {
        const currentTime = getTime();
        splitTimes.push(currentTime);
        updateLapList();
    }
}

function split() {
    if (interval) {
        const currentTime = getTime();
        splitTimes.push(currentTime);
        updateLapList();
    }
}

function resetLap() {
    splitTimes = [];
    updateLapList();
}

function getTime() {
    const now = Date.now();
    const elapsedTime = now - startTime + offset;
    return millisecondsToTime(elapsedTime);
}

function millisecondsToTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    const remainingHours = hours % 24;

    const formattedTime = `${days}:${remainingHours}:${remainingMinutes}:${remainingSeconds}`;
    return formattedTime;
}

function updateTimer() {
    const timerDisplay = document.querySelector(".timer-Display");
    const elapsedTime = getTime();
    timerDisplay.textContent = elapsedTime;
}

function updateLapList() {
    const lapList = document.querySelector(".laps");
    lapList.innerHTML = "";

    for (let i = 0; i < splitTimes.length; i++) {
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${i + 1}: ${splitTimes[i]}`;
        lapList.appendChild(lapItem);
    }
}