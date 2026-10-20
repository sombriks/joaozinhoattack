export class PowerLabel extends Phaser.GameObjects.Text {
  /** @type {Monster} */
  monster;

  /** @param {Monster} monster */
  constructor(monster) {
    super(monster.scene, 0, 0, '', {
      fontFamily: 'Mono Bold',
      strokeThickness: 3,
      fontSize: '20px',
      stroke: '#fff',
      fill: '#000',
    });

    this.monster = monster;
    this.scene.add.existing(this);
    this.scene.sys.updateList.add(this);
  }

  preUpdate() {
    if (!this.monster) return;
    this.x = this.monster?.x - this.monster?.width / 3;
    this.y = this.monster?.y + this.monster?.height / 3;
    this.text = `⚔️ ${this.monster?.weapon + this.monster?.attack} ❤️ ${this.monster?.life}`;
  }

  destroy(args) {
    delete this.monster;
    super.destroy();
  }
}
