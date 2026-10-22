import Phaser from "phaser";

import {PowerLabel} from "./PowerLabel";

export class Monster extends Phaser.GameObjects.Sprite {

  accPower = 900;
  maxSpeed = 700;
  dragPct = 0.1;
  bouncePct = 0.9;

  life = 10;
  attack = 1;
  weapon = 0;
  armor = 0;

  stunned = false;

  /** @type {PowerLabel}*/
  powerLabel;

  /**
   * @param {Object}  config
   * @param {scene:Phaser.Scene} config.scene
   * @param {number}  config.x
   * @param {number}  config.y
   * @param {{
   *   attack: number,
   *   life:number,
   *   speed:number,
   *   agility:number,
   *   weapon:number,
   *   armor:number,
   *   image:string,
   *   sound:string
   * }} config.m
   * */
  constructor({scene, x = 0, y = 0, m}) {
    super(scene, x, y, m.image);
    this.setOrigin(0.5, 0.5);
    scene.add.existing(this);
    this.resetCharacter(m);
    this.resetBody();
    this.powerLabel = new PowerLabel(this);
  }

  /**
   * @param {{
   *   attack: number,
   *   life:number,
   *   speed:number,
   *   agility:number,
   *   weapon:number,
   *   armor:number,
   *   image:string,
   *   sound:string
   * }} m
   */
  resetCharacter(m) {
    this.m = m;
    this.attack = m.attack ?? 1;
    this.life = m.life ?? 10;
    this.maxSpeed = (m.speed ?? 1) * 100;
    this.accPower = (m.agility ?? 1) * 100;
    this.weapon = m.weapon ?? 0;
    this.armor = m.armor ?? 0;
    this.image = m.image;
    this.sound = m.sound;
  }

  resetBody() {
    this.scene.physics.add.existing(this)
      .setInteractive({useHandCursor: true});
    this.body
      .setCircle(this.width / 3, this.width / 6, this.height / 6)
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
    this.scene.sound.play(this.m.sound);
    monster.damage(this.attack + (this.weapon > 0 ? 1 : 0));
    if (this.weapon > 0) this.weapon--;
    this.stun();
  }

  damage(d = 0) {
    if (this.armor > 0) {
      const d2 = d - this.armor;
      this.armor -= d;
      d = Math.max(0, d2);
      if (this.armor < 0) this.armor = 0;
    }
    this.life -= d;
  }

  /** @param {import('./Item').Item} item*/
  consume(item) {
    this.life += item.life ?? 0;
    this.armor += item.armor ?? 0;
    this.weapon += item.weapon ?? 0;
    item.deplete();
  }

  stun(duration = 1000) {
    this.stunned = true;
    this.scene.time.delayedCall(duration, () => {
      this.stunned = false;
    }, [], this);
  }

  checkDead() {
    if (this.life <= 0) {
      this.emit('die', {x: this.x, y: this.y});
      this.powerLabel.destroy();
      this.body.enable = false;
      this.destroy();
    }
  }
}
