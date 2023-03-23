from dataclasses import dataclass
from enum import Enum
from typing import List, Optional, Any, Union, Dict
# from langcodes import Language
from typing import NewType

FragmentId = NewType("FragmentId", str)
"""A fragment can be a real or synthesized part of a text, uniquely defined by this id."""

Language = NewType("Language", str)
"""A language id."""

class ResearchDomain(Enum):
    GENERAL = "general"

class ExchangePrimacy(Enum):
    PRIME = "prime"
    PROBE = "probe"


class ResponseDemerit(Enum):
    UNINFORMATIVE = "uninformative"
    NONRESPONSIVE = "nonresponsive"
    NONE = "none"


class ResearchCategory(Enum):
    CX = "customer_experience"
    UA = "usage_and_attitude"
    AD = "ad_or_offer"
    BR = "branding"


class QuestionCategory(Enum):
    SFA = "spontaneous_free_association(s)"
    EXA = "example(s)"
    EXP = "explanation(s)"
    MSG = "key_message(s)"
    EMO = "emotional reaction(s)"
    INT = "interpretation(s)"
    SUG = "suggestion(s)"
    CAT = "categorical"
    CMP = "comparative"
    GEN = "generic"


class PolarityType(Enum):
    POS = "positive"
    NEG = "negative"
    AMB = "ambiguous"


class HighlightType(Enum):
    DIALOGUE_SYNTHESIS = "dialogue_synthesis"
    FRAGMENT = "fragment"

@dataclass
class OpinionAnalysis:
    sentiment: float
    datc: Any


@dataclass
class TranslationAnalysis:
    english_text: str
    mt_alignments: List[Any]
    model_name: str


@dataclass
class UtteranceFragment:
    source_text: str
    source_lang: Language


@dataclass
class UtteranceFragment_BaseAnalytics(UtteranceFragment):
    translation: Optional[TranslationAnalysis]


@dataclass
class DialogueUtterance(UtteranceFragment):
    pass
    # audio: Optional[str]
    # video: Optional[str]
    # image: Optional[str]
    # primacy: Optional[ExchangePrimacy]  # could be replaced with `depth: int`?


@dataclass
class DialogueUtterance_BaseAnalytics(
    UtteranceFragment_BaseAnalytics, DialogueUtterance
):
    translation: TranslationAnalysis


@dataclass
class Fragment(UtteranceFragment_BaseAnalytics):
    respondent_id: str
    exchange_id: Optional[str]
    dialogue_id: str
    analysis: OpinionAnalysis
    fragment_id: FragmentId
    start: int
    end: int


@dataclass
class QuestionUtterance(DialogueUtterance):

    pass


@dataclass
class QuestionUtterance_BaseAnalytics(DialogueUtterance_BaseAnalytics):

    pass


@dataclass
class ExchangeAnalysis:
    demerit: ResponseDemerit
    model_name: str
    generated_probes: Optional[List[str]]
    human_evaluation: Optional[int]


@dataclass
class DialogueSynthesis:
    source_text: str
    source_lang: Language
    fragments: List[Fragment]
    model_name: str
    dialogue_id: str
    translation: TranslationAnalysis
    analysis: OpinionAnalysis


@dataclass
class Highlight:
    """Fragment or DialogueSynthesis Highlight"""

    highlight_id: str
    highlight_type: HighlightType
    start: Optional[int]
    end: Optional[int]


@dataclass
class ResponseUtterance(DialogueUtterance):

    respondent_id: str
    response_id: str


@dataclass
class ResponseUtterance_BaseAnalytics(
    DialogueUtterance_BaseAnalytics, ResponseUtterance
):

    analysis: OpinionAnalysis
    fragments: List[Fragment]


@dataclass
class DialogueExchange:
    question_utterance: QuestionUtterance
    response_utterance: ResponseUtterance
    respondent_id: str
    exchange_id: str
    metadata: Dict[str, str]


@dataclass
class DialogueExchange_RealTimeAnalytics(DialogueExchange):
    analysis: ExchangeAnalysis


@dataclass
class DialogueExchange_BaseAnalytics(DialogueExchange):
    question_utterance: QuestionUtterance_BaseAnalytics
    response_utterance: ResponseUtterance_BaseAnalytics


@dataclass
class DialogueAnalysis:
    synthesis: DialogueSynthesis
    model_name: str
    dialogue_id: str


@dataclass
class DemeritAnalysis:
    demerit_points: int
    demerit_rationale: str
    model_name: str


@dataclass
class DialogueMetadata:
    subject: str


@dataclass
class Dialogue_Raw:
    # referenced_exchanges: List[DialogueExchange]
    exchanges: List[DialogueExchange]
    respondent_id: str
    dialogue_id: str
    lang_id: str


@dataclass
class Dialogue_RealTimeAnalytics(Dialogue_Raw):
    exchanges: List[DialogueExchange_RealTimeAnalytics]
    demerit: DemeritAnalysis


@dataclass
class Dialogue_BaseAnalytics(Dialogue_Raw):
    exchanges: List[DialogueExchange_BaseAnalytics]
    analysis: DialogueAnalysis


Dialogue = Union[Dialogue_Raw, Dialogue_RealTimeAnalytics, Dialogue_BaseAnalytics]


@dataclass
class DialogueSetAnalysisGroup:

    members: List[Highlight]
    label: str
    hitl: bool
    model_name: str
    analysis_group_id: str


@dataclass
class DialogueSetAnalysis:
    themes: List[DialogueSetAnalysisGroup]
    keywords: List[DialogueSetAnalysisGroup]
    summary: Optional[str]
    tags: Optional[List[DialogueSetAnalysisGroup]]


@dataclass
class QuestionMetadata:
    category: QuestionCategory
    text_template: str
    question_id: int
    referenced_question_ids: List[int]


@dataclass
class DialogueSet_Raw:
    metadata: DialogueMetadata
    dialogues: List[Dialogue_Raw]
    prime_question_metadata: QuestionMetadata


@dataclass
class DialogueSet_RealTimeAnalytics(DialogueSet_Raw):
    dialogues: List[Dialogue_RealTimeAnalytics]


@dataclass
class DialogueSet_BaseAnalytics(DialogueSet_Raw):
    dialogues: List[Dialogue_BaseAnalytics]


@dataclass
class DialogueSet_AggregateAnalytics(DialogueSet_BaseAnalytics):
    dialogues: List[Dialogue_BaseAnalytics]
    analysis: DialogueSetAnalysis


DialogueSet = Union[
    DialogueSet_Raw, DialogueSet_BaseAnalytics, DialogueSet_AggregateAnalytics
]


@dataclass
class ResearchMetadata:
    objective: str
    domain: ResearchDomain
    category: ResearchCategory


@dataclass
class ResearchAnalysis:
    model_name: str

@dataclass
class ResearchConversationSet:
    metadata: ResearchMetadata
    dialogue_sets: List[DialogueSet]
    analysis: ResearchAnalysis
    # targets: List[ConversationalTarget]
