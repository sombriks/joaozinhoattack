import Phaser from "phaser";

import HUUOOP from "url:../assets/sfx/huuoop.m4a";
import PEIDO from "url:../assets/sfx/peido.m4a";
import UAAAHN from "url:../assets/sfx/uaaah.m4a"

import MONSTRO_1 from "url:../assets/sprites/monstro-1.png"
import MONSTRO_2 from "url:../assets/sprites/monstro-2.png"
import MONSTRO_3 from "url:../assets/sprites/monstro-3.png"

const sfx = [PEIDO,HUUOOP, UAAAHN];
const sprites = [MONSTRO_1, MONSTRO_2, MONSTRO_3];

export class Monster extends Phaser.GameObjects.Sprite {

  accPower = 900;
  maxSpeed = 700;
  dragPct = 0.1;
  bouncePct = 3;

  /** @param {Phaser.Scene} stage*/
  static preload(stage) {
    stage.load.audio(HUUOOP, HUUOOP);
    stage.load.audio(PEIDO, PEIDO);
    stage.load.audio(UAAAHN, UAAAHN);
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
    super(scene, x, y, sprites[m]);
    this.setOrigin(0.5, 0.5);
    scene.add.existing(this);
    this.m = m;
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
   * @param {number} vector.x
   * @param {number} vector.y
   **/
  move({x, y}) {
    this.body.setAccelerationX(x * this.accPower);
    this.body.setAccelerationY(y * this.accPower);
  }

  /** @param {Monster} monster*/
  hit(monster) {
    this.scene.sound.play(sfx[this.m]);
    // cause damage
  }
}
