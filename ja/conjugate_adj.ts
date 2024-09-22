import { dropLast } from '../shared/text.ts'
import { ConjugationType, Options, PartOfSpeech } from './shared.ts'

const { AdjectiveIrregular, Adjectiveい, Adjectiveな } = PartOfSpeech
const { Adverb, Past, Present } = ConjugationType

export default function conjugate(chars: string, options: Options): string[] {
  if (options.type === Past) return past(chars, options)
  if (options.type === Present) return present(chars, options)
  if (options.type === Adverb) return adverb(chars, options)
  throw new Error(`Unsupported conjugation type: ${options.type}`)
}

export function past(chars: string, options: Options): string[] {
  const { affirmative, polite, pos } = options
  if (pos === AdjectiveIrregular) return irregular(Past, chars, options)
  if (pos == Adjectiveな) {
    if (affirmative && polite) return [chars + 'でした']
    if (affirmative && !polite) return [chars + 'だった']
    if (!affirmative && !polite) {
      return [chars + 'じゃなかった', chars + 'ではなかった']
    }
    if (!affirmative && polite) {
      return [
        chars + 'じゃなかったです',
        chars + 'ではなかったです',
        chars + 'じゃありませんでした',
        chars + 'ではありませんでした',
      ]
    }
  }
  if (pos == Adjectiveい) {
    const short = dropLast(chars)
    if (affirmative && polite) return [short + 'かったです']
    if (affirmative && !polite) return [short + 'かった']
    if (!affirmative && !polite) return [short + 'くなかった']
    if (!affirmative && polite) {
      return [short + 'くなかったです', short + 'くありませんでした']
    }
  }
  throw new Error(`adjectivePast bad pos: ${pos}`)
}

export function present(chars: string, options: Options): string[] {
  const { affirmative, polite, pos } = options
  if (pos === AdjectiveIrregular) {
    return irregular(Present, chars, options)
  }
  if (affirmative && polite) return [chars + 'です']

  if (affirmative && !polite && pos == Adjectiveな) return [chars + 'だ']
  if (!affirmative && !polite && pos == Adjectiveな) {
    return [chars + 'じゃない', chars + 'ではない']
  }
  if (!affirmative && polite && pos == Adjectiveな) {
    return [
      chars + 'じゃないです',
      chars + 'ではないです',
      chars + 'じゃありません',
      chars + 'ではありません',
    ]
  }

  const short = dropLast(chars)
  if (affirmative && !polite && pos == Adjectiveい) return [chars]
  if (!affirmative && !polite && pos == Adjectiveい) return [short + 'くない']
  if (!affirmative && polite && pos == Adjectiveい) {
    return [short + 'くないです', short + 'くありません']
  }
  throw new Error(`adjectivePresent bad pos: ${pos}`)
}

export function adverb(chars: string, options: Options): string[] {
  const { pos } = options
  if (pos == Adjectiveな) return [chars + 'に']
  if (pos == Adjectiveい) return [dropLast(chars) + 'く']
  if (pos == AdjectiveIrregular) {
    return irregular(Adverb, chars, {
      ...options,
      affirmative: false,
      polite: false,
    })
  }
  throw new Error(`adverb bad pos: ${pos}`)
}

function irregular(
  type: ConjugationType,
  chars: string,
  options: Options,
): string[] {
  if (chars == 'いい') return いSuffix(type, options)
  if (chars == 'かっこいい') {
    return いSuffix(type, options).map((suffix) => 'かっこ' + suffix)
  }
  throw new Error(`irregular bad chars: ${chars}`)
}

export function いSuffix(type: ConjugationType, options: Options): string[] {
  const { affirmative, polite } = options
  if (type === Adverb) return ['よく', '良く']
  if (type === Present) {
    if (affirmative && polite) return ['いいです', '良いです']
    if (affirmative && !polite) return ['いい', '良い']
    if (!affirmative && !polite) return ['よくない', '良くない']
    if (!affirmative && polite) {
      return [
        'よくないです',
        'よくありません',
        '良くないです',
        '良くありません',
      ]
    }
  }
  if (type === Past) {
    if (affirmative && polite) return ['よかったです', '良かったです']
    if (affirmative && !polite) return ['よかった', '良かった']
    if (!affirmative && !polite) return ['よくなかった', '良くなかった']
    if (!affirmative && polite) {
      return [
        'よくなかったです',
        'よくありませんでした',
        '良くなかったです',
        '良くありませんでした',
      ]
    }
  }
  throw new Error(`いSuffix bad conjugation type: ${type}`)
}
