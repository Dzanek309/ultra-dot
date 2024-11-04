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

//END GAME FUNCTION (touch the monster or out of bounds)
function forwardPoints() {
    x = document.querySelector('.score-display').innerHTML;
    let link = "score.html?value=" + x;
    window.open(link, "_self");
}

//MOUSE POSITION
gameArea.addEventListener("mousemove", updateDisplay, false);
gameArea.addEventListener("mouseenter", updateDisplay, false);

function monster(x, y) {
    const monster = document.getElementById("monster");
    let positionX = parseInt(monster.style.left);
    let positionY = parseInt(monster.style.top);

    if (isNaN(positionX) == true) {
        positionX = 0;
    }
    if (isNaN(positionY) == true) {
        positionY = 0;
    }

    if (positionX < x) {
        monster.style.left = positionX + speed + 'px';
        monster.style.backgroundImage = "url('img/monster_r.gif')";
    } else if (positionX > x) {
        monster.style.left = positionX - speed + 'px';
        monster.style.backgroundImage = "url('img/monster_l.gif')";
    }
    if (positionY < y) {
        monster.style.top = positionY + speed + 'px';
    } else if (positionY > y) {
        monster.style.top = positionY - speed + 'px';
    }
}

// MONSTER POSITION UPDATEER
window.setInterval(function () {
    monster(Number(pageX), Number(pageY));
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
        document.querySelector('.gameArea').style.boxShadow = "inset 0px 0px 150px 1px rgba(128,0,128,0.5)";
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