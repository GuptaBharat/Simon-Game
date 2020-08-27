var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "green", "blue", "yellow"];

var level = 0;
var gameActive = false;

$(document).keydown(function(){
  if (gameActive == false){
    gameActive = true;
    $("#startButton").css("visibility","hidden");
    $("#instruction").css("visibility","hidden");
    nextSequence();
  }
});


function nextSequence(){
  // clearing userClickedPattern because user have to follow the sequence all over again
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  animateButton(randomChosenColor);

}


$(".btn").click(function(){

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  // animateButton(userChosenColor);
  animatePress(userChosenColor);
  // Check if the user follow the gamePattern by pressing right button
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  // Checking the current button pressed with gamePattern until the length of
  // both arrays became same
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if (gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else {
      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      $("body").addClass("gameOver");
      setTimeout(function(){
        $("body").removeClass("gameOver");
      }, 200);

// After gameOver setting game Status to False and clearing the gamePattern
      $("#startButton").css("visibility","visible");
      $("#instruction").css("visibility","visible");
      gameActive = false;
      gamePattern = [];
      level = 0;
  }
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateButton(name){
  $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor){
  $("." + currentColor).addClass('pressed');
  setTimeout(function(){
    $("." + currentColor).removeClass('pressed');
  }, 100);
}


$("#startButton").click(function(){
  if (gameActive == false){
    gameActive = true;
    $("#startButton").css("visibility","hidden");
    $("#instruction").css("visibility","hidden");
    nextSequence();
  }
});


$("#instruction").click(function(){
    $("#myModal").css("display", "block");
});

$(".close").click(function(){
  $("#myModal").css("display", "none");
})
