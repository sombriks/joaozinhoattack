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
    new Monster({scene: this, x: 400, y: 300});
  }

}
