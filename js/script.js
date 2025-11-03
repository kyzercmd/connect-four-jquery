var player1 = prompt("Player One: Enter your name, Blue");
var player1Color = "rgb(86, 151, 255)";

var player2 = prompt("Player Two: Enter your name, Red");
var player2Color = "rgb(237, 45, 73)";

var gameOn = true;
var table = $("table tr");

function changeColor(row, col, color) {
  return table
    .eq(row)
    .find("td")
    .eq(col)
    .find("button")
    .css("background-color", color);
}

function returnColor(row, col) {
  return table
    .eq(row)
    .find("td")
    .eq(col)
    .find("button")
    .css("background-color");
}

function checkBottom(col) {
  var colorReport = returnColor(5, col);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row, col);
    if (colorReport === "rgb(128, 128, 128)") return row;
  }
}

function colorMatchCheck(one, two, three, four) {
  return (
    one === two &&
    one === three &&
    one === four &&
    one !== "rgb(128, 128, 128)" &&
    one !== undefined
  );
}

function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row, col + 1),
          returnColor(row, col + 2),
          returnColor(row, col + 3)
        )
      ) {
        return true;
      } else continue;
    }
  }
}

function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row + 1, col),
          returnColor(row + 2, col),
          returnColor(row + 3, col)
        )
      ) {
        return true;
      } else continue;
    }
  }
}

function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row + 1, col + 1),
          returnColor(row + 2, col + 2),
          returnColor(row + 3, col + 3)
        )
      ) {
        return true;
      } else if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row - 1, col + 1),
          returnColor(row - 2, col + 2),
          returnColor(row - 3, col + 3)
        )
      ) {
        return true;
      } else continue;
    }
  }
}

function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $("h3").fadeOut("medium");
      $("h2").fadeOut("medium");
      $("h1")
        .removeClass("bg-dark-subtle")
        .addClass(
          "text-center p-3 text-dark-emphasis bg-success-subtle rounded-3"
        )
        .text(winningPlayer + " has won! Refresh the page to play again")
        .css("fontSize", "50px");
    }
  }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$("h3").text(player1 + " it is your turn, pick a column to drop in!");

$("table button").on("click", function () {
  var col = $(this).closest("td").index();
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail, col, currentColor);

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    gameEnd(currentName);
  }

  currentPlayer = currentPlayer * -1;

  if (currentPlayer === 1) {
    currentName = player1;
    $("h3").text(currentName + " It is your turn.");
    currentColor = player1Color;
  } else {
    currentName = player2;
    $("h3").text(currentName + " It is your turn.");
    currentColor = player2Color;
  }
});
