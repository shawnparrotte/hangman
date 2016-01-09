var solveQ = {
  playing: true,
  hangmanSteps: 0,
  correct: 0,
  currentSolve : {
    clue: "",
    answer: [],
    number: 0
  },
  potentialSolve : [
    {
      clue: "Item used to help debug a program",
      answer: ["R", "U", "B", "B", "E", "R", "", "D", "U", "C", "K"],
      number: 10
    },
    {
      clue: "To combine two or more strings",
      answer: ["C", "O", "N", "C" ,"A", "T", "E", "N", "A", "T", "E"],
      number: 11
    },
    {
      clue: "Continuous improvement",
      answer: ["K", "A", "I", "Z", "E", "N"],
      number: 6
    },
    {
      clue: "Increasing product requirements",
      answer: ["F", "E", "A", "T" ,"U", "R", "E", "", "C", "R", "E", "E", "P"],
      number: 12
    },
    {
      clue: "Software developed though public collaboration",
      answer: ["O", "P", "E", "N" ,"", "S", "O", "U", "R", "C", "E"],
      number: 10
    },
  ],
  setCurrent : function(){

    this.hangmanSteps = 0;
    this.correct = 0;
    this.playing = true;


    var num = Math.floor(Math.random() * this.potentialSolve.length);
    this.currentSolve.clue = this.potentialSolve[num].clue;
    this.currentSolve.answer = this.potentialSolve[num].answer;
    this.currentSolve.number = this.potentialSolve[num].number;

    $("#clue").text(this.currentSolve.clue);
    $("#answer").children().remove();

    for ( i = 0; i < this.currentSolve.answer.length; i++ ){
      if(this.currentSolve.answer[i] !== ""){
        $("#answer").append("<div class='answer-letter'>&nbsp;&nbsp;</div>");
      } else {
        $("#answer").append("<div class='answer-blank'>&nbsp;&nbsp;</div>");
      }
    }
  },
  checkClick : function(letter){

    var isLetter = false, position = "", child = 0, letters = 0;

    for ( j = 0; j < this.currentSolve.answer.length; j++ ){

      child = j + 1;
      position = ".answer-letter:nth-child(" + child + ")";

      if (this.currentSolve.answer[j] === letter){
        $(position).text(letter);
        isLetter = true;
        this.correct++
        if(this.correct === this.currentSolve.number){
          alert("You Are A Winner! Go You!");
          this.playing = false;
        }
      }
    }

    if(!isLetter){
      this.hangmanSteps += 1;
      this.animateHang(this.hangmanSteps);
    }
  },
  animateHang : function(number){

    if(this.hangmanSteps === 1){
      $("#base").css("border-bottom", "4px solid black");
    } else if(this.hangmanSteps === 2){
      $("#left-split").css("border-right", "4px solid black");
    } else if(this.hangmanSteps === 3){
      $("#top-box").css("border-top", "4px solid black");
    } else if(this.hangmanSteps === 4){
      $("#top-box").css("border-left", "4px solid black");
    } else if(this.hangmanSteps === 5){
      $("#head").css("border", "4px solid black");
    } else if(this.hangmanSteps === 6){
      $("#body-tr").css("border-left", "3px solid black");
      $("#body-tl").css("border-right", "3px solid black");
    } else if(this.hangmanSteps === 7){
      $("#body-tr").css("border-bottom", "3px solid black");
      $("#body-tl").css("border-bottom", "3px solid black");
      $("#body-br").css("border-top", "3px solid black");
      $("#body-bl").css("border-top", "2px solid black");
    } else if(this.hangmanSteps === 8){
      $("#body-br").css("border-left", "3px solid black");
      $("#body-bl").css("border-right","2px solid black");
    } else if(this.hangmanSteps === 9){
      $("#legs").css("border-left", "4px solid black");
    } else if(this.hangmanSteps === 10){
      $("#legs").css("border-top","4px solid black");
      alert("You lost, poor guy...");
      this.playing = false;
    }
  }
}



$(".letter").click(function(){
  if(solveQ.playing){
    $(this).css({
      "background-color": "black",
      "border": "1px solid black",
      "box-shadow": "0 2px 0 #000",
    })
    solveQ.checkClick($(this).text());
  }
});

$("#new-game").click(function(){

  $("#base").css("border-bottom", "4px solid white");
  $("#left-split").css("border-right", "4px solid white");
  $("#top-box").css("border-top", "4px solid white");
  $("#top-box").css("border-left", "4px solid white");
  $("#head").css("border", "4px solid white");
  $("#body-tr").css("border-left", "3px solid white");
  $("#body-tl").css("border-right", "3px solid white");
  $("#body-tr").css("border-bottom", "3px solid white");
  $("#body-tl").css("border-bottom", "3px solid white");
  $("#body-br").css("border-top", "3px solid white");
  $("#body-bl").css("border-top", "2px solid white");
  $("#body-br").css("border-left", "3px solid white");
  $("#body-bl").css("border-right","2px solid white");
  $("#legs").css("border-left", "4px solid white");
  $("#legs").css("border-top","4px solid white");

  $(".letter").each(function(){
    $(this).css({
      "background-color": "white",
      "border": "1px solid grey",
      "box-shadow": "0 2px 0 #444",});
  })

  solveQ.setCurrent();
})

$(document).ready(function(){
  solveQ.setCurrent();
})
