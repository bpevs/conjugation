# Japanese Conjugation Tool

Supports Adjectives and Verbs. See `ConjugationType` and `PartOfSpeech` for
supported parts of speech and conjugation targets.

## Usage

```ts
import conjugate, { ConjugationType, PartOfSpeech } from '@bpev/conjugation/ja'
const result = conjugate('あう', {
  affirmative: true,
  polite: false,
  type: ConjugationType.Past,
  pos: PartOfSpeech.VerbGodan,
})

assert(result, ['あった']) // true
```

## License

Logic is primarily based on
[Baily Snyder's Conjugation Tool](https://github.com/baileysnyder/japanese-conjugation),
with modifications only to make it easier to import and use. Therefore, I am
distributing the `jp` conjugation code with the same license.

This is not necessarily applicable to other conjugation tools within this
repository.
