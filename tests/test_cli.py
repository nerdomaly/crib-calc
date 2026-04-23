import pytest
from cli import parse_args, main


def test_parse_hand_and_dealer_flag():
    args = parse_args(["suggest", "--hand=AC 2S 3D 4H 5C 6S", "--dealer"])
    assert args.command == "suggest"
    assert args.dealer is True
    assert len(args.hand.split()) == 6
    assert args.hand.split()[0] == "AC"
    assert args.hand.split()[5] == "6S"


def test_parse_non_dealer():
    args = parse_args(["suggest", "--hand=AC 2S 3D 4H 5C 6S"])
    assert args.command == "suggest"
    assert args.dealer is False
    assert len(args.hand.split()) == 6


def test_missing_hand_argument():
    with pytest.raises(SystemExit):
        parse_args(["suggest", "--dealer"])


def test_incorrect_card_count(capsys):
    with pytest.raises(SystemExit) as exc_info:
        main(["suggest", "--hand=AC 2S 3D 4H 5C"])
    assert exc_info.value.code == 1
    captured = capsys.readouterr()
    assert "6" in captured.err


def test_invalid_card_string(capsys):
    with pytest.raises(SystemExit) as exc_info:
        main(["suggest", "--hand=AC 2S 3D 4H 5C XX"])
    assert exc_info.value.code == 1
    captured = capsys.readouterr()
    assert "XX" in captured.err


def test_no_command(capsys):
    with pytest.raises(SystemExit) as exc_info:
        main([])
    assert exc_info.value.code == 1
