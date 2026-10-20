import "./assets/main.css"
import Phaser from "phaser";

import {Bootstrap} from "./stages/Bootstrap";
import {GameStart} from "./stages/GameStart";
import {GamePlay} from "./stages/GamePlay";

import {ControllerPlugin} from "./configs/ControllerPlugin";

export const game = new Phaser.Game({
  pixelArt: true,
  width: 640,
  height: 640,
  scene: [Bootstrap, GameStart, GamePlay],
  plugins: {
    scene: [
      {key: "ControllerPlugin", plugin: ControllerPlugin, mapping: "controller"}
    ]
  },
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 0},
      debug: true
    }
  }
});
