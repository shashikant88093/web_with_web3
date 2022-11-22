function randomNumber(){
    let playerOne = Math.floor(Math.random() * 6) + 1;
    let playerTwo = Math.floor(Math.random() * 6) + 1;
    return [playerOne, playerTwo];
}
randomNumber();

let playerOne = randomNumber()[0];
let playerTwo = randomNumber()[1];



if (playerOne > playerTwo) {
   document.querySelector("h1").innerHTML = "Player 1 Wins!";
   
}
else if (playerTwo > playerOne) {
  document.querySelector("h1").innerHTML = "Player 2 Wins!";

}
else {
    document.querySelector("h1").innerHTML = "Draw!";
}

let playerOneImg = document.querySelectorAll("img")[0];
let playerTwoImg = document.querySelectorAll("img")[1];
playerOneImg.setAttribute("src", "images/dice" + playerOne + ".png");
playerTwoImg.setAttribute("src", "images/dice" + playerTwo + ".png");
