import Phaser from "phaser";

import {Button} from "../actors/Button";
import {Item} from "../actors/Item";
import {preloadCharacters} from "../assets/characters/index";

export class Bootstrap extends Phaser.Scene {
  constructor() {
    super({key: "Bootstrap"});
  }

  preload() {
    Button.preload(this);
    Item.preload(this);
    preloadCharacters(this);
  }

  create() {
    const p = Math.min(this.scale.width, this.scale.height) / 2;
    new Button({
      callback: () => this.scene.start("GameStart"),
      text: "Joãozinho Attack!",
      scene: this,
      x: p,
      y: p,
    });
  }
}
