# Cribbage Calculator

A command-line tool to help with the game of Cribbage. It can score a hand of cards and suggest the optimal hand to keep from a six-card hand.

## Features

- **Score a hand:** Calculates the score for a given hand of four cards and a cut card, including points for fifteens, pairs, runs, flushes, and nobs.
- **Suggest optimal hand:** Given a six-card hand, suggests the best four cards to keep, considering the expected hand score across all possible cut cards and the value of the two discarded cards to the crib.

## Setup

```bash
python3 -m venv venv
source venv/bin/activate
pip install -e ".[dev]"
```

## Usage

Card format: rank + suit initial. Rank is `A 2–9 10 J Q K`, suit is `C D H S`.  
Examples: `AS` (Ace of Spades), `10H` (Ten of Hearts), `JC` (Jack of Clubs).

### Suggest optimal hand

```bash
python cli.py suggest --hand="AC 2S 10D JH KH 5C"
```

Add `--dealer` if you are the dealer (crib cards count in your favour):

```bash
python cli.py suggest --hand="AC 2S 10D JH KH 5C" --dealer
```

## Running Tests

```bash
venv/bin/pytest
```

Run a single test file:

```bash
venv/bin/pytest tests/test_scoring.py -v
```
