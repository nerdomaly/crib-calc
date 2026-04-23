from crib_calc.card import Card, CardRank, CardSuit
from crib_calc.rank_map import RANK_MAP
from crib_calc.suit_map import SUIT_MAP

_RANK_CHARS: list[str] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"]
_SUIT_CHARS: list[str] = ["C", "D", "H", "S"]


def generate_deck() -> list[Card]:
    deck: list[Card] = []
    for suit_char in _SUIT_CHARS:
        for rank_char in _RANK_CHARS:
            rank, value, order = RANK_MAP[rank_char]
            suit = SUIT_MAP[suit_char]
            deck.append(Card(suit=suit, rank=rank, value=value, order=order))
    return deck
