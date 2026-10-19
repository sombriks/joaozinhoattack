import Phaser from "phaser";

import CLICK from "url:../assets/sfx/click.mp3";
import BTN_TESTE from "url:../assets/sprites/btn_teste.png";

export class Button extends Phaser.GameObjects.Sprite {
  /** @param {Phaser.Scene} stage*/
  static preload(stage) {
    stage.load.image(BTN_TESTE, BTN_TESTE);
    stage.load.audio(CLICK, CLICK);
  }

  /** @param {{scene:Phaser.Scene,x:number,y:number,callback:Function}} config*/
  constructor({scene, x = 0, y = 0, callback}) {
    super(scene, x, y, BTN_TESTE);
    scene.add.existing(this);
    this.setInteractive({useHandCursor: true});
    this.on("pointerdown", this.btPush, this);
    this.on("pointerup", this.btUnPush, this);
    this.on("pointerout", this.btUnPush, this);
    this.callback = callback;
  }

  btPush() {
    this.setScale(0.92);
    this.setTint(0x13f3f3);
    this.scene.sound.play(CLICK);
    if (this.callback) {
      this.callback();
    }
  }

  btUnPush() {
    this.setScale(1);
    this.clearTint();
  }
}
