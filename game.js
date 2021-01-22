let buttonColors = ["red", "yellow", "green", "blue"];
let previousColors = [];

var randomChosenColor = nextSequence(buttonColors);

function nextSequence(button){
    var randomNumber = Math.floor((Math.random() * 4));
    previousColors.push(button[randomNumber])
    return previousColors[0];
}

var showColors = $("#" +randomChosenColor);

$(document). ready(() => {
    setInterval(() => {
    showColors. fadeIn();
    showColors. fadeOut();
    var audio = new Audio("/sounds/" + randomChosenColor + ".mp3")
    audio.play();
    }, 500);
    });
    