from crib_calc.card import Card


def score_nobs(hand: list[Card], common_card: Card) -> int:
    return 1 if any(c.rank == "J" and c.suit == common_card.suit for c in hand) else 0
