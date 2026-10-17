import Phaser from "phaser";

import TEXTURE from "url:../assets/btn_teste.png";

export class Button extends Phaser.GameObjects.Sprite {
  static preload(stage) {
    stage.load.image(TEXTURE, TEXTURE);
  }

  constructor({scene, x = 0, y = 0, callback}) {
    super(scene, x, y, TEXTURE);
    scene.add.existing(this);
    this.setInteractive({useHandCursor: true});
    this.on("pointerdown", function () {
      this.btPush();
      if (callback) {
        callback();
      }
    });

    this.on("pointerup", this.btUnPush);
    this.on("pointerout", this.btUnPush);
  }

  btPush() {
    this.setScale(0.92);
    this.setTint(0xf3f3f3);
  }

  btUnPush() {
    this.setScale(1);
    this.clearTint();
  }
}
