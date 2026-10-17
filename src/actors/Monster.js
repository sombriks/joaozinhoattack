import Phaser from "phaser";

import MONSTRO_1 from "url:../assets/monstro-1.png"

export class Monster extends Phaser.GameObjects.Sprite {

  accPower = 300;
  maxSpeed = 200;
  dragPower = 100;

  /** @param {Phaser.Scene} stage*/
  static preload(stage) {
    stage.load.image(MONSTRO_1, MONSTRO_1);
  }

  /** @param {{scene:Phaser.Scene,x:number,y:number}} config*/
  constructor({scene, x = 0, y = 0}) {
    super(scene, x, y, MONSTRO_1);
    this.setOrigin(0.5, 0.5);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setInteractive({useHandCursor: true});
    this.body.setMaxVelocity(this.maxSpeed);
    this.body.setDrag(this.dragPower);
  }

  /** @param {{cursors: Phaser.Types.Input.Keyboard.CursorKeys,controller:ControllerPlugin}} config*/
  move({cursors, controller}) {
    // check touch/click first, then fallback to keyboard
    if (controller.isActive) {
      this.body.setAccelerationX(controller.vector.x * this.accPower);
      this.body.setAccelerationY(controller.vector.y * this.accPower);
    } else {
      if (cursors.left.isDown) {
        this.body.setAccelerationX(-this.accPower);
      } else if (cursors.right.isDown) {
        this.body.setAccelerationX(this.accPower);
      } else {
        this.body.setAccelerationX(0);
      }
      if (cursors.up.isDown) {
        this.body.setAccelerationY(-this.accPower);
      } else if (cursors.down.isDown) {
        this.body.setAccelerationY(this.accPower);
      } else {
        this.body.setAccelerationY(0);
      }
    }
  }
}
