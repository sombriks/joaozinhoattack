import Phaser from "phaser";

import MONSTRO_1 from "url:../assets/monstro-1.png"

export class Monster extends Phaser.GameObjects.Sprite {
  /** @param {Phaser.Scene} stage*/
  static preload(stage) {
    stage.load.image(MONSTRO_1, MONSTRO_1);
  }

  /** @param {{scene:Phaser.Scene,x:number,y:number}} config*/
  constructor({scene, x = 0, y = 0}) {
    super(scene, x, y, MONSTRO_1);
    scene.add.existing(this);
    this.setInteractive({useHandCursor: true});
  }
}
