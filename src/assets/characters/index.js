// src/assets/characters/index.js

import boboleia from "./boboleia";
import catarro from "./catarro";
import cegodongo from "./cegodongo";
import coelhoso from "./coelhoso";
import fumego from "./fumego";
import gelado from "./gelado";
import juizinho from "./juizinho";
import palhaciano from "./palhaciano";
import pedrero from "./pedrero";
import raposolicial from "./raposolicial";

export const characters = [
  boboleia,
  catarro,
  cegodongo,
  coelhoso,
  fumego,
  gelado,
  juizinho,
  palhaciano,
  pedrero,
  raposolicial,
];

/** @param {Phaser.Scene} stage*/
export function preloadCharacters(stage) {
  for (const character of characters) {
    stage.load.image(character.image, character.image);
    stage.load.audio(character.sound, character.sound);
  }
}
