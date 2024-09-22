import { ConjugationType, Options, PartOfSpeech } from './shared.ts'
import { causative, imperative, passive, potential } from './conjugate_verb.ts'

const { VerbGodan, VerbIchidan } = PartOfSpeech
const {
  Past,
  Present,
  Passive,
  Causative,
  Potential,
  Imperative,
  Te,
  Volitional,
} = ConjugationType

type Conjugator = (chars: string, options: Options) => string[]

export default function conjugate(chars: string, options: Options): string[] {
  let prefix, conjugatedSuffix

  if ((prefix = checkSuffix(chars, 'いく')) !== false) {
    conjugatedSuffix = conjugate_いく(options, false)
  } else if ((prefix = checkSuffix(chars, '行く')) !== false) {
    conjugatedSuffix = conjugate_いく(options, true)
  } else if ((prefix = checkSuffix(chars, 'する')) !== false) {
    conjugatedSuffix = conjugate_する(options)
  } else if ((prefix = checkSuffix(chars, 'くる')) !== false) {
    conjugatedSuffix = conjugate_くる(options, false)
  } else if ((prefix = checkSuffix(chars, '来る')) !== false) {
    conjugatedSuffix = conjugate_くる(options, true)
  } else if ((prefix = checkSuffix(chars, 'ある')) !== false) {
    conjugatedSuffix = conjugate_ある(options)
  } else if ((prefix = checkSuffix(chars, 'とう')) !== false) {
    conjugatedSuffix = conjugate_とう(options, false)
  } else if ((prefix = checkSuffix(chars, '問う')) !== false) {
    conjugatedSuffix = conjugate_とう(options, true)
  }

  // There may be multiple correct suffixes
  if (typeof conjugatedSuffix === 'string') {
    return [prefix + conjugatedSuffix]
  } else if (conjugatedSuffix && conjugatedSuffix.constructor === Array) {
    const retvals = []
    for (let i = 0; i < conjugatedSuffix.length; i++) {
      retvals[i] = prefix + conjugatedSuffix[i]
    }
    return retvals
  }

  throw new Error('irregular verb conjugation failed')
}

function getConjugationFunction(
  conjugationType: ConjugationType,
  validTypes: ConjugationType[],
): null | Conjugator {
  if (validTypes.includes(conjugationType)) return null
  const conjugators: Partial<Record<ConjugationType, Conjugator>> = {
    [Passive]: passive,
    [Causative]: causative,
    [Potential]: potential,
    [Imperative]: imperative,
  }
  return conjugators[conjugationType] || null
}

export function checkSuffix(chars: string, suffix: string): string | false {
  for (let i = 1; i <= suffix.length; i++) {
    if (chars[chars.length - i] != suffix[suffix.length - i]) {
      return false
    }
  }
  return chars.replace(suffix, '')
}

function conjugate_いく(options: Options, isKanji: boolean): string[] {
  const { affirmative, polite, type } = options
  const first = isKanji ? '行' : 'い'
  const plainForm = first + 'く'
  if (type === Present) {
    if (affirmative && polite) return [`${first}きます`]
    if (affirmative && !polite) return [`${first}く`]
    if (!affirmative && !polite) return [`${first}かない`]
    if (!affirmative && polite) {
      return [`${first}きません`, `${first}かないです`]
    }
  }
  if (type === Past) {
    if (affirmative && polite) return [`${first}きました`]
    if (affirmative && !polite) return [`${first}った`]
    if (!affirmative && !polite) return [`${first}かなかった`]
    if (!affirmative && polite) {
      return [
        `${first}きませんでした`,
        `${first}かなかったです`,
      ]
    }
  }
  if (type === Te) return [`${first}って`]
  if (type === Volitional) {
    return [polite ? `${first}きましょう` : `${first}こう`]
  }

  const validConjugators = [Passive, Causative, Potential, Imperative]
  const conjugator = getConjugationFunction(type, validConjugators)
  if (conjugator) {
    return conjugator(plainForm, { pos: VerbGodan, affirmative, polite, type })
  }
  throw new Error(`conjugate_いく invalid`)
}

