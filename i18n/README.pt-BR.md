<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/banner-dark.svg">
    <img src="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/banner.svg" width="820" alt="O sapo Hop pula da vitória-régia 2 para a vitória-régia 3">
  </picture>
</p>

<h1 align="center">vueleap</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/vueleap"><img src="https://img.shields.io/npm/v/vueleap?color=42b883&label=npm" width="80" alt="versão no npm"></a>
  <a href="https://github.com/kwy404/vueleap/actions/workflows/ci.yml"><img src="https://github.com/kwy404/vueleap/actions/workflows/ci.yml/badge.svg" width="96" alt="status do CI"></a>
  <a href="https://github.com/kwy404/vueleap/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/vueleap?color=42b883" width="78" alt="licença MIT"></a>
</p>

<p align="center">
  <a href="https://kwy404.github.io/vueleap/">Site e demo ao vivo</a> &middot;
  <a href="https://kwy404.github.io/vueleap/report-example.html">Relatório de exemplo</a> &middot;
  <a href="https://github.com/kwy404/vueleap/blob/main/README.md">English</a>
</p>

O vueleap lê um projeto Vue 2 e mostra o que quebra no Vue 3, arquivo por arquivo e linha por linha. Ele reescreve as mudanças que são só renomeações, liga cada um dos outros achados ao guia oficial de migração e mostra as flags do `@vue/compat` que o resto do código ainda precisa.

```bash
npx vueleap
```

Sem instalar nem configurar nada, e nada sai da sua máquina. Você também pode [colar um componente no site](https://kwy404.github.io/vueleap/#try) e ver a versão Vue 3 na hora.

## Uso

```bash
npx vueleap                    # relatório da pasta atual
npx vueleap ./app --html report.html
npx vueleap --fix              # mostra as correções seguras como diff
npx vueleap --fix --write      # aplica as correções
npx vueleap --compat           # mostra só a configuração do @vue/compat
npx vueleap --fail-on error    # sai com código 1 no CI
```

`npx vueleap --help` lista todas as opções e `--list-rules` mostra as 41 verificações, que cobrem templates, scripts, estilos e o `package.json`.

## Correções seguras

O `--fix` só reescreve mudanças que mantêm o mesmo significado no Vue 3: hooks `beforeDestroy` e `destroyed`, hooks de diretivas, `$scopedSlots`, classes de transição, modificadores keyCode, `.sync`, eventos `@hook:` e `productionTip`. Ele edita só os caracteres que apontou, então a formatação fica igual, e nada é gravado sem `--write`.

## Flags de compatibilidade

O [migration build](https://v3-migration.vuejs.org/migration-build) roda código no estilo Vue 2 sobre o Vue 3, com uma flag por recurso. `npx vueleap --compat` mostra a menor configuração para o seu código: Vue 3 por padrão (`MODE: 3`) e só as flags ainda necessárias. Remova as flags conforme os achados somem e, no fim, remova o `@vue/compat`.

## Pelo código

```ts
import { analyze, fixSource } from 'vueleap'

const result = await analyze('./meu-app')
const { code, remaining } = fixSource(componenteVue2, { filename: 'Preco.vue' })
```

## Licença

[MIT](https://github.com/kwy404/vueleap/blob/main/LICENSE). Feito por [Alexandre Kohler](https://github.com/kwy404) ([GitHub](https://github.com/kwy404), [LinkedIn](https://www.linkedin.com/in/alexandre-silva-173687256/)).
