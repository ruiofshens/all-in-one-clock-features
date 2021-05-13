//============================================== Overall Functionality ==============================================//

//Declare sidebar buttons and their respective contents
let allTabs = document.getElementsByClassName("content");
let allTabs2 = document.getElementsByClassName("nav-button");

//Variable that dictates which time format to use
let timeFormat = 0;

let countdownActive = false;
let countdownTime = 3600;

let stopwatchActive = false;
let stopwatchTime = 0;

//Toggles content
function toggleTab(tabName, buttonName) {
    countdownActive = false;
    stopwatchActive = false;
    let tabIndex;

    for (tabIndex = 0; tabIndex < allTabs.length; tabIndex++) {
        
        let button = allTabs2[tabIndex];
        if(button.id == buttonName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }

        let element = allTabs[tabIndex];
        if (element.id == tabName) {
            element.style.display = "flex";
            element.classList.add('active');
        } else {
            element.style.display = "none";
            element.classList.remove('active');
        }
    }
}

//============================================== Helper Functions ==============================================//

//Pads time fields with 0 if field is 1-digit (e.g. 2 becomes 02)
function formatTime(field) {
    return (field < 10 ? "0" : "") + field;
}

function convertTimeToHMS(noOfSeconds) {
    return {
        "hours": formatTime(Math.floor(noOfSeconds/3600)),
        "mins" : formatTime(Math.floor((noOfSeconds%3600)/60)),
        "secs" : formatTime(noOfSeconds%3600%60)
    };
}

//Toggles variable timeFormat
function toggleTime() {
    timeFormat == 0 ? timeFormat = 1 : timeFormat = 0; 
}

function toggleCountdown() {
    countdownActive = !countdownActive;
    startCountdown();
}

function toggleStopwatch() {
    stopwatchActive = !stopwatchActive;
    startStopwatch();
}

//============================================== Key Functionality ==============================================//

//Retrieves current system's time and calls appropiate display function
function getTime(){
    let date = new Date();
    let hour = formatTime(date.getHours());
    let min = formatTime(date.getMinutes());
    let sec = formatTime(date.getSeconds());
    timeFormat == 0 ? display12HrTime(hour, min, sec) : display24HrTime(hour, min, sec)
}

//Displays time in 24-hr format and calls getTime() after every second
function display24HrTime(hour, min, sec) {
    document.getElementById("clock-time").innerText = `${hour} : ${min} : ${sec}`;
    setTimeout(getTime, 1000);
}

//Displays time in 12-hr format and calls getTime() after every second
function display12HrTime(hour, min, sec){
    document.getElementById("clock-time").innerText = `${(hour % 12  || 12)} : ${min} : ${sec} ${hour < 12 ? 'am' : 'pm'}`;
    setTimeout(getTime, 1000);
}

function startCountdown() {
    if (countdownActive) {
        timeInfo = convertTimeToHMS(countdownTime);
        document.getElementById("countdown-time").innerText = `${timeInfo.hours} : ${timeInfo.mins} : ${timeInfo.secs}`;
        countdownTime--;
        setTimeout(startCountdown, 1000);
    }
}

function startStopwatch() {
    if (stopwatchActive) {
        timeInfo = convertTimeToHMS(stopwatchTime);
        document.getElementById("stopwatch-time").innerText = `${timeInfo.hours} : ${timeInfo.mins} : ${timeInfo.secs}`;
        stopwatchTime++;
        setTimeout(startStopwatch, 1000);
    }
}

function resetCountdown() {
    document.getElementById("countdown-time").innerText = "01:00:00";
}

function resetStopwatch() {
    document.getElementById("stopwatch-time").innerText = "00:00:00";
}

//============================================== Functions to Run on Start ==============================================//

getTime();
