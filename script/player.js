export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.image = document.getElementById('player');
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.vy = 0;
    this.weight = 1;
  }
  update(input) {
    //horizontal movement
    this.x += this.speed;
    if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    //vertical movement
    if (input.includes('ArrowUp') && this.onGround()) this.vy = -28;
    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.weight;
    } else this.vy = 0;
    if (this.y > this.gameHeight - this.height)
      this.y = this.gameHeight - this.height;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height;
  }
}
