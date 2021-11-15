let emojiContainer = document.getElementById('emojiContainer');
let players = document.getElementById('players');
let music_player1 = new Audio("audio/hit.wav");
let music_player2 = new Audio("audio/wing.wav");
let gamewon = new Audio("audio/applause.mp3");

let sound = document.getElementById("sound");
let volOn = true;
sound.addEventListener("click", () => {
    if (sound.getAttribute("src") == "mute.png") {
        sound.setAttribute("src", "unmute.png");
        volOn = true;
    } else {
        sound.setAttribute("src", "mute.png");
        volOn = false;
    }
});

players.addEventListener('click', () => {
    if (emojiContainer.style.display == "block") {
        emojiContainer.style.display = "none";
    } else {
        emojiContainer.style.display = "block";
    }
});

let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let currPlayer = document.getElementById("currentPlayer");
let turnText = document.getElementById("turnText");


let emojis = document.getElementsByClassName("em");
// console.log(emojis);

let playerArr = [player1, player2];

Array.from(emojis).forEach((e) => {
    e.addEventListener("click", () => {
        reset();
        console.log(`clicked on emoji`);
        playerArr.push(e);
        player1 = playerArr[playerArr.length - 1];
        player2 = playerArr[playerArr.length - 2];
        document.getElementById('player1').setAttribute(('src'), player1.getAttribute('src'));
        document.getElementById('player2').setAttribute(('src'), player2.getAttribute('src'));
        // console.log(player1, player2);
    });
});

let gameover = false;

function checkWin() {
    let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let boxes = document.getElementsByClassName('box');
    // console.log(boxes[ele[0]].innerText);
    wins.forEach(ele => {
        if (boxes[ele[0]].firstChild.getAttribute("src") == boxes[ele[1]].firstChild.getAttribute("src") && boxes[ele[1]].firstChild.getAttribute("src") == boxes[ele[2]].firstChild.getAttribute("src") && boxes[ele[0]].firstChild.getAttribute("src") != "") {
            gameover = true;
            if (volOn) {
                gamewon.play();
            }
        }
    });
}

let turn = 1;
let boxes = document.getElementsByClassName('box');
let rst = document.getElementById("reset");
rst.addEventListener("click", reset);

Array.from(boxes).forEach((e) => {
    e.addEventListener('click', () => {
        // console.log(e.firstChild);
        if (e.firstChild.getAttribute("src") == "") {
            // console.log(e);
            if (turn == 1) {
                if (volOn) {
                    music_player2.play();
                }
                e.firstChild.setAttribute("src", player1.getAttribute("src"));
                turnText.innerHTML = "Player-2 has turn";
                currPlayer.setAttribute("src", player2.getAttribute("src"));
                turn = 2;
            }
            else {
                if (volOn) {
                    music_player1.play();
                }
                e.firstChild.setAttribute("src", player2.getAttribute("src"));
                turnText.innerHTML = "Player-1 has turn";
                currPlayer.setAttribute("src", player1.getAttribute("src"));
                turn = 1;

            }
            checkWin();
            if (gameover) {
                // console.log(`Game Over!`);
                if(screen.width>900){
                    document.getElementById('excited').style.width="130%";
                }else{
                    document.getElementById('excited').style.width="50%";
                }
                if (currPlayer.getAttribute('src') == player1.getAttribute("src")) {
                    currPlayer.setAttribute('src', player2.getAttribute("src"));
                } else { currPlayer.setAttribute('src', player1.getAttribute("src")); }
                turnText.innerHTML = " has won";
                rst.style.display = "block";
                document.getElementsByClassName('gameContainer')[0].setAttribute("style", "z-index:-1;")
            }
            
            // console.log(tie());
            else if (tie()) {
                gameover = true;
                rst.style.display = "block";
                turnText.innerHTML = "Game Drawn!";
                currPlayer.setAttribute('src', '');
                document.getElementById('excited').style.width="0";
            }
        }
    });
});

function tie() {
    let res = true;
    Array.from(boxes).forEach((e) => {
        console.log(e.firstChild.getAttribute("src"));
        if (e.firstChild.getAttribute("src") == "") {
            res = false;
        }
    });
    return res;
}

function reset() {
    turnText.innerHTML = "";
    turn = 1;
    gameover = false;
    currPlayer.setAttribute("src", "");
    rst.style.display = "none";
    document.getElementsByClassName('gameContainer')[0].setAttribute("style", "z-index:1;");
    
    Array.from(boxes).forEach(e => {
        e.firstChild.setAttribute("src", "");
    });
    document.getElementById('excited').style.width="0";
    // location.reload();
}

// console.log(gameover);
// console.log("object".substring(1,3));