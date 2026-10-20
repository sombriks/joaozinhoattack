import Phaser from "phaser";

import {Button} from "../actors/Button";
import {Monster} from "../actors/Monster";

export class Bootstrap extends Phaser.Scene {
  constructor() {
    super({key: "Bootstrap"});
  }

  preload() {
    Button.preload(this);
    Monster.preload(this);
  }

  create() {
    new Button({
      text: "Start Game!",
      scene: this,
      x: 200,
      y: 200,
      callback: () => this.game.scene.switch("Bootstrap", "GameStart"),
    });
  }
}
