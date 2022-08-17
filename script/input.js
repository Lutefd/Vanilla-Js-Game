export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener('keydown', (e) => {
      if (
        (e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 's' ||
          e.key === 'w' ||
          e.key === 'a' ||
          e.key === 'd' ||
          e.key === 'Enter') &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener('keyup', (e) => {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 's' ||
        e.key === 'w' ||
        e.key === 'a' ||
        e.key === 'd' ||
        e.key === 'Enter'
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
