from dataclasses import dataclass
from typing import Literal

CardSuit = Literal["Clubs", "Diamonds", "Hearts", "Spades"]
CardRank = Literal["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]


@dataclass(frozen=True)
class Card:
    suit: CardSuit
    rank: CardRank
    value: int   # capped at 10 for face cards, used for fifteens
    order: int   # true rank order (J=11, Q=12, K=13), used for runs
