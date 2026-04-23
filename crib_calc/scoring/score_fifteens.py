from crib_calc.card import Card
from crib_calc.utils.get_combinations import get_combinations


def score_fifteens(all_cards: list[Card]) -> int:
    score = 0
    for size in range(2, len(all_cards) + 1):
        for combo in get_combinations(all_cards, size):
            if sum(c.value for c in combo) == 15:
                score += 2
    return score
