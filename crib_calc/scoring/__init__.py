from crib_calc.card import Card
from crib_calc.scoring.score_fifteens import score_fifteens
from crib_calc.scoring.score_flush import score_flush
from crib_calc.scoring.score_nobs import score_nobs
from crib_calc.scoring.score_pairs import score_pairs
from crib_calc.scoring.score_runs import score_runs


def calculate_cribbage_score(
    hand: list[Card],
    common_card: Card | None = None,
    is_crib: bool = False,
) -> dict:
    all_cards = hand + ([common_card] if common_card is not None else [])

    fifteens = score_fifteens(all_cards)
    pairs = score_pairs(all_cards)
    runs = score_runs(all_cards)
    flush = score_flush(hand, common_card, is_crib)
    nobs = score_nobs(hand, common_card) if common_card is not None else 0

    return {
        "total_score": fifteens + pairs + runs + flush + nobs,
        "breakdown": {
            "fifteens": fifteens,
            "pairs": pairs,
            "runs": runs,
            "flush": flush,
            "nobs": nobs,
        },
    }
