//============================================== Overall Functionality ==============================================//

//Declare sidebar buttons and their respective contents
let allTabs = document.getElementsByClassName("content");
let allTabs2 = document.getElementsByClassName("nav-button");

//Toggles content
function toggleTab(tabName, buttonName) {
    countDown = false;
    let tabIndex;

    for (tabIndex = 0; tabIndex < allTabs.length; tabIndex++) {
        let element = allTabs[tabIndex];
        if (element.id == tabName) {
            element.style.display = "block";
            element.classList.add('active');
        } else {
            element.style.display = "none";
            element.classList.remove('active');
        }

        let button = allTabs2[tabIndex];
        if(button.id == buttonName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }
}

//============================================== Clock Functionality ==============================================//

//Variable that dictates which time format to use
let timeFormat = 0;

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

//Pads time fields with 0 if field is 1-digit (e.g. 2 becomes 02)
function formatTime(field) {
    return (field < 10 ? "0" : "") + field;
}

//Toggles variable timeFormat
function toggleTime() {
    timeFormat == 0 ? timeFormat = 1 : timeFormat = 0; 
}

//============================================== Timer Functionality ==============================================//

let countDownTime = 3600;
let countDown = false;

function toggleCountdown() {
    countDown = !countDown;
    startCountdown();
}


function startCountdown() {
    if (countDown) {
        document.getElementById("timer-time").innerText = 
        `${formatTime(Math.floor(countDownTime/3600))} : 
        ${formatTime(Math.floor((countDownTime%3600)/60))} : 
        ${formatTime(countDownTime%3600%60)}`;
        countDownTime--;
        setTimeout(startCountdown, 1000);
    }
}

//============================================== Functions to Run on Start ==============================================//

getTime();
