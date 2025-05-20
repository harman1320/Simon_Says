let gameSeq = [];
let userSeq = [];
let colors = ["blue", "green", "red", "pink"];

let level = 0;
let started = false;
let p = document.querySelector("p");
let currScore;
let highScore = 0;

document.addEventListener("keypress", () => {
    if (started == false) {
        levelUp();
        started = true;
    }
});

function blink() {
    userSeq = [];

    let rand = Math.floor(Math.random() * 4);
    gameSeq.push(colors[rand]);

    let btn = document.querySelector(`.${colors[rand]}`);

    btn.classList.add("white");
    setTimeout(() => {
        btn.classList.remove("white");
    }, 150);
}

function userBlink(btn) {
    let color = btn.getAttribute('class');
    userSeq.push(color);

    btn.classList.add("light-green");
    setTimeout(() => {
        btn.classList.remove("light-green");
    }, 150);
}

function levelUp() {
    level++;
    p.innerText = `Level = ${level}`;
    blink();
}

let btns = document.querySelectorAll(".main div");

for (bt of btns) {
    bt.addEventListener("click", btnPress);
}

function btnPress() {
    let btn = this;
    userBlink(this);
    check(userSeq.length - 1);
}

function check(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 300);
        }
    } else {
        currScore = level-1;
        highScore = (currScore > highScore)? currScore:highScore;
        
        document.querySelector("body").classList.add("danger");
        setTimeout(() => {
            document.querySelector("body").classList.remove("danger");
        }, 200);
        
        p.innerHTML = `You Lose <br>Your score = ${level-1}`;
        document.querySelector(".highScore").innerText = `Highest Score = ${(highScore)}`;

        reset();
    }
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}