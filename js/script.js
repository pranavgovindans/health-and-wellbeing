// =============================
// Sleep Analytics Dashboard
// =============================
alert("script.js loaded");

let timer;
let seconds = 0;

let paused = false;

const stages = [
    "Awake",
    "Light Sleep",
    "Deep Sleep",
    "REM Sleep"
];

const stageHours = {
    "Awake": 0,
    "Light Sleep": 0,
    "Deep Sleep": 0,
    "REM Sleep": 0
};

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

const sleepTimeOutput = document.getElementById("sleepTimeOutput");
const wakeTimeOutput = document.getElementById("wakeTimeOutput");
const durationOutput = document.getElementById("durationOutput");
const centerHoursVal = document.getElementById("centerHoursVal");

const heartRate = document.getElementById("heartRate");
const respRate = document.getElementById("respRate");

const deepSleep = document.getElementById("deepSleep");
const lightSleep = document.getElementById("lightSleep");
const remSleep = document.getElementById("remSleep");
const awakeSleep = document.getElementById("awakeSleep");

const logArea = document.getElementById("logArea");

function log(msg){

    const time = new Date().toLocaleTimeString();

    logArea.innerHTML =
        "["+time+"] "+msg+"<br>" + logArea.innerHTML;

}

function updateClock(){

    seconds++;

    let hrs = Math.floor(seconds/3600);
    let mins = Math.floor((seconds%3600)/60);
    let sec = seconds%60;

    durationOutput.innerHTML =
        hrs+"h "+mins+"m "+sec+"s";

    centerHoursVal.innerHTML =
        hrs+"h";

}

function random(min,max){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function simulateVitals(){

    heartRate.innerHTML =
        random(55,78)+" bpm";

    respRate.innerHTML =
        random(12,18)+" rpm";

}

function simulateStage(){

    const stage =
        stages[random(0,3)];

    log("Sleep Stage : "+stage);

    switch(stage){

        case "Awake":
            stageHours["Awake"]+=1;
            break;

        case "Light Sleep":
            stageHours["Light Sleep"]+=1;
            break;

        case "Deep Sleep":
            stageHours["Deep Sleep"]+=1;
            break;

        case "REM Sleep":
            stageHours["REM Sleep"]+=1;
            break;

    }

    awakeSleep.innerHTML =
        stageHours["Awake"]+" min";

    lightSleep.innerHTML =
        stageHours["Light Sleep"]+" min";

    deepSleep.innerHTML =
        stageHours["Deep Sleep"]+" min";

    remSleep.innerHTML =
        stageHours["REM Sleep"]+" min";

}

if (startBtn) {
startBtn.onclick=function(){
    clearInterval(timer);

    paused=false;

    sleepTimeOutput.innerHTML =
        new Date().toLocaleTimeString();

    log("Tracking Started");

    timer=setInterval(function(){

        if(!paused){

            updateClock();

            simulateVitals();

            if(seconds%20==0){

                simulateStage();

            }

        }

    },1000);

    startBtn.disabled=true;

    stopBtn.disabled=false;

}
}

if (pauseBtn) {
pauseBtn.onclick=function(){

    paused=!paused;

    if(paused){

        pauseBtn.innerHTML="▶ Resume";

        log("Tracking Paused");

    }

    else{

        pauseBtn.innerHTML="⏸ Pause";

        log("Tracking Resumed");

    }

};
}

if (stopBtn) {
    stopBtn.onclick = function () {

        clearInterval(timer);

        wakeTimeOutput.innerHTML =
            new Date().toLocaleTimeString();

        log("Tracking Stopped");

        startBtn.disabled = false;
        stopBtn.disabled = true;

    };
}

if (resetBtn) {
    resetBtn.onclick = function () {

        clearInterval(timer);

        seconds = 0;
        paused = false;

        stageHours["Awake"] = 0;
        stageHours["Light Sleep"] = 0;
        stageHours["Deep Sleep"] = 0;
        stageHours["REM Sleep"] = 0;

        sleepTimeOutput.innerHTML = "--:--";
        wakeTimeOutput.innerHTML = "--:--";
        durationOutput.innerHTML = "0 Hours";
        centerHoursVal.innerHTML = "0h";

        heartRate.innerHTML = "72 bpm";
        respRate.innerHTML = "16 rpm";

        awakeSleep.innerHTML = "0 h";
        lightSleep.innerHTML = "0 h";
        deepSleep.innerHTML = "0 h";
        remSleep.innerHTML = "0 h";

        logArea.innerHTML = "Dashboard Ready...";

        pauseBtn.innerHTML = "⏸ Pause";

        startBtn.disabled = false;
        stopBtn.disabled = true;

    };
}

// =============================
// Phone / Watch Switching
// =============================

const phoneBtn = document.getElementById("phoneBtn");
const externalBtn = document.getElementById("externalBtn");
console.log("phoneBtn =", phoneBtn);
console.log("externalBtn =", externalBtn);
const scanArea = document.getElementById("scanArea");
const deviceList = document.getElementById("deviceList");
const statusPill = document.getElementById("statusPill");
const scanBtn = document.getElementById("scanBtn");

if (phoneBtn && externalBtn) {
    phoneBtn.onclick = function () {
        phoneBtn.classList.add("active");
        externalBtn.classList.remove("active");

        scanArea.style.display = "none";
        deviceList.style.display = "none";

        statusPill.textContent = "LOCAL";
        statusPill.className = "connected";
    };
}

if (externalBtn && phoneBtn) {
    externalBtn.onclick = function () {
        externalBtn.classList.add("active");
        phoneBtn.classList.remove("active");

        scanArea.style.display = "block";
        deviceList.style.display = "none";

        statusPill.textContent = "OFFLINE";
        statusPill.className = "disconnected";
    };
}

if (scanBtn) {
    scanBtn.onclick = function () {
        deviceList.style.display = "block";
    };
}

document.querySelectorAll(".connectBtn").forEach(function(btn){

    btn.onclick = function(){

        statusPill.textContent = "CONNECTED";
        statusPill.className = "connected";

        scanArea.style.display = "none";
        deviceList.style.display = "none";

       alert("Device Connected Successfully!");
    };

});
function login(){

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username=="Pranav" && password=="1234"){

        window.location.href = "profile.html";

    }else{

        alert("Invalid Username or Password");

    }

}

function showSleepInfo(){

    document.getElementById("appScreen").style.display="none";

    document.getElementById("sleepInfoScreen").style.display="flex";

}

function openDashboard(){

    document.getElementById("sleepInfoScreen").style.display="none";

    document.querySelector(".dashboard-container").style.display="block";

}
function saveProfile() {

    alert("Profile Saved Successfully!");

    window.location.href = "user-selection.html";

}
window.onload = function(){

    if(sessionStorage.getItem("openDashboard")=="true"){

        sessionStorage.removeItem("openDashboard");

        document.getElementById("loginScreen").style.display="none";
        document.getElementById("appScreen").style.display="none";
        document.getElementById("sleepInfoScreen").style.display="none";

        document.querySelector(".dashboard-container").style.display="block";
    }
}

function selectUser(type){

    localStorage.setItem("userType", type);

    if(type==="adult"){
        window.location.href="health-default.html";
    }else{
        window.location.href="health-default.html";
    }
}
 alert("THIS IS THE NEW SCRIPT");


