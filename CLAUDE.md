# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
venv/bin/pytest                            # run all tests
venv/bin/pytest tests/test_scoring.py -v  # run a single test file
python cli.py suggest --hand="AC 2S 10D JH KH 5C" [--dealer]
```

Activate the venv first with `source venv/bin/activate`, or prefix commands with `venv/bin/`.

Card format for CLI: rank + suit initial, e.g. `AS` (Ace of Spades), `10H` (Ten of Hearts), `JC`.

## Architecture

Python project with a local `venv/`. No runtime dependencies — stdlib only. Tests use `pytest`.

**Entry point:** `cli.py` — `argparse`-based CLI with a `suggest` subcommand.

**Package:** `crib_calc/`

**Core data flow for `suggest`:**
1. `parse_card` converts string tokens to `Card` dataclass objects (rank, suit, value for 15s, order for runs)
2. `get_all_hand_discard_combinations` generates all 15 ways to choose 4 cards from 6
3. For each combination, `get_expected_hand_score` averages scores across all 46 possible cut cards; `get_simplified_discard_score` estimates crib value of the 2 discards
4. `suggest_optimal_hand` picks the combination maximizing `E(hand) + E(crib)` as dealer or `E(hand) - E(crib)` as non-dealer

**Scoring modules** (`crib_calc/scoring/`): `score_fifteens`, `score_pairs`, `score_runs`, `score_flush`, `score_nobs` are all composed by `calculate_cribbage_score` in `crib_calc/scoring/__init__.py`. Flush scoring requires the 4-card hand separately from the cut card because crib flush rules differ (must be all 5 cards including cut).

**Card representation:** `value` is capped at 10 for face cards (used in fifteens), while `order` reflects true rank order (J=11, Q=12, K=13) for run detection.
