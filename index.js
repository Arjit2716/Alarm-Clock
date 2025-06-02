const currentTimeDisplay = document.getElementById('current-time');
const alarmInput = document.getElementById('alarm-time');
const setAlarmBtn = document.getElementById('set-alarm');
const clearAlarmBtn = document.getElementById('clear-alarm');
const alarmStatus = document.getElementById('alarm-status');
const alarmAudio = document.getElementById('alarm-audio');

let alarmTime = null;
let alarmActive = false;

// Show live clock

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-GB'); // 24-hour format
  currentTimeDisplay.textContent = timeString;

  const currentHoursAndMinutes = timeString.slice(0, 5);
  if (alarmTime === currentHoursAndMinutes && !alarmActive) {
    triggerAlarm();
  }
}

setInterval(updateClock, 1000);

// Alarm handling

function triggerAlarm() {
  alarmAudio.play();
  alarmActive = true;
  alarmStatus.textContent = "🔔 Alarm ringing!";
  clearAlarmBtn.disabled = false;
}

// Set Alarm

setAlarmBtn.addEventListener('click', () => {
  const time = alarmInput.value;

  if (!time) {
    alert("Please select a valid time.");
    return;
  }

  alarmTime = time;
  alarmActive = false;
  alarmStatus.textContent = `Alarm set for ${alarmTime}`;
  clearAlarmBtn.disabled = false;
});

// Clear Alarm

clearAlarmBtn.addEventListener('click', () => {
  alarmTime = null;
  alarmActive = false;
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
  alarmStatus.textContent = "Alarm cleared.";
  clearAlarmBtn.disabled = true;
});
