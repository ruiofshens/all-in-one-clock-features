function toggleTab(tabName) {
    let i;
    let x = document.getElementsByClassName("content");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}

function getTime() {
    let date = new Date();
    

    let hour = formatTime(date.getHours());
    let min = formatTime(date.getMinutes());
    let sec = formatTime(date.getSeconds());

    document.getElementById("clock-time").innerText = `${hour} : ${min} : ${sec}`;
    setTimeout(getTime, 1000);
}

function changeTimeFormat(){
    
}

function formatTime(time) {
    return (time < 10 ? "0" : "") + time
}

getTime();
