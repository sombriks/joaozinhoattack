import Phaser from "phaser";

import {Button} from "../actors/Button";

export class Bootstrap extends Phaser.Scene {
  constructor() {
    super({key: "Bootstrap"});
  }

  preload() {
    Button.preload(this);
  }

  create() {
    new Button({
      scene: this,
      x: 200,
      y: 200,
      callback: () => console.log("Button clicked"),
    });
  }
}
