import Phaser from "phaser";

import MONSTRO_1 from "url:../assets/monstro-1.png"
import MONSTRO_2 from "url:../assets/monstro-2.png"
import MONSTRO_3 from "url:../assets/monstro-3.png"

const monsters = [MONSTRO_1, MONSTRO_2, MONSTRO_3];

export class Monster extends Phaser.GameObjects.Sprite {

  accPower = 500;
  maxSpeed = 200;
  dragPct = 0.2;
  bouncePct = 1.5;

  /** @param {Phaser.Scene} stage*/
  static preload(stage) {
    stage.load.image(MONSTRO_1, MONSTRO_1);
    stage.load.image(MONSTRO_2, MONSTRO_2);
    stage.load.image(MONSTRO_3, MONSTRO_3);
  }

  /**
   * @param {Object}  config
   * @param {scene:Phaser.Scene} config.scene
   * @param {number}  config.x
   * @param {number}  config.y
   * @param {number} config.m
   * */
  constructor({scene, x = 0, y = 0, m = 0}) {
    super(scene, x, y, monsters[m]);
    this.setOrigin(0.5, 0.5);
    scene.add.existing(this);
  }

  resetBody() {
    this.scene.physics.add.existing(this)
      .setInteractive({useHandCursor: true});
    this.body
      .setCircle(this.width / 3, this.width / 6, this.height / 6) // figure out whi it works
      .setMaxVelocity(this.maxSpeed)
      .setBounce(this.bouncePct)
      .setDrag(this.dragPct)
      .setDamping(true);
  }

  /**
   * @param {Object} vector
   * @param {boolean} vector.isActive
   * @param {number} vector.distance
   * @param {number} vector.angle
   * @param {number} vector.x
   * @param {number} vector.y
   **/
  move({x, y, angle, distance, isActive}) {
    this.body.setAccelerationX(x * this.accPower);
    this.body.setAccelerationY(y * this.accPower);
  }
}
