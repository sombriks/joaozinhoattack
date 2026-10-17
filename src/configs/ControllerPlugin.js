import Phaser from 'phaser';

export class ControllerPlugin extends Phaser.Plugins.ScenePlugin {

  isActive = false;
  angle = 0;
  angleDegrees = 0;
  distance = 0;
  vector = {x: 0, y: 0};

  constructor(scene, pluginManager, key) {
    super(scene, pluginManager, key);
    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once("boot", this.boot, this);
    }
  }

  boot() {
    this.scene.sys.events.on("shutdown", this.shutdown, this);
    this.scene.sys.events.on("destroy", this.destroy, this);
  }

  install() {
    this.scene.sys.events.on("update", this.update, this);
  }

  /** @param {number} time
   * @param {number} delta */
  update(time, delta) {
    const pointer = this.scene.input.activePointer;
    if (!pointer.isDown) {
      if (this.isActive) this.reset();
      return;
    }
    this.distance = Phaser.Math.Distance.Between(pointer.downX, pointer.downY, pointer.x, pointer.y);
    if (this.distance > 10) {
      this.isActive = true;
      this.angle = Phaser.Math.Angle.Between(pointer.downX, pointer.downY, pointer.x, pointer.y);
      this.vector.x = Math.cos(this.angle);
      this.vector.y = Math.sin(this.angle);
    } else {
      this.vector.x = 0;
      this.vector.y = 0;
    }
  }

  reset() {
    this.isActive = false;
    this.angle = 0;
    this.angleDegrees = 0;
    this.distance = 0;
    this.vector = {x: 0, y: 0};
  }

  uninstall() {
    this.scene.sys.events.off("update", this.update, this);
    this.reset();
  }

  shutdown() {
    this.uninstall();
  }

  destroy() {
    this.shutdown();
  }
}
