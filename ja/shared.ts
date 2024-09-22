/**
 * @description
 * The switches that deterine the conjugation transformations to the chars
 */
export interface Options {
  /** Part of Speech of the chars **/
  pos: PartOfSpeech
  /** The type of conjugation to perform on the chars **/
  type: ConjugationType
  /** Whether we should conjugate to a positive or negative form **/
  affirmative?: boolean
  /** Whether we should conjugate to a casual or polite form **/
  polite?: boolean
}

/**
 * @description
 * The supported targets for conjugation
 */
export enum ConjugationType {
  Present = 'Present',
  Past = 'Past',
  Te = 'Te',
  Adverb = 'Adverb',
  Causative = 'Causative',
  Imperative = 'Imperative',
  Passive = 'Passive',
  Potential = 'Potential',
  Volitional = 'Volitional',
}

/**
 * @description
 * The supported parts of speech for input
 */
export enum PartOfSpeech {
  Adjective = 'Adjective',
  Adjectiveな = 'Adjectiveな',
  Adjectiveの = 'Adjectiveの',
  Adjectiveい = 'Adjectiveい',
  AdjectiveIrregular = 'AdjectiveIrregular',
  Verbする = 'Verbする',
  VerbGodan = 'VerbGodan',
  VerbIchidan = 'VerbIchidan',
  VerbIrregular = 'VerbIrregular',
}

export function isAdjective(pos: PartOfSpeech): boolean {
  return [
    PartOfSpeech.Adjective,
    PartOfSpeech.Adjectiveな,
    PartOfSpeech.Adjectiveの,
    PartOfSpeech.Adjectiveい,
    PartOfSpeech.AdjectiveIrregular,
  ].includes(pos)
}

export function isVerb(pos: PartOfSpeech): boolean {
  return [
    PartOfSpeech.Verbする,
    PartOfSpeech.VerbGodan,
    PartOfSpeech.VerbIchidan,
    PartOfSpeech.VerbIrregular,
  ].includes(pos)
}
