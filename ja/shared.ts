export interface Options {
  pos: PartOfSpeech
  type: ConjugationType
  affirmative?: boolean
  polite?: boolean
}

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
