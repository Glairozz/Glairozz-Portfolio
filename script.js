let progress = 0;
const loadingScreen = document.getElementById("loading-screen");
const content = document.getElementById("content");
const barFill = document.getElementById("bar-fill");

const duration = 3000;
const interval = 50;
const step = (interval / duration) * 100;

const loadInterval = setInterval(() => {
    progress += step;
    if (progress > 100) progress = 100;
    barFill.style.width = progress + "%";

    if (progress >= 100) {
        clearInterval(loadInterval);
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            content.style.display = "block";
        }, 600);
    }
}, interval);