import Phaser from 'phaser';

export class ControllerPlugin extends Phaser.Plugins.ScenePlugin {
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  keyboard

  #vector = {
    x: 0,
    y: 0
  };

  /** @return {{x: number, y: number}} */
  get vector() {
    return this.#vector;
  }

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

  /**
   * @param {Object} options
   * @param {Phaser.Types.Input.Keyboard.CursorKeys} options.keyboard
   **/
  install({keyboard} = {}) {
    this.keyboard = keyboard;
    this.scene.sys.events.on("update", this.update, this);
  }

  /**
   * @param {number} time
   * @param {number} delta
   * */
  update(time, delta) {
    const pointer = this.scene.input.activePointer;
    if (pointer.isDown) {
      const distance = Phaser.Math.Distance.Between(pointer.downX, pointer.downY, pointer.x, pointer.y);
      if (distance > 10) {
        const angle = Phaser.Math.Angle.Between(pointer.downX, pointer.downY, pointer.x, pointer.y);
        this.#vector.x = Math.cos(angle);
        this.#vector.y = Math.sin(angle);
      } else {
        this.reset();
      }
    } else if (this.keyboard) {
      if (this.keyboard.left.isDown) {
        this.#vector.x = -1;
      } else if (this.keyboard.right.isDown) {
        this.#vector.x = 1;
      } else {
        this.#vector.x = 0;
      }
      if (this.keyboard.up.isDown) {
        this.#vector.y = -1;
      } else if (this.keyboard.down.isDown) {
        this.#vector.y = 1;
      } else {
        this.#vector.y = 0;
      }
    } else {
      this.reset();
    }
  }

  reset() {
    this.#vector.x = 0;
    this.#vector.y = 0;
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
