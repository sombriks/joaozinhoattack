import Phaser from "phaser";

import {baseStyle} from "../configs/font-style";

export class KillCount extends Phaser.GameObjects.Text {
  count = 0;

  constructor({scene}) {
    super(scene, 0, 0, '', {
      ...baseStyle,
      fontSize: '28px',
    });
    scene.add.existing(this);
    scene.sys.updateList.add(this);
    // this.setScrollFactor(0);
    this.setOrigin(0.5, 0.5);
  }

  preUpdate() {
    const wv = this.scene.cameras.main.worldView;
    this.x = wv.x + wv.width / 2;
    this.y = wv.y + wv.height / (window.innerWidth >= window.innerHeight ? 3.5 : 15);
    this.text = `💀: ${this.count}`;
  }
}
