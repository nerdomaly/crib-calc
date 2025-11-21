# Cribbage Calculator

A command-line tool to help with the game of Cribbage. It can score a hand of cards and suggest the optimal hand to keep from a six-card hand.

## Features

*   **Score a hand:** Calculates the score for a given hand of four cards and a cut card, including points for fifteens, pairs, runs, flushes, and nobs.
*   **Suggest optimal hand:** Given a six-card hand, this tool suggests the best four-card hand to keep, considering the potential score of the hand and the value of the two cards discarded to the crib. It adjusts its strategy based on whether you are the dealer.

## Getting Started

### Prerequisites

*   Node.js
*   Yarn or npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/crib-calc.git
    ```
2.  Install dependencies:
    ```bash
    cd crib-calc
    yarn install
    ```
    or
    ```bash
    npm install
    ```
3.  Build the project:
    ```bash
    yarn build
    ```
    or
    ```bash
    npm run build
    ```

## Usage

### Hand Scoring

To score a hand, run the `start` command with the hand and cut card:

```bash
yarn start --hand="5H 5D 5S JC" --cut="5C"
```
or
```bash
npm start -- --hand="5H 5D 5S JC" --cut="5C"
```

### Hand Suggestion

To get a suggestion for the optimal hand to keep, use the `suggest` command with your six-card hand.

```bash
yarn suggest --hand="AC 2S 10D JH KH 5C"
```
or
```bash
npm run suggest -- --hand="AC 2S 10D JH KH 5C"
```

If you are the dealer, add the `--dealer` flag:

```bash
yarn suggest --hand="AC 2S 10D JH KH 5C" --dealer
```
or
```bash
npm run suggest -- --hand="AC 2S 10D JH KH 5C" --dealer
```

## Running Tests

To run the test suite:

```bash
yarn test
```
or
```bash
npm test
```
