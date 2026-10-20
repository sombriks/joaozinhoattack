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
    const p = Math.min(window.innerWidth, window.innerHeight) / 2;
    new Button({
      text: "Start Game!",
      scene: this,
      x: p,
      y: p,
      callback: () => this.game.scene.switch("Bootstrap", "GameStart"),
    });
  }
}
