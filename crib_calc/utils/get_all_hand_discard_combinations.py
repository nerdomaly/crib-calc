from crib_calc.card import Card
from crib_calc.utils.get_combinations import get_combinations


def get_all_hand_discard_combinations(
    six_cards: list[Card],
) -> list[dict[str, list[Card]]]:
    result = []
    for hand in get_combinations(six_cards, 4):
        hand_set = {(c.rank, c.suit) for c in hand}
        discard = [c for c in six_cards if (c.rank, c.suit) not in hand_set]
        result.append({"hand": hand, "discard": discard})
    return result
