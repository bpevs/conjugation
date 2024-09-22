/**
 * @module
 * Japanese conjugation tool
 */
import conjugateAdj from './conjugate_adj.ts'
import conjugateVerb from './conjugate_verb.ts'
import { isAdjective, isVerb, type Options } from './shared.ts'

export { ConjugationType, type Options, PartOfSpeech } from './shared.ts'

/**
 * Given a word and options, return an array of all valid conjugation results.
 *
 * @example
 * ```ts
 * import conjugate, { ConjugationType, PartOfSpeech } from '@bpev/conjugation/ja'
 * const result = conjugate('あう', {
 *   affirmative: true,
 *   polite: false,
 *   type: ConjugationType.Past,
 *   pos: PartOfSpeech.VerbGodan
 * })
 * assert(result, ['あった']) // true
 * ```
 */
export default function conjugate(chars: string, options: Options): string[] {
  if (isAdjective(options.pos)) return conjugateAdj(chars, options)
  if (isVerb(options.pos)) return conjugateVerb(chars, options)
  throw new Error(`Unsupported conjugation part of speech: ${options.pos}`)
}
