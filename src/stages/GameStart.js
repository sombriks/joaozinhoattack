import Phaser from "phaser";

import {Button} from "../actors/Button";
import {Monster} from "../actors/Monster";
import {BattleArena} from "../actors/BattleArena";

import boboleia from "../assets/characters/boboleia";
import catarro from "../assets/characters/catarro";
import cegodongo from "../assets/characters/cegodongo";
import coelhoso from "../assets/characters/coelhoso";
import fumego from "../assets/characters/fumego";
import gelado from "../assets/characters/gelado";
import juizinho from "../assets/characters/juizinho";
import palhaciano from "../assets/characters/palhaciano";
import pedrero from "../assets/characters/pedrero";
import raposolicial from "../assets/characters/raposolicial";
import {Item} from "../actors/Item.js";

const characters = [
  boboleia,
  catarro,
  cegodongo,
  coelhoso,
  fumego,
  gelado,
  juizinho,
  palhaciano,
  pedrero,
  raposolicial
];

export class GameStart extends Phaser.Scene {
  /** @type {Monster}*/
  player;

  constructor() {
    super({key: "GameStart"});
  }

  create() {
    this.controller.install({keyboard: this.input.keyboard.createCursorKeys()});
    const arena = new BattleArena({scene: this});
    //
    // adjust the camera and the world to the map
    this.physics.world.setBounds(0, 0, arena.map.widthInPixels, arena.map.heightInPixels);
    this.cameras.main.setBounds(0, 0, arena.map.widthInPixels, arena.map.heightInPixels);
    //
    // groups
    const monsterGroup = this.physics.add.group();
    const itemGroup = this.physics.add.group();
    this.physics.add.collider(monsterGroup, monsterGroup, this.battle);
    this.physics.add.collider(monsterGroup, itemGroup, this.pickItem);
    this.physics.add.collider(monsterGroup, arena.layer);
    //
    // we're all monsters here
    arena.spawnPoints.forEach(sp => monsterGroup.add(new Monster({
      m: characters[Phaser.Math.Between(0, 9)],
      scene: this,
      x: sp.x,
      y: sp.y
    })));
    // groups reset the bodies, so we config them again
    monsterGroup.getChildren().forEach(m => m?.resetBody?.());
    //
    // add items
    const items = ['life', 'armor', 'weapon'];
    arena.itemPoints.forEach(sp => itemGroup.add(new Item({
      scene: this,
      x: sp.x,
      y: sp.y,
      info: {
        [items[Phaser.Math.Between(0, 2)]]: Phaser.Math.Between(1, 5),
      }
    })));
    //
    // pick one randomly to be the player
    const i = Phaser.Math.Between(0, monsterGroup.getChildren().length - 1);
    this.player = monsterGroup.getChildren()[i];
    this.cameras.main.startFollow(this.player);
    this.player.on('die', ({x, y}) => {
      new Button({
        callback: () => this.scene.start("Bootstrap"),
        text: "Game Over",
        scene: this,
        x, y,
      })
    });
  }

  /**
   * @param {Monster} m1
   * @param {Monster} m2
   */
  battle(m1, m2) {
    m1.hit(m2);
    m2.hit(m1);
    m1.checkDead();
    m2.checkDead();
  }

  /** @param {Monster} monster
   *  @param {Item} item */
  pickItem(monster, item) {
    monster.consume(item);
  }

  update(time, delta) {
    if (this.player?.active) {
      this.player?.move(this.controller.vector);
    }
  }
}
