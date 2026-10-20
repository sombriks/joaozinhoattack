import Phaser from "phaser";

export class BattleArena {
  /** @type {Phaser.Scene} */
  scene;
  /** @type {Phaser.Tilemaps.Tilemap} */
  _map;
  /** @type {Phaser.Tilemaps.TilemapLayer} */
  _layer;
  /** @type {Array<{x: number, y: number}>} */
  _spawnPoints = [];
  _blockSize = 128;
  // TODO this can be externalized as an asset
  _layoutDesign = `
    11111111111111
    10000000000001
    1000M010M00001
    10000010000001
    10001111000001
    10000100000001
    100000000M0001
    110M0000000001
    10000000000001
    10011111000001
    1000000000M001
    10000000000001
    11111111111111
  `;

  /** @param {Phaser.Scene} scene */
  constructor(scene) {
    this.scene = scene;
    this.build();
  }

  get map() {
    return this._map;
  }

  get layer() {
    return this._layer;
  }

  get spawnPoints() {
    return this._spawnPoints;
  }

  build() {
    const linhas = this._layoutDesign.trim().split("\n").map(l => l.trim());
    const largura = linhas[0].length;
    const altura = linhas.length;

    const wallGraphics = this.scene.make.graphics({ x: 0, y: 0, add: false });
    wallGraphics.fillStyle(0x444444, 1);
    wallGraphics.fillRect(0, 0, this._blockSize, this._blockSize);
    wallGraphics.generateTexture("bloco_parede", this._blockSize, this._blockSize);

    this._map = this.scene.make.tilemap({
      tileWidth: this._blockSize,
      tileHeight: this._blockSize,
      width: largura,
      height: altura
    });

    const tileset = this._map.addTilesetImage("bloco_parede");
    this._layer = this._map.createBlankLayer("Paredes", tileset);

    linhas.forEach((linha, y) => {
      const blocos = linha.split("");
      blocos.forEach((bloco, x) => {
        if (bloco === "1") {
          this._layer.putTileAt(0, x, y);
        } else if (bloco === "M") {
          const pixelX = x * this._blockSize + this._blockSize / 2;
          const pixelY = y * this._blockSize + this._blockSize / 2;
          this._spawnPoints.push({ x: pixelX, y: pixelY });
        }
      });
    });

    this._layer.setCollisionByExclusion([-1]);
  }
}
