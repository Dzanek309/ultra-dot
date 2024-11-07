const gameArea = document.querySelector(".gameArea");
let pageX = 0;
let pageY = 0;
let points = 0;
let speed = 1;

gameSoundtrack();

function updateDisplay(event) {
    pageX = event.pageX - 20;
    pageY = event.pageY - 20;
}

//END GAME FUNCTION (touch the ghost or out of bounds)
function forwardPoints() {
    x = document.querySelector('.score-display').innerHTML;
    let link = "score.html?value=" + x;
    window.open(link, "_self");
}

//MOUSE POSITION
gameArea.addEventListener("mousemove", updateDisplay, false);
gameArea.addEventListener("mouseenter", updateDisplay, false);

function ghost(x, y) {
    const ghost = document.getElementById("ghost");
    let positionX = parseInt(ghost.style.left);
    let positionY = parseInt(ghost.style.top);

    if (isNaN(positionX) == true) {
        positionX = 0;
    }
    if (isNaN(positionY) == true) {
        positionY = 0;
    }

    if (positionX < x) {
        ghost.style.left = positionX + speed + 'px';
        ghost.style.backgroundImage = "var(--ghost_right)";
    } else if (positionX > x) {
        ghost.style.left = positionX - speed + 'px';
        ghost.style.backgroundImage = "var(--ghost_left)";
    }
    if (positionY < y) {
        ghost.style.top = positionY + speed + 'px';
    } else if (positionY > y) {
        ghost.style.top = positionY - speed + 'px';
    }
}

// ghost POSITION UPDATEER
window.setInterval(function () {
    ghost(Number(pageX), Number(pageY));
}, 1);

creatPoint();
function creatPoint() {
    // POINT
    setTimeout(() => {
        document.querySelector('.score-display').style.fontSize = '500px';
        document.querySelector('.gameArea').style.boxShadow = 'none';
    }, "300")
    const point = document.createElement("div");
    point.classList.add("point");
    point.style.top = Math.floor(Math.random() * 95) + '%';
    point.style.left = Math.floor(Math.random() * 95) + '%';
    point.onmouseover = function () {
        this.remove();
        pointGainSound();
        points++;
        document.querySelector('.score-display').style.fontSize = '550px';
        document.querySelector('.gameArea').style.boxShadow = "inset 0px 0px 150px 1px color-mix(in srgb, var(--color_theme) 50%, transparent)";
        document.querySelector(".score-display").innerHTML = points;
        creatPoint();
        speed = speed + 0.135;
    };
    document.body.appendChild(point);

    //POWER UP: SLOWNESS
    if (30 > Math.floor(Math.random() * 100) && speed > 2) {
        const slowness = document.createElement("div");
        slowness.classList.add("power-up", "power-up--slowness");
        slowness.style.top = Math.floor(Math.random() * 98) + '%';
        slowness.style.left = Math.floor(Math.random() * 98) + '%';
        slowness.onmouseover = function () {
            this.remove();
            powerUpSlowness();
            speed = speed - 0.5
        };
        document.body.appendChild(slowness);
    }

}

// SOUNDS
function pointGainSound() {
    var audio = new Audio("sound/point_gain.mp3");
    audio.play();
}
function powerUpSlowness() {
    var audio = new Audio("sound/slowness.mp3");
    audio.play();
}
function gameSoundtrack() {
    var audio = new Audio("sound/soundtrack.mp3");
    audio.play();
    audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
}