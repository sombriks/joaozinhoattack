# joaozinhoattack

jogo de ação e habilidade de presente para o meu sobrinho

## setup inicial

```bash
# mkdir joaozinhoattack
touch jsconfig.json
mkdir -p src/{configs,assets,stages,actors}
touch src/{index.html,main.js}
touch src/configs/manifest.json
touch src/assets/main.css
npm i -D parcel phaser
npm pkg set type=module
npm pkg set scripts.dev="parcel src/index.html"
npm pkg set scripts.build="parcel build --dist-dir=dist src/index.html"
```

## Como rodar

```bash
npm run dev
```

## Notas

- O autocomplete do phaser só prestou depois de ajeitar o `jsconfig.json`
