from crib_calc.card import Card
from crib_calc.scoring.score_fifteens import score_fifteens
from crib_calc.scoring.score_pairs import score_pairs


def get_simplified_discard_score(discard: list[Card]) -> int:
    if len(discard) != 2:
        raise ValueError("Discard must contain exactly two cards.")
    return score_fifteens(discard) + score_pairs(discard)
