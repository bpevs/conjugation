import { assertEquals } from '@std/assert'
import { ConjugationType, PartOfSpeech } from '../shared.ts'
import conjugate from '../mod.ts'

type CondensedOptions = [boolean, boolean, ConjugationType, PartOfSpeech]

Deno.test('Should conjugate adjectives', () => {
  const { Present, Past, Adverb } = ConjugationType
  const { Adjectiveい, Adjectiveな } = PartOfSpeech

  // deno-fmt-ignore
  const testData: Array<[string, CondensedOptions, string[]]> = [
    ['かわいい', [false, true, Present, Adjectiveい], ['かわいくないです', 'かわいくありません']],
    ['かわいい', [false, true, Past, Adjectiveい], ['かわいくなかったです', 'かわいくありませんでした']],
    ['かわいい', [false, true, Adverb, Adjectiveい], ['かわいく']],
    ['げんき', [false, true, Adverb, Adjectiveな], ['げんきに']],
  ]

  testData.forEach(([chars, [affirmative, polite, type, pos], expected]) => {
    const result = conjugate(chars, { affirmative, polite, type, pos })
    assertEquals(result, expected)
  })
})

Deno.test('Should conjugate verbs', () => {
  const { Past } = ConjugationType
  const { VerbGodan } = PartOfSpeech

  // deno-fmt-ignore
  const testData: Array<[string, CondensedOptions, string[]]> = [
    ['あう', [true, false, Past, VerbGodan], ['あった']],
  ]

  testData.forEach(([chars, [affirmative, polite, type, pos], expected]) => {
    const result = conjugate(chars, { affirmative, polite, type, pos })
    assertEquals(result, expected)
  })
})
