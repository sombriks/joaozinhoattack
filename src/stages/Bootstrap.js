import Phaser from "phaser";

import {Button} from "../actors/Button";

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

export class Bootstrap extends Phaser.Scene {
  constructor() {
    super({key: "Bootstrap"});
  }

  preload() {
    Button.preload(this);
    this.load.image(boboleia.image, boboleia.image);
    this.load.audio(boboleia.sound, boboleia.sound);
    this.load.image(catarro.image, catarro.image);
    this.load.audio(catarro.sound, catarro.sound);
    this.load.image(cegodongo.image, cegodongo.image);
    this.load.audio(cegodongo.sound, cegodongo.sound);
    this.load.image(coelhoso.image, coelhoso.image);
    this.load.audio(coelhoso.sound, coelhoso.sound);
    this.load.image(fumego.image, fumego.image);
    this.load.audio(fumego.sound, fumego.sound);
    this.load.image(gelado.image, gelado.image);
    this.load.audio(gelado.sound, gelado.sound);
    this.load.image(juizinho.image, juizinho.image);
    this.load.audio(juizinho.sound, juizinho.sound);
    this.load.image(palhaciano.image, palhaciano.image);
    this.load.audio(palhaciano.sound, palhaciano.sound);
    this.load.image(pedrero.image, pedrero.image);
    this.load.audio(pedrero.sound, pedrero.sound);
    this.load.image(raposolicial.image, raposolicial.image);
    this.load.audio(raposolicial.sound, raposolicial.sound);
  }

  create() {
    const p = Math.min(window.innerWidth, window.innerHeight) / 2;
    new Button({
      callback: () => this.scene.start("GameStart"),
      text: "Joãozinho Attack!",
      scene: this,
      x: p,
      y: p,
    });
  }
}
