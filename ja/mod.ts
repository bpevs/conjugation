import conjugateAdj from './conjugate_adj.ts'
import conjugateVerb from './conjugate_verb.ts'
import { isAdjective, isVerb, Options } from './shared.ts'

export { ConjugationType, type Options, PartOfSpeech } from './shared.ts'

export default function conjugate(chars: string, options: Options): string[] {
  if (isAdjective(options.pos)) return conjugateAdj(chars, options)
  if (isVerb(options.pos)) return conjugateVerb(chars, options)
  throw new Error(`Unsupported conjugation part of speech: ${options.pos}`)
}
