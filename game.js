var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStatus = 0;
var i = 0;
var result = 0;

$(".btn").click(function(event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePressed(userChosenColor);
    // console.log("user click1: " + userClickedPattern);
    checkAnswer(userClickedPattern);
  }
);

$(document).keydown(function(event) {
    setTimeout(nextSequence,1000);
    gameStatus = 1;
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    new Audio("sounds/" + randomChosenColor + ".mp3").play();
    level++;
    $("#level-title").text("Level " + level);
    console.log("game pattern: " + gamePattern);
};

function playSound(name) {
    new Audio("sounds/" + name + ".mp3").play();
};

function animatePressed(currentColor) {
    var activeButton = document.querySelector("#" + currentColor);
    activeButton.classList.add("pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
};

function checkAnswer(currentLevel) {
    console.log("user length: " + currentLevel.length);
    console.log("game length: " + gamePattern.length);
    console.log("user click2: " + currentLevel);

    if (gamePattern.length > currentLevel.length) {
         if (gamePattern[i] == currentLevel[i]) {
            result = 1;
            i++;
        } else {
            result = 2;
            i = 0;
            animateFailure();
        }
    }
    else {
        if (gamePattern[i] == currentLevel[i]) {
            result = 1;
            i = 0;
            userClickedPattern = [];
        // level++;
            setTimeout(nextSequence,1000);
        } else {
            result = 2;
            i = 0;
            animateFailure();
        }
    }

    // } else {
    //     alert("Error while checking answer: the length of gamePattern is shorter than userClicked Pattern.");
    // }
    
};

function animateFailure() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 100);
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
}