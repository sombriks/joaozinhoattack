import Phaser from "phaser";

export class BattleArena {
  /** @type {Phaser.Scene} */
  scene;
  /** @type {Phaser.Tilemaps.Tilemap} */
  _map;
  /** @type {Phaser.Tilemaps.TilemapLayer} */
  _layer;

  _blockSize = 128;
  _layoutDesign = `
    1111111111111111111111111111111
    1000000001000000000000001000001
    1000000001000000000000001000001
    1000000001000000000000001000001
    1000000001000000000000001000001
    1000000001000000000000001000001
    1011111001001111000000001001101
    1010001000001001000000000001101
    1010101111001001111111111101101
    1000100001000000000000000100001
    1110111001111111100000000111011
    1000000000000000000000000000001
    1011111110011100111111111111101
    1000000010010100100000000000001
    1011110010010100100000000111101
    1000010000011100000000000100001
    1110011111000001111111111100111
    1000000000011000000000000000001
    1011111110011001111111111111101
    1010000010000001000000000000101
    1010110011110111100000000110101
    1000110000000000000000000110001
    1111111111111111111111111111111
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
        }
      });
    });

    this._layer.setCollisionByExclusion([-1]);
  }
}
