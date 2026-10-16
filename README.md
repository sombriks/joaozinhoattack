# joaozinhoattack

jogo de ação e habilidade de presente para o meu sobrinho

## setup inicial

```bash
# mkdir joaozinhoattack
mkdir -p src/{configs,assets,stages,actors}
touch src/{index.html,main.js}
touch src/configs/manifest.json
touch src/assets/main.css
npm i -D parcel phaser
npm pkg set type=module
npm pkg set scripts.dev="parcel src/index.html"
```
