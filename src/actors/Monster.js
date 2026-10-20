import Phaser from "phaser";

import {PowerLabel} from "./PowerLabel";

import SOM_1 from "url:../assets/sfx/aaiiinnnn.m4a";
import SOM_2 from "url:../assets/sfx/ahrah.m4a";
import SOM_3 from "url:../assets/sfx/huuooo.m4a";
import SOM_4 from "url:../assets/sfx/huuoop.m4a";
import SOM_5 from "url:../assets/sfx/ooohhhh.m4a";
import SOM_6 from "url:../assets/sfx/miumiu.m4a";
import SOM_7 from "url:../assets/sfx/peido.m4a";
import SOM_8 from "url:../assets/sfx/pxiiuu.m4a";
import SOM_9 from "url:../assets/sfx/uaaah.m4a";
import SOM_10 from "url:../assets/sfx/weeon.m4a";

import MONSTRO_1 from "url:../assets/sprites/monstro-1.png"
import MONSTRO_2 from "url:../assets/sprites/monstro-2.png"
import MONSTRO_3 from "url:../assets/sprites/monstro-3.png"
import MONSTRO_4 from "url:../assets/sprites/monstro-4.png"
import MONSTRO_5 from "url:../assets/sprites/monstro-5.png"
import MONSTRO_6 from "url:../assets/sprites/monstro-6.png"
import MONSTRO_7 from "url:../assets/sprites/monstro-7.png"
import MONSTRO_8 from "url:../assets/sprites/monstro-8.png"
import MONSTRO_9 from "url:../assets/sprites/monstro-9.png"
import MONSTRO_10 from "url:../assets/sprites/monstro-10.png"

const sfx = [SOM_1, SOM_2, SOM_3, SOM_4, SOM_5, SOM_6, SOM_7, SOM_8, SOM_9, SOM_10];
const sprites = [MONSTRO_1, MONSTRO_2, MONSTRO_3, MONSTRO_4, MONSTRO_5, MONSTRO_6, MONSTRO_7, MONSTRO_8, MONSTRO_9, MONSTRO_10];

export class Monster extends Phaser.GameObjects.Sprite {

  accPower = 900;
  maxSpeed = 700;
  dragPct = 0.1;
  bouncePct = 0.9;

  life = 10;
  attack = 1;
  weapon = 0;

  stunned = false;

  /** @type {PowerLabel}*/
  powerLabel;

  /** @param {Phaser.Scene} stage*/
  static preload(stage) {
    stage.load.audio(SOM_1, SOM_1);
    stage.load.audio(SOM_2, SOM_2);
    stage.load.audio(SOM_3, SOM_3);
    stage.load.audio(SOM_4, SOM_4);
    stage.load.audio(SOM_5, SOM_5);
    stage.load.audio(SOM_6, SOM_6);
    stage.load.audio(SOM_7, SOM_7);
    stage.load.audio(SOM_8, SOM_8);
    stage.load.audio(SOM_9, SOM_9);
    stage.load.audio(SOM_10, SOM_10);
    stage.load.image(MONSTRO_1, MONSTRO_1);
    stage.load.image(MONSTRO_2, MONSTRO_2);
    stage.load.image(MONSTRO_3, MONSTRO_3);
    stage.load.image(MONSTRO_4, MONSTRO_4);
    stage.load.image(MONSTRO_5, MONSTRO_5);
    stage.load.image(MONSTRO_6, MONSTRO_6);
    stage.load.image(MONSTRO_7, MONSTRO_7);
    stage.load.image(MONSTRO_8, MONSTRO_8);
    stage.load.image(MONSTRO_9, MONSTRO_9);
    stage.load.image(MONSTRO_10, MONSTRO_10);
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
    this.powerLabel = new PowerLabel(this);
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
    if (!this.stunned) {
      this.body.setAccelerationX(x * this.accPower);
      this.body.setAccelerationY(y * this.accPower);
    } else {
      this.body.setAcceleration(0, 0);
    }
  }

  /** @param {Monster} monster*/
  hit(monster) {
    this.scene.sound.play(sfx[this.m]);
    monster.life -= this.attack + this.weapon;
    if (this.weapon > 0) this.weapon--;
    this.stun();
  }

  stun(duration = 1000) {
    this.stunned = true;
    this.scene.time.delayedCall(duration, () => {
      this.stunned = false;
    }, [], this);
  }

  checkDead() {
    // TODO fancy animation
    if (this.life <= 0) {
      this.powerLabel.destroy();
      this.body.enable = false;
      this.destroy();
    }
  }
}
