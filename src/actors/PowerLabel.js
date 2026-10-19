export class PowerLabel {
  /** @type {Monster} */
  monster;
  /** @type {Phaser.GameObjects.Text} */
  text;

  /** @param {Monster} monster */
  constructor(monster) {
    this.monster = monster;
    this.text = monster?.scene.add.text(0, 0, '', {
      fontFamily: 'Mono Bold',
      strokeThickness: 3,
      fontSize: '20px',
      stroke: '#fff',
      fill: '#000',
    });
    monster?.scene.events.on('update', this.update, this);
    monster?.scene.events.on('destroy', this.destroy, this);
  }

  update() {
    if (!this.text) return;
    this.text.x = this.monster?.x - this.monster?.width / 3;
    this.text.y = this.monster?.y + this.monster?.height / 3;
    this.text?.setText(`⚔️ ${this.monster?.weapon + this.monster?.attack} ❤️ ${this.monster?.life}`);
  }

  destroy() {
    this.monster?.scene.events.off('update', this.update, this);
    this.monster?.scene.events.off('destroy', this.destroy, this);
    this.text?.destroy();
    delete this.monster;
    delete this.text;
  }
}
