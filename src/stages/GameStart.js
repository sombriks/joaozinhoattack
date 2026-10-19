import Phaser from "phaser";

import {Monster} from "../actors/Monster";

export class GameStart extends Phaser.Scene {
  constructor() {
    super({key: "GameStart"});
  }

  preload() {
    Monster.preload(this);
  }

  create() {
    this.controller.install({keyboard: this.input.keyboard.createCursorKeys()});
    this.monsterGroup = this.physics.add.group();
    this.physics.add.collider(this.monsterGroup, this.monsterGroup, this.battle);

    // we're all monsters here
    this.player = new Monster({scene: this, x: 400, y: 300, m: 1});
    let m2 = new Monster({scene: this, x: 400, y: 600, m: 2});
    this.monsterGroup.add(m2);
    this.monsterGroup.add(new Monster({scene: this, x: 400, y: 100, m: 0}));
    this.monsterGroup.add(this.player);
    // groups reset the bodies, so we config them again
    this.monsterGroup.getChildren().forEach(m => m?.resetBody?.());
    // follow the player
    this.cameras.main.startFollow(this.player);
  }

  /**
   * @param {Monster} m1
   * @param {Monster} mn2
   */
  battle(m1, m2) {
    m1.hit(m2);
    m2.hit(m1);
    m1.checkDead();
    m2.checkDead();
  }

  update(time, delta) {
    if (this.player && this.player.active) {
      this.player.move(this.controller.vector);
    }
  }
}
