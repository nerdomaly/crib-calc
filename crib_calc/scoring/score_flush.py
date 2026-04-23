from crib_calc.card import Card


def score_flush(
    hand: list[Card],
    common_card: Card | None = None,
    is_crib: bool = False,
) -> int:
    first_suit = hand[0].suit
    hand_flush = all(c.suit == first_suit for c in hand)

    if hand_flush and common_card is not None and common_card.suit == first_suit:
        return 5
    if hand_flush and not is_crib:
        return 4
    return 0
