import "./assets/main.css"
import Phaser from "phaser";

import { Bootstrap } from "./stages/Bootstrap";
import { GameStart } from "./stages/GameStart";
import { GamePlay } from "./stages/GamePlay";

export const game = new Phaser.Game({
  pixelArt: true,
  width: 480,
  height: 640,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Bootstrap, GameStart, GamePlay],
});
