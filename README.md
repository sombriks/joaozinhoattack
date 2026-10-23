# joaozinhoattack

jogo de ação e habilidade de presente para o meu sobrinho

## setup inicial

```bash
# mkdir joaozinhoattack
touch jsconfig.json
mkdir -p src/{configs,assets,stages,actors}
mkdir -p src/assets/{characters,maps,sfx,sprites}
touch src/{index.html,main.js}
touch src/actors/{BattleArena,Button,Item,KillCount,Monster,PowerLabel}.js
touch src/assets/main.css # and many more
touch src/configs/manifest.json # and many more
# then the tooling setup
npm i -D parcel phaser
npm pkg set type=module
npm pkg set scripts.dev="parcel src/index.html"
```

## Como rodar

```bash
npm run dev
```

## Notas

- O autocomplete do phaser só prestou depois de ajeitar o `jsconfig.json`
- O `manbifest.json` está o menor possível que ainda permita instalar como PWA
- O parcel não é exatamente zero-confioguração, ele apenas vai se
  configurando sozinho, de acordo com o que você decide usar. É bom conferir
  sempre o que ele está fazendo no `package.json` sem você saber.
- Os plugins do phaser são um pouco burocráticos, mas são recompensadores.
  Muita coisa é simplificada quando é oferecida como um comportamento já
  instalado na `Scene`.
- Todo `GameObject` é um `EventEmitter`. Esquecer de _desregistrar_ os
  ouvintes pode dar vazamento de memória.
- A melhor configuração da Canvas do game é **640x640** e o `scale.mode`  
  setado para `Phaser.Scale.ENVELOP`.
- **Entretanto** as coordenadas absolutas da canvas ficam zoadas,
  necessitando truques de cálculo com o `wordView` da camera para setar 
  atores fixos em tela.
- `this.scene.start("")` é diferente de `this.game.scene.start("")`
