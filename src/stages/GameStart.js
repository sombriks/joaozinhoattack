import Phaser from "phaser";

import {Monster} from "../actors/Monster";
import {BattleArena} from "../actors/BattleArena";

export class GameStart extends Phaser.Scene {
  constructor() {
    super({key: "GameStart"});
  }

  preload() {
    Monster.preload(this);
  }

  create() {
    // the user input will be used here
    this.controller.install({keyboard: this.input.keyboard.createCursorKeys()});
    // monster group
    this.monsterGroup = this.physics.add.group();
    this.physics.add.collider(this.monsterGroup, this.monsterGroup, this.battle);
    // the walls of this arena
    this.arena = new BattleArena(this);
    this.physics.add.collider(this.monsterGroup, this.arena.layer);
    // we're all monsters here
    this.arena.spawnPoints.forEach(sp => this.monsterGroup.add(new Monster({
      scene: this,
      x: sp.x,
      y: sp.y,
      m: Phaser.Math.Between(0, 9)
    })));
    this.player = this.monsterGroup.getChildren()[0];
    // groups reset the bodies, so we config them again
    this.monsterGroup.getChildren().forEach(m => m?.resetBody?.());
    // adjust the camera and the world to the map
    const map = this.arena.map;
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // follow the player
    this.cameras.main.startFollow(this.player);
  }

  /**
   * @param {Monster} m1
   * @param {Monster} mn2
   */
  battle(m1, m2) {
    m1.hit(m2);
    m2.hit(m1);
    m1.checkDead();
    m2.checkDead();
  }

  update(time, delta) {
    if (this.player && this.player.active) {
      this.player.move(this.controller.vector);
    }
  }
}
