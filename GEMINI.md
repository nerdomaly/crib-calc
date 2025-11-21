# Cribbage Calculator

This project is a Cribbage calculator, designed to compute scores for various card combinations in the game of Cribbage. It provides functionalities to score fifteens, pairs, runs, flushes, and nobs.

## How to Run

1.  **Build the project:**
    ```bash
    yarn build
    ```
    or
    ```bash
    npm run build
    ```

2.  **Start the application:**
    ```bash
    yarn start
    ```
    or
    ```bash
    npm start
    ```

## How to Run Tests

To execute the test suite, use the following command:

```bash
yarn test
```
or
```bash
npm test
```

## Hand Suggestion Feature Implementation Plan

The following is a plan to implement a new feature that suggests the optimal four-card hand to keep from an initial six-card deal, considering both the hand's potential and the impact on the crib.

### Command Usage

The target usage for the new command will be:

```bash
yarn suggest --hand="AC 2S 10D JH KH 5C" --dealer
```
or
```bash
npm run suggest -- --hand="AC 2S 10D JH KH 5C" --dealer
```

The `--dealer` flag will indicate that the user is the dealer, which changes the discard strategy.

### Implementation Steps

1.  **Create a CLI Entry Point:** (Completed)
    *   Develop a script (`src/cli.ts`) to parse command-line arguments, including the six cards and a flag to indicate if the user is the dealer.

2.  **Develop Hand Evaluation Logic:** (Completed)
    *   For each of the 15 possible four-card hands, calculate its "expected score".
    *   The expected score will be the average score of the hand when combined with every possible cut card (from the 46 cards remaining in the deck).
    *   Similarly, calculate the "expected score" of the two discarded cards. A simplified model will be used for this, considering the points the two cards can make on their own (pairs, fifteens) as a proxy for their value in the crib.

3.  **Implement Optimal Hand Strategy:** (Completed)
    *   Create a main function that orchestrates the analysis.
    *   This function will generate all 15 hand/discard combinations.
    *   It will use the evaluation logic to calculate a total expected value for each combination, based on whether the user is the dealer or not:
        *   **As Dealer:** `Total Value = E(hand score) + E(crib score)`
        *   **As Non-Dealer:** `Total Value = E(hand score) - E(crib score)` (to minimize opponent's crib)
    *   The function will identify and return the hand with the highest total expected value.

4.  **Integrate and Test:** (Completed)
    *   Connect the CLI entry point to the analysis logic.
    *   Add a `suggest` script to `package.json`.
    *   Create unit tests to verify the accuracy of the hand evaluation and selection logic using known optimal plays.

5.  **Update Documentation:** (Completed)
    *   This `GEMINI.md` file will be kept up-to-date with the progress of the implementation.