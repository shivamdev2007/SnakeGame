var board = document.querySelector(".board");
var startButton = document.querySelector(".btn-start");
var modal = document.querySelector(".modal");
var startGameModal = document.querySelector(".start-game");
var gameOverModal = document.querySelector(".game-over");
var restartButton = document.querySelector(".btn-restart");
var blockHeight = 50;
var blockWidth = 50;

var scoreElement = document.querySelector("#score");

let score = 0;

const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWidth);
let intervalId = null;
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

const blocks = {};
let snake = [
  {
    x: 1,
    y: 3,
  },
  {
    x: 1,
    y: 4,
  },
  {
    x: 1,
    y: 5,
  },
];
let direction = "right";

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${row},${col}`;

    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}
// intervalId = setInterval(() => {
//   render();
// }, 300);
startButton.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    let head = null;
    blocks[`${food.x}-${food.y}`].classList.add("food");

    if (direction === "left") {
      head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === "right") {
      head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === "down") {
      head = { x: snake[0].x + 1, y: snake[0].y };
    } else if (direction === "up") {
      head = { x: snake[0].x - 1, y: snake[0].y };
    }
    //wall collision
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
      clearInterval(intervalId);

      modal.style.display = "flex";
      startGameModal.style.display = "none";
      gameOverModal.style.display = "flex";
      score = 0;
      scoreElement.innerText = score;

      return;
    }
    //food consume logic
    if (head.x == food.x && head.y == food.y) {
      blocks[`${food.x}-${food.y}`].classList.remove("food");
      food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols),
      };
      blocks[`${food.x}-${food.y}`].classList.add("food");
      snake.unshift(head);

      score += 10;
      scoreElement.innerText = score;
    }

    snake.forEach((segment) => {
      blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    snake.unshift(head);
    snake.pop();
    render();
  }, 300);
});
restartButton.addEventListener("click", restartGame);

function restartGame() {
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  modal.style.display = "none";
  snake = [
    {
      x: 1,
      y: 3,
    },
    {
      x: 1,
      y: 4,
    },
    {
      x: 1,
      y: 5,
    },
  ];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  intervalId = setInterval(() => {
    let head = null;
    blocks[`${food.x}-${food.y}`].classList.add("food");

    if (direction === "left") {
      head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === "right") {
      head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === "down") {
      head = { x: snake[0].x + 1, y: snake[0].y };
    } else if (direction === "up") {
      head = { x: snake[0].x - 1, y: snake[0].y };
    }

    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
      clearInterval(intervalId);

      modal.style.display = "flex";
      startGameModal.style.display = "none";
      gameOverModal.style.display = "flex";

      return;
    }

    if (head.x == food.x && head.y == food.y) {
      blocks[`${food.x}-${food.y}`].classList.remove("food");
      food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols),
      };
      blocks[`${food.x}-${food.y}`].classList.add("food");
      snake.unshift(head);
      score += 10;
      scoreElement.innerText = score;
    }

    snake.forEach((segment) => {
      blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    snake.unshift(head);
    snake.pop();
    render();
  }, 300);
  direction = "right";
}

addEventListener("keydown", (event) => {
  if (event.key == "ArrowDown") {
    direction = "down";
  } else if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  } else if (event.key == "ArrowLeft") {
    direction = "left";
  }
});
