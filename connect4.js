/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
// const letters = document.querySelectorAll(".letter");
const red ="red";
const blue = "blue";
let gameCounter = 0;
let splashInterval,connectAnimationStopper, fourAnimationStopper, tieSplashStopper;
const topTextLength = 7;
const bottomTextLength = 4;
let winner;
let startColor =red;
let winColor = blue;

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

// game
// addTitle("Connect Four","letter","connectFourText");
// const titletext = document.querySelector("#connectFourText");

const headerDiv = document.querySelector("#headingDiv");
let CONNECT=makeTitleH1("Connect","letter","connectText");
let FOUR=makeTitleH1("Four","letter","fourText");
headerDiv.prepend(FOUR);
headerDiv.prepend(CONNECT);

// const titletext = document.querySelectorAll("#connectFourText");
// console.log(titletext);
connectAnimation(CONNECT.children,startColor,winColor);
makeBoard();
makeHtmlBoard();
//addRestartButton();