function conjugate_する({ affirmative, polite, type }: Options): string[] {
  if (type === Present) {
    if (affirmative && polite) return ['します']
    if (affirmative && !polite) return ['する']
    if (!affirmative && polite) return ['しません', 'しないです']
    if (!affirmative && !polite) return ['しない']
  }
  if (type === Past) {
    if (affirmative && polite) return ['しました']
    if (affirmative && !polite) return ['した']
    if (!affirmative && polite) return ['しませんでした', 'しなかったです']
    if (!affirmative && !polite) return ['しなかった']
  }
  if (type === Te) return ['して']
  if (type === Volitional) return [polite ? 'しましょう' : 'しよう']
  if (type === Passive) {
    if (affirmative && polite) return ['されます']
    if (affirmative && !polite) return ['される']
    if (!affirmative && polite) return ['されません']
    if (!affirmative && !polite) return ['されない']
  }
  if (type === Causative) {
    if (affirmative && polite) return ['させます']
    if (affirmative && !polite) return ['させる']
    if (!affirmative && polite) return ['させません']
    if (!affirmative && !polite) return ['させない']
  }
  if (type === Potential) {
    // I'm not sure if the kanji form 出来る is the same verb as the potential
    // form of する, できる. Just allow the kanji anyways, who gives a CRAP.
    if (affirmative && polite) return ['できます', '出来ます']
    if (affirmative && !polite) return ['できる', '出来る']
    if (!affirmative && polite) return ['できません', '出来ません']
    if (!affirmative && !polite) return ['できない', '出来ない']
  }
  if (type === Imperative) return ['しろ', 'せよ']
  throw new Error(`conjugate_する invalid`)
}

function conjugate_くる(options: Options, isKanji: boolean): string[] {
  const { affirmative, polite, type } = options
  let retval: string[] = []
  if (type === Present) {
    if (affirmative && polite) retval = ['きます']
    if (affirmative && !polite) retval = ['くる']
    if (!affirmative && polite) retval = ['きません', 'こないです']
    if (!affirmative && !polite) retval = ['こない']
  }
  if (type === Past) {
    if (affirmative && polite) retval = ['きました']
    if (affirmative && !polite) retval = ['きた']
    if (!affirmative && polite) retval = ['きませんでした', 'こなかったです']
    if (!affirmative && !polite) retval = ['こなかった']
  }
  if (type === Te) retval = ['きて']
  if (type === Volitional) {
    retval = [polite ? 'きましょう' : 'こよう']
  }

  const validConjugators = [Passive, Causative, Potential]
  const conjugator = getConjugationFunction(type, validConjugators)
  if (conjugator) {
    retval = conjugator('こる', { ...options, pos: VerbIchidan })
  }

  if (type === Imperative) retval = ['こい']
  if (isKanji) retval = retval.map((item) => '来' + item.substring(1))

  if (!retval.length) throw new Error(`conjugate_くる invalid`)

  return retval
}

function conjugate_ある(options: Options): string[] {
  const { affirmative, polite, type } = options
  if (type == Present) {
    if (affirmative && polite) return ['あります']
    if (affirmative && !polite) return ['ある']
    if (!affirmative && polite) return ['ありません', 'ないです']
    if (!affirmative && !polite) return ['ない']
  }
  if (type == Past) {
    if (affirmative && polite) return ['ありました']
    if (affirmative && !polite) return ['あった']
    if (!affirmative && polite) return ['ありませんでした', 'なかったです']
    if (!affirmative && !polite) return ['なかった']
  }
  if (type == Te) return ['あって']
  if (type == Volitional) return [polite ? 'ありましょう' : 'あろう']

  const validConjugators = [Passive, Causative, Imperative]
  const conjugator = getConjugationFunction(type, validConjugators)
  if (conjugator) {
    return conjugator('ある', { ...options, pos: VerbGodan })
  }
  if (type === Potential) {
    // あれる seems to technically be valid but never used.
    // This leaves あれる out of the answer array so people don't
    // enter あれる without ever seeing that ありえる is the common approach.
    if (affirmative && polite) ['ありえます', 'あり得ます']
    // ありうる is only used for the plain form
    if (affirmative && !polite) ['ありえる', 'あり得る', 'ありうる']
    if (!affirmative && polite) return ['ありえません', 'あり得ません']
    if (!affirmative && !polite) return ['ありえない', 'あり得ない']
  }
  throw new Error(`conjugate_ある invalid`)
}

function conjugate_とう(options: Options, isKanji: boolean) {
  const { affirmative, polite, type } = options
  const first = isKanji ? '問' : 'と'
  const plainForm = first + 'う'

  if (type === Present) {
    if (affirmative && polite) return [`${first}います`]
    if (affirmative && !polite) return [`${first}う`]
    if (!affirmative && !polite) return [`${first}わない`]
    if (!affirmative && polite) {
      return [`${first}いません`, `${first}わないです`]
    }
  }
  if (type === Past) {
    if (affirmative && polite) return `${first}いました`
    if (affirmative && !polite) return `${first}うた`
    if (!affirmative && !polite) return `${first}わなかった`
    if (!affirmative && polite) {
      return [`${first}いませんでした`, `${first}わなかったです`]
    }
  }
  if (type == Te) return `${first}うて`
  if (type === Volitional) {
    return polite ? `${first}いましょう` : `${first}おう`
  }

  const validConjugators = [Passive, Causative, Potential, Imperative]
  const conjugator = getConjugationFunction(type, validConjugators)
  if (conjugator) {
    return conjugator(plainForm, { ...options, pos: VerbGodan })
  }
  throw new Error(`conjugate_とう invalid`)
}
