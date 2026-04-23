from crib_calc.card import Card
from crib_calc.utils.get_combinations import get_combinations


def score_pairs(all_cards: list[Card]) -> int:
    score = 0
    for a, b in get_combinations(all_cards, 2):
        if a.rank == b.rank:
            score += 2
    return score
