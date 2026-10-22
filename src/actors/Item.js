import Phaser from "phaser";

import PLIM from "url:../assets/sfx/plim.m4a";

import {baseStyle} from "../configs/font-style";

export class Item extends Phaser.GameObjects.Text {
  static get types() {
    return ['life', 'weapon', 'armor']
  }

  /** @param {Phaser.Scene} stage*/
  static preload(stage) {
    stage.load.audio(PLIM, PLIM);
  }

  life = 0;
  weapon = 0;
  armor = 0;

  constructor({scene, x, y, info}) {
    super(scene, x, y, '', {
      ...baseStyle
    });
    scene.add.existing(this);
    this.setOrigin(0.5, 0.5);
    this.setInteractive({useHandCursor: true});
    this.life = info.life ?? 0;
    this.weapon = info.weapon ?? 0;
    this.armor = info.armor ?? 0;
    if (this.life > 0) this.text += `❤️ +${this.life}`;
    if (this.weapon > 0) this.text += `⚔️ +${this.weapon}`;
    if (this.armor > 0) this.text += `🛡️ +${this.armor}`;
  }

  resetBody() {
    this.scene.physics.add.existing(this)
      .setInteractive({useHandCursor: true});
    this.body
      .setCircle(this.width / 3, this.width / 6, this.height / 6);
  }

  deplete() {
    this.scene.sound.play(PLIM);
    this.destroy()
  }
}
