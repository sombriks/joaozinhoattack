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
    this.cursors = this.input.keyboard.createCursorKeys();
    this.controller.install();
    this.monster = new Monster({scene: this, x: 400, y: 300});
    // this.cameras.main.startFollow(this.monster);

  }

  update(time, delta) {
    // XXX to be truly agnostic, it should not know the controls, just the destination or expected force.
    this.monster.move({
      controller: this.controller,
      cursors: this.cursors
    })
  }

}
