import Phaser from "phaser";

import {Button} from "../actors/Button";
import {Monster} from "../actors/Monster";
import {BattleArena} from "../actors/BattleArena";
import {characters} from "../assets/characters/index";
import {Item} from "../actors/Item.js";
import {ControllerNPC} from "../configs/ControllerNPC.js";
import {KillCount} from "../actors/KillCount.js";

export class GameStart extends Phaser.Scene {
  /** @type {Monster|Phaser.GameObjects.GameObject}*/
  player;
  /** @type {KillCount} */
  killCount;
  npcs = new Map();
  respawnDelay = 10000

  constructor() {
    super({key: "GameStart"});
  }

  create() {
    // user controller and the arena itself
    this.controller.install({keyboard: this.input.keyboard.createCursorKeys()});
    const arena = new BattleArena({scene: this});
    // adjust the camera and the world to the map
    this.physics.world.setBounds(0, 0, arena.map.widthInPixels, arena.map.heightInPixels);
    this.cameras.main.setBounds(0, 0, arena.map.widthInPixels, arena.map.heightInPixels);
    // setup collision groups
    const monsterGroup = this.physics.add.group();
    const itemGroup = this.physics.add.group();
    this.physics.add.collider(monsterGroup, monsterGroup, this.battle);
    this.physics.add.collider(monsterGroup, itemGroup, this.pickItem);
    this.physics.add.collider(itemGroup, itemGroup);
    this.physics.add.collider(monsterGroup, arena.layer);
    this.physics.add.collider(itemGroup, arena.layer);
    // add initial items
    arena.itemPoints.forEach(p => itemGroup.add(this.spawnItem(p)));
    itemGroup.getChildren().forEach(i => i?.resetBody());
    // we're all monsters here
    arena.spawnPoints.forEach(p => monsterGroup.add(this.spawnMonster(p)));
    monsterGroup.getChildren().forEach(m => m?.resetBody?.());
    // pick a monster randomly to be the player
    const i = Phaser.Math.Between(0, monsterGroup.getChildren().length - 1);
    this.playerSetup(monsterGroup.getChildren()[i]);
    // autopilot on everyone else
    monsterGroup.getChildren().filter(m => m !== this.player).forEach(m => this.setupNPC(m));
    // finally, the spawn clock to make things interesting
    this.time.addEvent({
      delay: this.respawnDelay,
      loop: true,
      callback: () => {
        // replenish items
        arena.itemPoints.forEach(p => itemGroup.add(this.spawnItem(p)));
        itemGroup.getChildren().forEach(i => i?.resetBody?.());
        // spawn one monster
        const p = Phaser.Math.Between(0, arena.spawnPoints.length - 1);
        const monster = this.spawnMonster(arena.spawnPoints[p]);
        monsterGroup.add(monster);
        monster.resetBody();
        this.setupNPC(monster);
      }
    });
    this.killCount = new KillCount({scene: this});
  }

  /** @param {{x:number,y:number}} p */
  spawnMonster({x, y}) {
    const m = characters[Phaser.Math.Between(0, characters.length - 1)];
    return new Monster({
      scene: this,
      x, y, m
    });
  }

  /** @param {{x:number,y:number}} p */
  spawnItem({x, y}) {
    const items = Item.types;
    const key = items[Phaser.Math.Between(0, items.length - 1)];
    const value = Phaser.Math.Between(1, 5);
    return new Item({
      info: {[key]: value},
      scene: this,
      x, y
    })
  }

  /** @param {Monster|Phaser.GameObjects.GameObject} monster*/
  playerSetup(monster) {
    this.player = monster;
    this.cameras.main.startFollow(this.player);
    this.player.on('die', ({x, y}) => {
      return new Button({
        callback: () => this.scene.start("Bootstrap"),
        text: "Game Over",
        scene: this,
        x, y,
      });
    });
  }

  setupNPC(monster) {
    const controller = new ControllerNPC();
    this.npcs.set(controller, monster);
    monster.on('die', ({killedBy}) => {
      this.npcs.delete(controller);
      if (killedBy === this.player) {
        this.killCount.count++;
      }
    });
  }

  /**
   * @param {Monster} m1
   * @param {Monster} m2
   */
  battle(m1, m2) {
    m1.hit(m2);
    m2.hit(m1);
    m1.checkDead(m2);
    m2.checkDead(m1);
  }

  /** @param {Monster} monster
   *  @param {Item} item */
  pickItem(monster, item) {
    monster.consume(item);
  }

  update(time, delta) {
    this.player?.move(this.controller.vector);
    this.npcs.forEach((monster, controller) => {
      monster?.move(controller.update(time).vector);
    });
  }
}
