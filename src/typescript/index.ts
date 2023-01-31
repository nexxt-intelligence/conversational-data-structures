export class OpinionAnalysis {
  sentiment: number;
  datc: any;
  // dummy constructor
  constructor() {}
}

export class TranslationAnalysis {
  english_text: string;
  mt_alignments: any[];
  model_name: string;
  // dummy constructor
  constructor() {}
}

export enum ResearchDomain {
  TODO = "todo",
}

export enum ExchangePrimacy {
  PRIME = "prime",
  PROBE = "probe",
}

export enum ResponseDemerit {
  UNINFORMATIVE = "uninformative",
  NONRESPONSIVE = "nonresponsive",
}

export enum ResearchCategory {
  CX = "customer_experience",
  UA = "usage_and_attitude",
  AD = "ad_or_offer",
  BR = "branding",
}

export enum QuestionCategory {
  SFA = "spontaneous_free_association(s)",
  EXA = "example(s)",
  EXP = "explanation(s)",
  MSG = "key_message(s)",
  EMO = "emotional reaction(s)",
  INT = "interpretation(s)",
  SUG = "suggestion(s)",
  CAT = "categorical",
  CMP = "comparative",
  GEN = "generic",
}

export enum PolarityType {
  POS = "positive",
  NEG = "negative",
  AMB = "ambiguous",
}

export class ConversationalBase {
  /* Base for all data structures at the single respondent level. */
  id: string | number;
  respondent_id: string;
  hitl: boolean;
  // dummy constructor
  constructor() {}
}

export class ConversationalTarget {
  todo: string;
  // dummy constructor
  constructor() {}
}

export class ChunkAnalysis {
  data: any;
  model_name: string;
  // dummy constructor
  constructor() {}
}

export class ResponseUtteranceChunk {
  english_text: string;
  source_text: string;
  source_lang: string;
  analysis: ChunkAnalysis;
  // dummy constructor
  constructor() {}
}

export class ResponseUtteranceAnalysis {
  polarity: string;
  utterance_chunks: ResponseUtteranceChunk[];
  // dummy constructor
  constructor() {}
}

export class ResearchMetadata {
  objective: string;
  domain: ResearchDomain;
  category: ResearchCategory;
  // dummy constructor
  constructor() {}
}

export class DialogueMetadata {
  subject: string;
  // dummy constructor
  constructor() {}
}

export class UtteranceFragment {
  source_text: string;
  source_lang: string;
  translation?: TranslationAnalysis;
}

export class ResponseUtteranceFragment {
  respondent_id: string;
  response_id: string;
  analysis: OpinionAnalysis;

  constructor(UtteranceFragment: UtteranceFragment) {}
}

export class OpinionFragment {
  /*
    A part of an opinion, whether stated verbatim or synthesized.
    OpinionFragments always correspond to a particular respondent_id and
    dialogue_id, but may or may not correspond to a particular exchange_id.
    */
  respondent_id: number;
  exchange_id?: string;
  dialogue_id: string;
  analysis: OpinionAnalysis;

  constructor(UtteranceFragment: UtteranceFragment) {}
}

export class DialogueUtterance {
  /*
   A single utterance within a dialogue, and its analysis.
    */
  audio?: string;
  video?: string;
  image?: string;
  primacy: ExchangePrimacy; // could be replaced with `depth: int`?
  // analysis: UtteranceAnalysis
  constructor(UtteranceFragment: UtteranceFragment) {}
}

export class ExchangeAnalysis {
  demerit: ResponseDemerit;
  model_name: string;
  // dummy constructor
  constructor() {}
}

export class QuestionUtterance {
  /*
  A question posed by the interviewer.
    */
  // pass?
}

export class ResponseUtterance {
  /* 
    An utterance given by a respondent in response to a question.
    */
  fragments: OpinionFragment[];
  // analysis: ResponseUtteranceAnalysis
  constructor(
    DialogueUtterance: DialogueUtterance,
    ResponseUtteranceFragment: ResponseUtteranceFragment
  ) {}
}

export class DialogueExchange {
  /* 
    A single exchange between interviewer and respondent, consisting of the uttered question
    and the uttered response, along with analysis thereof.
    */
  question: QuestionUtterance;
  utterance: ResponseUtterance;
  analysis: ExchangeAnalysis;
  respondent_id: number;
  exchange_id: string;
  // dummy constructor
  constructor() {}
}

export class DialogueSynthesis {
  synthesis: string;
  fragments: OpinionFragment[];
  model_name: string;
  dialogue_id: string;

  // dummy constructor
  constructor() {}
}

export class DialogueAnalysis {
  demerit_points: number;
  synthesis: DialogueSynthesis;
  model_name: string;
  dialogue_id: string;

  // dummy constructor
  constructor() {}
}

export class Dialogue {
  /* 
    A set of exchanges between interviewer and a particular respondent.
    */
  referenced_exchanges: DialogueExchange[];
  exchanges: DialogueExchange[];
  respondent_id: number;
  dialogue_id: string;
  analysis: DialogueAnalysis;

  // dummy constructor
  constructor() {}
}

export class QuestionMetadata {
  category: QuestionCategory;
  text_template: string;
  question_id: number;
  referenced_question_ids: number[];

  // dummy constructor
  constructor() {}
}

export class DialogueSetAnalysisGroup {
  members: OpinionFragment[];
  // members: List[Union[ResponseUtteranceChunk, DialogueExchange]]
  label: string;
  hitl: boolean;
  model_name: string;

  // dummy constructor
  constructor() {}
}

export class DialogueSetAnalysis {
  themes: DialogueSetAnalysisGroup[];
  keywords: DialogueSetAnalysisGroup[];
  summary?: string;
  tags?: DialogueSetAnalysisGroup[];

  // dummy constructor
  constructor() {}
}

export class DialogueSet {
  /*
    All of the data corresponding to a single prime question.
    Consists of a set of Dialogues, one per respondent, with a shared prime_question_metadata.
    */
  // type: DialogueType
  metadata: DialogueMetadata;
  // prime_question: DialogueQuestion
  dialogues: Dialogue[];
  analysis: DialogueSetAnalysis;
  prime_question_metadata: QuestionMetadata;
  // utterance: DialogueUtterance

  // dummy constructor
  constructor() {}
}

export class ResearchAnalysis {
  todo: string;
  model_name: string;

  // dummy constructor
  constructor() {}
}

export class OpinionGraph {
  // dummy constructor
  constructor() {}
}

export class ResearchConversationSet {
  /* 
    A research conversation between an interviewer and a respondent.
    Attributes:
        metadata (ResearchMetadata): TODO
    */

  metadata: ResearchMetadata;
  dialogue_sets: DialogueSet[];
  opinion_graph_set: OpinionGraph[];
  targets: ConversationalTarget[];
  analysis: ResearchAnalysis;

  // dummy constructor
  constructor() {}
}
