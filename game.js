
var buttonColors = ["red", "blue", "green", "yellow"];  

var gamePattern = [];   
var userClickedPattern = [];

var started = false;
var level = 0;
var replayCount = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    $("#level-instructions").hide();
    $("#replays-count").text("Replays Used: " + replayCount)
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {  
        
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function prevSequence(prevColors){
    var index = 0;
    if ( prevColors.length > 0){
        prevColors.forEach(element => {
            
        
        setTimeout(function(){
            playSound(element)
            animatePress(element)
            
        }, 1000*(index +1));
    index++;
    });
    }
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("/sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  replayCount = 0;
}

$(document).keydown(function(e){
    if (e.keyCode == 32){
        prevSequence(gamePattern);
        replayCount++
        $("#replays-count").text("Replays Used: " + replayCount)
        $("#white").addClass("pressed") 
        setTimeout(function(){
            $("#white").removeClass("pressed") 
        }, 200)
        if (replayCount > 3){
          playSound("wrong");
          $("body").addClass("game-over");
          $("#level-title").text("Game Over, Press Any Key to Restart");
      
          setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
      
          startOver();
        }
    
    }
})






