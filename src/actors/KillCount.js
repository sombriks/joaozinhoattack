import Phaser from "phaser";

import {baseStyle} from "../configs/font-style";

export class KillCount extends Phaser.GameObjects.Text {
  count = 0;

  constructor({scene}) {
    super(scene, scene.scale.width / 2, 50, '', {
      ...baseStyle,
      fontSize: '28px',
    });
    scene.add.existing(this);
    scene.sys.updateList.add(this);
    this.setScrollFactor(0);
    this.setOrigin(0.5, 0.5);
  }

  preUpdate() {
    // this.x = this.scene.scale.width / 2;
    // this.y = this.scene.scale.height / 10;
    this.text = `💀 x ${this.count}`;
  }
}
