from crib_calc.utils.parse_card import parse_card
from crib_calc.scoring.suggest_optimal_hand import suggest_optimal_hand


def _six_cards():
    return [parse_card(s) for s in ["AC", "2S", "10D", "JH", "KH", "5C"]]


def test_suggest_dealer():
    result = suggest_optimal_hand(_six_cards(), is_dealer=True)
    assert len(result["hand"]) == 4
    assert len(result["discard"]) == 2
    assert isinstance(result["total_value"], float)
    assert result["total_value"] > 0


def test_suggest_non_dealer():
    result = suggest_optimal_hand(_six_cards(), is_dealer=False)
    assert len(result["hand"]) == 4
    assert len(result["discard"]) == 2
    assert isinstance(result["total_value"], float)
    assert result["total_value"] > 0
