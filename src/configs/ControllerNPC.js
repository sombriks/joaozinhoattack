import Phaser from "phaser";

export class ControllerNPC {
  #nextTick = 0;
  #vector = {x: 0, y: 0};
  #delay = 1000;

  get vector() {
    return this.#vector;
  }

  update(time = -1) {
    if (time <= this.#nextTick) return this;
    this.#nextTick = time + this.#delay;
    if (Phaser.Math.Between(1, 10) <= 3) {
      this.#vector.x = 0;
      this.#vector.y = 0;
    } else {
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      this.#vector.x = Math.cos(angle);
      this.#vector.y = Math.sin(angle);
    }
    return this;
  }
}
