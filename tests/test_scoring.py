import pytest
from crib_calc.utils.parse_card import parse_card
from crib_calc.scoring.score_fifteens import score_fifteens
from crib_calc.scoring.score_flush import score_flush
from crib_calc.scoring.score_nobs import score_nobs
from crib_calc.scoring.score_pairs import score_pairs
from crib_calc.scoring.score_runs import score_runs
from crib_calc.scoring import calculate_cribbage_score
from crib_calc.constants.testing_hands import TESTING_HANDS


def _parse_hand(hand_str: str):
    return [parse_card(s) for s in hand_str.split()]


@pytest.mark.parametrize("entry", TESTING_HANDS, ids=[h["hand"] for h in TESTING_HANDS])
def test_fifteens(entry):
    cards = _parse_hand(entry["hand"])
    assert score_fifteens(cards) == entry["fifteen_score"]


@pytest.mark.parametrize("entry", TESTING_HANDS, ids=[h["hand"] for h in TESTING_HANDS])
def test_flush(entry):
    cards = _parse_hand(entry["hand"])
    # flush uses only the 4-card hand (no common card passed → no 5-card flush)
    assert score_flush(cards) == entry["flush_score"]


@pytest.mark.parametrize("entry", TESTING_HANDS, ids=[h["hand"] for h in TESTING_HANDS])
def test_nobs(entry):
    cards = _parse_hand(entry["hand"])
    assert score_nobs(cards[:4], cards[4]) == entry["nobs_score"]


@pytest.mark.parametrize("entry", TESTING_HANDS, ids=[h["hand"] for h in TESTING_HANDS])
def test_pairs(entry):
    cards = _parse_hand(entry["hand"])
    assert score_pairs(cards) == entry["pair_score"]


@pytest.mark.parametrize("entry", TESTING_HANDS, ids=[h["hand"] for h in TESTING_HANDS])
def test_runs(entry):
    cards = _parse_hand(entry["hand"])
    assert score_runs(cards) == entry["run_score"]


@pytest.mark.parametrize("entry", TESTING_HANDS, ids=[h["hand"] for h in TESTING_HANDS])
def test_total_score(entry):
    cards = _parse_hand(entry["hand"])
    expected = (
        entry["fifteen_score"]
        + entry["flush_score"]
        + entry["nobs_score"]
        + entry["pair_score"]
        + entry["run_score"]
    )
    result = calculate_cribbage_score(cards[:4], cards[4])
    assert result["total_score"] == expected
