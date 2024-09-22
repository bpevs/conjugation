import { dropLast } from '../shared/text.ts'
import irregular from './conjugate_irregular_verb.ts'
import { ConjugationType, Options, PartOfSpeech } from './shared.ts'

const { VerbGodan, VerbIchidan, VerbIrregular, Verbする } = PartOfSpeech
const {
  Past,
  Present,
  Passive,
  Causative,
  Potential,
  Imperative,
  Volitional,
  Te,
} = ConjugationType

export default function conjugate(chars: string, options: Options): string[] {
  if (options.type === Past) return past(chars, options)
  if (options.type === Present) return present(chars, options)
  if (options.type === Passive) return passive(chars, options)
  if (options.type === Causative) return causative(chars, options)
  if (options.type === Potential) return potential(chars, options)
  if (options.type === Imperative) return imperative(chars, options)
  if (options.type === Volitional) return volitional(chars, options)
  if (options.type === Te) return te(chars, options)
  throw new Error(`Unsupported conjugation type: ${options.type}`)
}

export function present(chars: string, options: Options): string[] {
  const { affirmative, polite, pos } = options
  const stem = masuStem(chars, pos)
  const plainNegative = plainNegativeComplete(chars, pos)

  if ([Verbする, VerbIrregular].includes(pos)) return irregular(chars, options)
  if (affirmative && !polite) return [chars]
  if (affirmative && polite) return [stem + 'ます']
  if (!affirmative && polite) return [stem + 'ません', plainNegative + 'です']
  if (!affirmative && !polite) return [plainNegative]
  throw new Error(`present invalid`)
}

export function past(chars: string, options: Options): string[] {
  const { affirmative, polite, pos } = options
  const last = chars.charAt(chars.length - 1)
  const stem = masuStem(chars, pos)
  const plainNegative = plainNegativeComplete(chars, pos)
  const plainNegativePast = dropLast(plainNegative) + 'かった'
  if ([Verbする, VerbIrregular].includes(pos)) return irregular(chars, options)
  if (affirmative && polite) return [stem + 'ました']
  if (!affirmative && !polite) return [dropLast(plainNegative) + 'かった']
  if (!affirmative && polite) {
    return [stem + 'ませんでした', plainNegativePast + 'です']
  }
  if (affirmative && !polite && pos == VerbIchidan) return [stem + 'た']
  if (affirmative && !polite && pos == VerbGodan) {
    return [dropLast(chars) + changeToPastPlain(last)]
  }
  throw new Error(`verbPast invalid`)
}

export function te(chars: string, options: Options): string[] {
  const { pos } = options
  if ([Verbする, VerbIrregular].includes(pos)) {
    return irregular(chars, { ...options, affirmative: false, polite: false })
  }
  if (pos == VerbIchidan) return [masuStem(chars, pos) + 'て']
  if (pos == VerbGodan) {
    const short = dropLast(chars)
    const last = chars.charAt(chars.length - 1)
    if (last == 'く') return [short + 'いて']
    if (last == 'ぐ') return [short + 'いで']
    if (last == 'す') return [short + 'して']
    if (['う', 'つ', 'る'].includes(last)) return [short + 'って']
    if (['む', 'ぶ', 'ぬ'].includes(last)) return [short + 'んで']
  }
  throw new Error(`te invalid`)
}

export function volitional(chars: string, options: Options): string[] {
  const { pos, polite } = options
  const stem = masuStem(chars, pos)
  const last = chars.charAt(chars.length - 1)
  const short = dropLast(chars)

  if ([Verbする, VerbIrregular].includes(pos)) {
    return irregular(chars, { ...options, affirmative: false })
  }
  if (polite) return [stem + 'ましょう']
  if (pos === VerbIchidan) return [stem + 'よう']
  if (pos === VerbGodan) return [short + changeUtoO(last) + 'う']
  throw new Error(`volitional invalid`)
}

export function passive(chars: string, options: Options): string[] {
  const { pos, affirmative, polite } = options
  const last = chars.charAt(chars.length - 1)
  const verbEndingWithA = dropLast(chars) + changeUtoA(last)

  if ([Verbする, VerbIrregular].includes(pos)) return irregular(chars, options)
  if (affirmative && polite) return [verbEndingWithA + 'れます']
  if (affirmative && !polite) return [verbEndingWithA + 'れる']
  if (!affirmative && polite) return [verbEndingWithA + 'れません']
  if (!affirmative && !polite) return [verbEndingWithA + 'れない']
  throw new Error(`passive invalid`)
}

export function causative(chars: string, options: Options): string[] {
  const { pos, affirmative, polite } = options
  const short = dropLast(chars)
  const last = chars.charAt(chars.length - 1)

  if ([Verbする, VerbIrregular].includes(pos)) return irregular(chars, options)

  let verbCausativeRoot
  if (pos === VerbIchidan) {
    verbCausativeRoot = short + 'さ'
  } else if (pos === VerbGodan) {
    verbCausativeRoot = short + changeUtoA(last)
  }

  if (affirmative && polite) return [verbCausativeRoot + 'せます']
  if (affirmative && !polite) return [verbCausativeRoot + 'せる']
  if (!affirmative && polite) return [verbCausativeRoot + 'せません']
  if (!affirmative && !polite) return [verbCausativeRoot + 'せない']
  throw new Error(`causative invalid`)
}

