export type Language = string; // TODO
export type FragmentId = string;

export enum ResearchDomain {
  GENERAL = "general",
}

export enum ExchangePrimacy {
  PRIME = "prime",
  PROBE = "probe",
}

export enum ResponseDemerit {
  UNINFORMATIVE = "uninformative",
  NONRESPONSIVE = "nonresponsive",
  NONE = "none",
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

export enum HighlightType {
  FRAGMENT = "fragment",
  DIALOGUE = "dialogue",
}

export interface OpinionAnalysis {
  sentiment: number;
  datc: any;
}

export interface TranslationAnalysis {
  english_text: string;
  mt_alignments: any[];
  model_name: string;
}

export interface UtteranceFragment {
  source_text: string;
  source_lang: Language;
}

export interface UtteranceFragment_BaseAnalytics extends UtteranceFragment {
  translation?: TranslationAnalysis;
}

export interface DialogueUtterance extends UtteranceFragment {
  // audio?: string;
  // video?: string;
  // image?: string;
  // primacy?: ExchangePrimacy
}

export interface DialogueUtterance_BaseAnalytics
  extends UtteranceFragment_BaseAnalytics,
    DialogueUtterance {
  translation: TranslationAnalysis;
}

export interface Fragment extends UtteranceFragment_BaseAnalytics {
  respondent_id: number;
  exchange_id?: string;
  dialogue_id: string;
  analysis: OpinionAnalysis;
  fragment_id: FragmentId;
  start: number;
  end: number;
}

export interface QuestionUtterance extends DialogueUtterance {}

export interface QuestionUtterance_BaseAnalytics extends QuestionUtterance {}

export interface ExchangeAnalysis {
  demerit: ResponseDemerit;
  model_name: string;
  generated_probe?: string[];
  human_evaluation?: number;
}

export interface DialogueSynthesis {
  source_text: string;
  source_lang: Language;
  fragments: Fragment[];
  model_name: string;
  dialogue_id: string;
  translation: TranslationAnalysis;
  analysis: OpinionAnalysis;
}

export interface Highlight {
  highlight_id: string;
  highlight_type: HighlightType;
  start?: number;
  end?: number;
}

export interface ResponseUtterance extends DialogueUtterance {
  respondent_id: string;
  response_id: string;
}

export interface ResponseUtterance_BaseAnalytics extends ResponseUtterance {
  analysis: OpinionAnalysis;
  fragments: Fragment[];
}

export interface DialogueExchange {
  question_utterance: QuestionUtterance;
  response_utterance: ResponseUtterance;
  respondent_id: number;
  exchange_id: string;
  metadata: { [key: string]: string };
}

export interface DialogueExchange_RealTimeAnalytics extends DialogueExchange {
  analysis: ExchangeAnalysis;
}

export interface DialogueExchange_BaseAnalytics extends DialogueExchange {
  question_utterance: QuestionUtterance;
  response_utterance: ResponseUtterance_BaseAnalytics;
}

export interface DialogueAnalysis {
  synthesis: DialogueSynthesis;
  model_name: string;
  dialogue_id: string;
}

export interface DemeritAnalysis {
  demerit_points: number;
  demerit_rationale: string;
  model_name: string;
}

export interface DialogueMetadata {
  subject: string;
}
export interface Dialogue_Raw {
  // referenced_exchanges: DialogueExchange[]
  exchanges: DialogueExchange[];
  respondent_id: string;
  dialogue_id: string;
  lang_id: Language;
}

export interface Dialogue_RealTimeAnalytics extends Dialogue_Raw {
  exchanges: DialogueExchange_RealTimeAnalytics[];
  demerit: DemeritAnalysis;
}

export interface Dialogue_BaseAnalytics extends Dialogue_Raw {
  exchanges: DialogueExchange_BaseAnalytics[];
  analysis: DialogueAnalysis;
}

export type Dialogue =
  | Dialogue_Raw
  | Dialogue_RealTimeAnalytics
  | Dialogue_BaseAnalytics;

export interface DialogueSetAnalysisGroup {
  members: Highlight[];
  label: string;
  hitl: boolean;
  model_name: string;
  analysis_group_id: string;
}

export interface DialogueSetAnalysis {
  themes: DialogueSetAnalysisGroup[];
  keywords: DialogueSetAnalysisGroup[];
  summary?: string;
  tags?: DialogueSetAnalysisGroup[];
}

export interface QuestionMetadata {
  category: QuestionCategory;
  text_template: string;
  question_id: number;
  referenced_question_ids: number[];
}

export interface DialogueSet_Raw {
  metadata: DialogueMetadata;
  dialogues: Dialogue_Raw[];
  prime_question_metadata: QuestionMetadata;
}

export interface DialogueSet_RealTimeAnalytics extends DialogueSet_Raw {
  dialogues: Dialogue_RealTimeAnalytics[];
}

export interface DialogueSet_BaseAnalytics {
  metedata: DialogueMetadata;
  dialogues: Dialogue_BaseAnalytics[];
  prime_question_metadata: QuestionMetadata;
}

export interface DialogueSet_AggregateAnalytics {
  metadata: DialogueMetadata;
  dialogues: Dialogue_BaseAnalytics;
  prime_question_metadata: QuestionMetadata;
  analysis: DialogueSetAnalysis;
}

export type DialogueSet =
  | DialogueSet_Raw
  | DialogueSet_BaseAnalytics
  | DialogueSet_AggregateAnalytics;

export interface ResearchMetadata {
  objective: string;
  domain: ResearchDomain;
  category: ResearchCategory;
}

export interface ResearchAnalysis {
  model_name: string;
}

export interface ResearchConversationSet {
  metadata: ResearchMetadata;
  dialogue_sets: DialogueSet[];
  analysis: ResearchAnalysis;
  // targets: ConversationalTarget[];
}
