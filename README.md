# Conjugation

A set of tools for doing conjugation transformations in various languages. I
will focus on keeping them to have similar usage patterns and types, to make
integrating them easier.

Since I am tending to build off of prior work, each language may have different
license conditions and usage. Please refer to the individual locale directories.

## Import

This library is published to [jsr.io](https://jsr.io/@bpev/conjugation), and can
be used in various runtimes.

- npm: `npx jsr add @bpev/conjugation`
- deno: `deno add @bpev/conjugation`
- bun: `bunx jsr add @bpev/conjugation`
- yarn: `yarn dlx jsr add @bpev/conjugation`
- pnpm: `pnpm dlx jsr add @bpev/conjugation`

For usage in the browser, we can import from esm.sh:

```js
import conjugate from 'https://esm.sh/jsr/@bpev/conjugation/ja'
```

## Usage

### Japanese

```ts
import conjugate, { ConjugationType, PartOfSpeech } from '@bpev/conjugation/ja'
const result = conjugate('あう', {
  affirmative: true,
  polite: false,
  type: ConjugationType.Past,
  pos: PartOfSpeech.VerbGodan,
})

assert(result, ['あった'])
```

Supported conjugation targets are:

```ts
ConjugationType.Past
ConjugationType.Present

// Adjective Only
ConjugationType.Adverb

// Verb Only
ConjugationType.Causative
ConjugationType.Imperative
ConjugationType.Passive
ConjugationType.Potential
ConjugationType.Te
ConjugationType.Volitional
```

Supported parts of speech (for input) are:

```ts
PartOfSpeech.Adjectiveな
PartOfSpeech.Adjectiveい
PartOfSpeech.VerbGodan
PartOfSpeech.VerbIchidan
PartOfSpeech.VerbIrregular
PartOfSpeech.Verbする
```
