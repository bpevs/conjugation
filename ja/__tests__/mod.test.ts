import { assertEquals } from '@std/assert'
import { ConjugationType, PartOfSpeech } from '../shared.ts'
import conjugate from '../mod.ts'

type CondensedOptions = [boolean, boolean, ConjugationType, PartOfSpeech]

const positive = true
const negative = false
const polite = true
const casual = false

Deno.test('Should conjugate adjectives', () => {
  const { Present, Past, Adverb } = ConjugationType
  const { Adjectiveい, Adjectiveな } = PartOfSpeech

  // deno-fmt-ignore
  const testData: Array<[string, CondensedOptions, string[]]> = [
    // Adjectiveい > Present
    ['多い', [positive, casual, Present, Adjectiveい], ['多い']],
    ['多い', [positive, polite, Present, Adjectiveい], ['多いです']],
    ['多い', [negative, casual, Present, Adjectiveい], ['多くない']],
    ['多い', [negative, polite, Present, Adjectiveい], ['多くないです', '多くありません']],
    // Adjectiveい > Past
    ['多い', [positive, casual, Past, Adjectiveい], ['多かった']],
    ['多い', [positive, polite, Past, Adjectiveい], ['多かったです']],
    ['多い', [negative, casual, Past, Adjectiveい], ['多くなかった']],
    ['多い', [negative, polite, Past, Adjectiveい], ['多くなかったです', '多くありませんでした']],
    // Adjectiveい > Adverb
    ['多い', [positive, casual, Adverb, Adjectiveい], ['多く']],

    // Adjectiveな > Present
    ['元気', [positive, casual, Present, Adjectiveな], ['元気だ']],
    ['元気', [positive, polite, Present, Adjectiveな], ['元気です']],
    ['元気', [negative, casual, Present, Adjectiveな], ['元気じゃない', '元気ではない']],
    ['元気', [negative, polite, Present, Adjectiveな], ['元気じゃないです', '元気ではないです', '元気じゃありません', '元気ではありません',]],
    // Adjectiveな > Past
    ['元気', [positive, casual, Past, Adjectiveな], ['元気だった']],
    ['元気', [positive, polite, Past, Adjectiveな], ['元気でした']],
    ['元気', [negative, casual, Past, Adjectiveな], ['元気じゃなかった', '元気ではなかった']],
    ['元気', [negative, polite, Past, Adjectiveな], ['元気じゃなかったです', '元気ではなかったです', '元気じゃありませんでした', '元気ではありませんでした']],
    // Adjectiveな > Adverb
    ['元気', [positive, casual, Adverb, Adjectiveな], ['元気に']],
  ]

  testData.forEach(([chars, [affirmative, polite, type, pos], expected]) => {
    assertEquals(conjugate(chars, { affirmative, polite, type, pos }), expected)
  })
})

Deno.test('Should conjugate verbs', () => {
  const { Past, Present } = ConjugationType
  const { VerbGodan, VerbIchidan } = PartOfSpeech

  // deno-fmt-ignore
  const testData: Array<[string, CondensedOptions, string[]]> = [
    // VerbGodan う > Present
    ['あう', [positive, casual, Present, VerbGodan], ['あう']],
    ['あう', [positive, polite, Present, VerbGodan], ['あいます']],
    ['あう', [negative, casual, Present, VerbGodan], ['あわない']],
    ['あう', [negative, polite, Present, VerbGodan], ['あいません', 'あわないです']],
    // VerbGodan う > Past
    ['あう', [positive, casual, Past, VerbGodan], ['あった']],
    ['あう', [positive, polite, Past, VerbGodan], ['あいました']],
    ['あう', [negative, casual, Past, VerbGodan], ['あわなかった']],
    ['あう', [negative, polite, Past, VerbGodan], ['あいませんでした', 'あわなかったです']],

    // VerbIchidan う > Present
    ['食べる', [positive, casual, Present, VerbIchidan], ['食べる']],
    ['食べる', [positive, polite, Present, VerbIchidan], ['食べます']],
    ['食べる', [negative, casual, Present, VerbIchidan], ['食べない']],
    ['食べる', [negative, polite, Present, VerbIchidan], ['食べません', '食べないです']],
    // VerbIchidan う > Past
    ['食べる', [positive, casual, Past, VerbIchidan], ['食べた']],
    ['食べる', [positive, polite, Past, VerbIchidan], ['食べました']],
    ['食べる', [negative, casual, Past, VerbIchidan], ['食べなかった']],
    ['食べる', [negative, polite, Past, VerbIchidan], ['食べませんでした', '食べなかったです']],
  ]

  testData.forEach(([chars, [affirmative, polite, type, pos], expected]) => {
    assertEquals(conjugate(chars, { affirmative, polite, type, pos }), expected)
  })
})
