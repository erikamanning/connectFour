/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
 /*************************************************************************** 

                        GLOBAL Const Variables

***************************************************************************/
const topTextLength = 7;
const bottomTextLength = 4;
const WIDTH = 7;
const HEIGHT = 6;
const red ="Red";
const blue = "Blue";
const board = []; // array of rows, each row is array of cells  (board[y][x])
const headerDiv = document.querySelector("#headingDiv");
const buttonPanel = document.querySelector("#buttonPanel");
const CONNECT=makeTitleH1("Connect","letter","connect");
const FOUR=makeTitleH1("Four","letter","four");
/*************************************************************************** 

                        Global Let Variables

***************************************************************************/
let winner;
let currPlayer = 1; // active player: 1 or 2
let startColor ="Red";
let winColor = "Blue";
let gameWon  = false;
let startingPlayer = red;
let winningColor;
let splashIntervalStopper,connectAnimationStopper, fourAnimationStopper,alternatingLetterColorFillStopper;

/*************************************************************************** 

                                GAME

***************************************************************************/
headerDiv.prepend(FOUR);
headerDiv.prepend(CONNECT);
loadStaticLetterColors(document.querySelectorAll(".letter"),"multi");
makeBoard();
makeHtmlBoard();
addRestartButton();
addTieButton();
const gameCells = document.querySelectorAll(".gameCell");