export function potential(chars: string, options: Options): string[] {
  const { pos, affirmative, polite } = options
  const short = dropLast(chars)
  const last = chars.charAt(chars.length - 1)

  if (pos === VerbIrregular) return irregular(chars, options)

  const roots = []
  if (pos === VerbGodan) {
    roots.push(short + changeUtoE(last))
  } else if (pos === VerbIchidan) {
    roots.push(short + 'られ') // default spelling "られる" is correct
    roots.push(short + 'れ') // also allow common shotened version "れる"
  }
  if (affirmative && polite) return roots.map((r) => r + 'ます')
  if (affirmative && !polite) return roots.map((r) => r + 'る')
  if (!affirmative && polite) return roots.map((r) => r + 'ません')
  if (!affirmative && !polite) return roots.map((r) => r + 'ない')
  throw new Error(`potential invalid`)
}

export function imperative(chars: string, options: Options): string[] {
  const { pos } = options
  const short = dropLast(chars)
  const last = chars.charAt(chars.length - 1)

  // よ seems to be used as ending only in written Japanese; still allow
  if (pos === VerbIchidan) return [short + 'ろ', short + 'よ']
  if (pos === VerbGodan) return [short + changeUtoE(last)]
  if (pos === VerbIrregular) {
    return irregular(chars, { ...options, affirmative: false, polite: false })
  }
  throw new Error(`imperative invalid`)
}

// る is dropped for ichidan, う goes to い for godan
function masuStem(chars: string, pos: PartOfSpeech): string {
  const rest = chars.substring(0, chars.length - 1)
  const last = chars.charAt(chars.length - 1)
  return pos == VerbGodan ? rest + changeUtoI(last) : rest
}

// used by present plain negative and past plain negative
function plainNegativeComplete(chars: string, pos: PartOfSpeech): string {
  const rest = chars.substring(0, chars.length - 1)
  const last = chars.charAt(chars.length - 1)
  return pos == VerbGodan ? rest + changeUtoA(last) + 'ない' : rest + 'ない'
}

function changeToPastPlain(c: string): string {
  if (c == 'す') return 'した'
  if (c == 'く') return 'いた'
  if (c == 'ぐ') return 'いだ'
  if (['む', 'ぶ', 'ぬ'].includes(c)) return 'んだ'
  if (['る', 'う', 'つ'].includes(c)) return 'った'
  throw new Error(`input was not real verb ending: ${c}`)
}

function changeUtoA(c: string): string {
  if (c === 'う') return 'わ'
  if (c === 'く') return 'か'
  if (c === 'ぐ') return 'が'
  if (c === 'す') return 'さ'
  if (c === 'ず') return 'ざ'
  if (c === 'つ') return 'た'
  if (c === 'づ') return 'だ'
  if (c === 'ぬ') return 'な'
  if (c === 'ふ') return 'は'
  if (c === 'ぶ') return 'ば'
  if (c === 'ぷ') return 'ぱ'
  if (c === 'む') return 'ま'
  if (c === 'る') return 'ら'
  throw new Error(`input was not う in changeUtoA: ${c}`)
}

export function changeUtoE(c: string): string {
  if (c === 'う') return 'え'
  if (c === 'く') return 'け'
  if (c === 'ぐ') return 'げ'
  if (c === 'す') return 'せ'
  if (c === 'ず') return 'ぜ'
  if (c === 'つ') return 'て'
  if (c === 'づ') return 'で'
  if (c === 'ぬ') return 'ね'
  if (c === 'ふ') return 'へ'
  if (c === 'ぶ') return 'べ'
  if (c === 'ぷ') return 'ぺ'
  if (c === 'む') return 'め'
  if (c === 'る') return 'れ'
  throw new Error(`input was not う in changeUtoE: ${c}`)
}

function changeUtoI(c: string): string {
  if (c == 'う') return 'い'
  if (c === 'く') return 'き'
  if (c === 'ぐ') return 'ぎ'
  if (c === 'す') return 'し'
  if (c === 'ず') return 'じ'
  if (c === 'つ') return 'ち'
  if (c === 'づ') return 'ぢ'
  if (c === 'ぬ') return 'に'
  if (c === 'ふ') return 'ひ'
  if (c === 'ぶ') return 'び'
  if (c === 'ぷ') return 'ぴ'
  if (c === 'む') return 'み'
  if (c === 'る') return 'り'
  throw new Error(`input was not う in changeUtoI: ${c}`)
}

function changeUtoO(c: string): string {
  if (c === 'う') return 'お'
  if (c === 'く') return 'こ'
  if (c === 'ぐ') return 'ご'
  if (c === 'す') return 'そ'
  if (c === 'ず') return 'ぞ'
  if (c === 'つ') return 'と'
  if (c === 'づ') return 'ど'
  if (c === 'ぬ') return 'の'
  if (c === 'ふ') return 'ほ'
  if (c === 'ぶ') return 'ぼ'
  if (c === 'ぷ') return 'ぽ'
  if (c === 'む') return 'も'
  if (c === 'る') return 'ろ'
  throw new Error(`input was not う in changeUtoO: ${c}`)
}
