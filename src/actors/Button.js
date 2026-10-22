import Phaser from "phaser";

import CLICK from "url:../assets/sfx/click.mp3";
import {baseStyle} from "../configs/font-style";

export class Button extends Phaser.GameObjects.Text {
  /** @param {Phaser.Scene} stage*/
  static preload(stage) {
    stage.load.audio(CLICK, CLICK);
  }

  /**
   * @param {{
   *   scene: Phaser.Scene,
   *   x: number,
   *   y: number,
   *   text: string,
   *   callback: Function
   * }} config
   */
  constructor({scene, x = 0, y = 0, text = "CLICK ME!", callback}) {
    super(scene, x, y, text, {
      ...baseStyle,
      fontSize: '32px',
      backgroundColor: '#333',
      padding:
        {
          bottom: 10,
          left: 20,
          right: 20,
          top: 10
        }
    });

    scene.add.existing(this);
    this.setOrigin(0.5, 0.5);
    this.setInteractive({useHandCursor: true});
    this.on("pointerdown", this.btPush, this);
    this.on("pointerup", this.btUnPush, this);
    this.on("pointerout", this.btLeave, this);
    this.callback = callback;
  }

  btPush() {
    this.setScale(0.92);
    this.setTint(0x13f3f3);
    this.scene.sound.play(CLICK);
    this.pressed = true;
  }

  btUnPush() {
    if (this.pressed && this.callback) {
      this.btLeave();
      this.callback();
    }
  }

  btLeave() {
    this.pressed = false;
    this.setScale(1);
    this.clearTint();

  }
}
