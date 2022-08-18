export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = 'Helvetica';
    this.livesImage = document.getElementById('lives');
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'white';
    context.shadowBlur = 0;
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor;
    //score
    context.fillText('Pontuação: ' + this.game.score, 20, 50);
    //timer
    context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
    context.fillText('Tempo: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
    //lives
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 30 * i + 22, 95, 25, 25);
    }
    //game over messages
    if (this.game.gameOver) {
      context.textAlign = 'center';
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily;

      if (this.game.score > 80) {
        context.fillText(
          'O pai é bom demais',
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText(
          'Os monstros até se peidam quando tu chega junto',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      } else {
        context.fillText(
          'Vacilou depois da primeira mordida?',
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText(
          'Boa sorte na próxima tentativa!',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      }
    }
    context.restore();
  }
}
