import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './enemies.js';
import { UI } from './UI.js';
window.addEventListener('load', function () {
  const canvas = this.document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 1200;
  canvas.height = 500;
  const fullScreenButton = document.getElementById('fullScreenBtn');
  const restartBtn = document.getElementById('restartBtn');
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.speed = 0;
      this.maxSpeed = 4;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.maxParticles = 50;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.score = 0;
      this.fontColor = 'black';
      this.time = 0;
      this.maxTime = 60000;
      this.lives = 3;
      this.gameOver = false;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    update(deltaTime) {
      this.time += deltaTime;
      if (this.time > this.maxTime) this.gameOver = true;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      //handleEnemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      //handle particles
      this.particles.forEach((particle, index) => {
        particle.update();
      });
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );
      if (this.particles.length > this.maxParticles) {
        this.particles = this.particles.slice(0, this.maxParticles);
      }
      //handle collision sprites
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
      });
      this.collisions = this.collisions.filter(
        (collision) => !collision.markedForDeletion
      );
      //handle messages
      this.floatingMessages.forEach((message) => {
        message.update();
      });
      this.floatingMessages = this.floatingMessages.filter(
        (message) => !message.markedForDeletion
      );
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.particles.forEach((particle) => {
        particle.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context);
      });
      this.floatingMessages.forEach((message) => {
        message.draw(context);
      });
      this.UI.draw(context);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
  }
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
    if (game.gameOver) {
      restartBtn.style.display = 'block';
    }
  }
  function restartGame() {
    game.player.restart();
    game.background.restart();
    game.enemies = [];
    game.score = 0;
    game.gameOver = false;
    game.time = 0;
    game.player.currentState = game.player.states[0];
    game.lives = 3;
    restartBtn.style.display = 'none';
    animate(0);
  }
  restartBtn.addEventListener('click', () => {
    restartGame();
  });

  animate(0);
});
