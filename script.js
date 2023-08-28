var buttonSequence = ["yellow", "red", "green", "blue"];
var sequenceRecord = [];

var userCosen = [];
var start = false;

var level = 0;


$(".btn").click(function(){
    var userColor = $(this).attr("id");
    userCosen.push(userColor);
    playSound(userColor);
    animate(userColor);
    checkAnswer(userCosen.length-1);
})


$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level" + level);
        nextSequence();
        start = true;
    }
});



    
function nextSequence(){
    userCosen = [];
    level++; 
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var cosenSequence = buttonSequence[randomNumber];
    sequenceRecord.push(cosenSequence);
    $("#" + cosenSequence).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(cosenSequence);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animate(colorName){
    $("#" + colorName).addClass("pressed");
    setTimeout(function(){
        $("#" + colorName).removeClass("pressed");
    }, 100);
  }

  function checkAnswer(currentLevel){
    if(userCosen[currentLevel] === sequenceRecord[currentLevel]){
        console.log("success");
        if(sequenceRecord.length === userCosen.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        console.log("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
  }

  function startOver(){
    level = 0;
    sequenceRecord = [];
    start = false;    
  }

