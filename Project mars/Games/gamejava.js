
  // Get the canvas and its context
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Game variables
  let basketX = canvas.width / 2 - 50;
  let basketWidth = 100;
  let basketHeight = 20;
  let basketSpeed = 7;
  let ballRadius = 10;
  let ballX = Math.random() * (canvas.width - ballRadius * 2);
  let ballY = -ballRadius;
  let ballSpeed = 3;
  let score = 0;

  // Handle basket movement
  let rightPressed = false;
  let leftPressed = false;

  // Event listeners for keyboard input
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);

  function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = false;
    }
  }

  // Draw the basket
  function drawBasket() {
    ctx.beginPath();
    ctx.rect(basketX, canvas.height - basketHeight, basketWidth, basketHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }

  // Draw the ball
  function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();
  }

  // Update the score on screen
  function updateScore() {
    document.getElementById('score').textContent = 'Score: ' + score;
  }

  // Collision detection between the ball and basket
  function collisionDetection() {
    if (ballY + ballRadius > canvas.height - basketHeight &&
        ballX > basketX && ballX < basketX + basketWidth) {
      ballY = -ballRadius; // Reset ball position
      ballX = Math.random() * (canvas.width - ballRadius * 2); // Random horizontal position
      score++; // Increase score
      updateScore();
    }
  }

  // Update the game state
  function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball and basket
    drawBall();
    drawBasket();
    
    // Update ball position
    ballY += ballSpeed;

    // Check if the ball falls off the screen
    if (ballY > canvas.height) {
      ballY = -ballRadius; // Reset ball position
      ballX = Math.random() * (canvas.width - ballRadius * 2); // Random horizontal position
    }

    // Move the basket
    if (rightPressed && basketX < canvas.width - basketWidth) {
      basketX += basketSpeed;
    } else if (leftPressed && basketX > 0) {
      basketX -= basketSpeed;
    }

    // Check for collision
    collisionDetection();

    // Call the draw function again for the next frame
    requestAnimationFrame(draw);
  }

  // Start the game loop
  draw();
