from crib_calc.card import Card
from crib_calc.rank_map import RANK_MAP
from crib_calc.suit_map import SUIT_MAP


def parse_card(card_str: str) -> Card | None:
    if len(card_str) == 3 and card_str.startswith("10"):
        rank_char = "T"
        suit_char = card_str[2].upper()
    elif len(card_str) == 2:
        rank_char = card_str[0].upper()
        suit_char = card_str[1].upper()
    else:
        return None

    rank_info = RANK_MAP.get(rank_char)
    suit = SUIT_MAP.get(suit_char)

    if rank_info is None or suit is None:
        return None

    rank, value, order = rank_info
    return Card(suit=suit, rank=rank, value=value, order=order)
