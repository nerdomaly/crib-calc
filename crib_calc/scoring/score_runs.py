from crib_calc.card import Card


def _find_all_run_permutations(cards: list[Card]) -> list[list[Card]]:
    if len(cards) != 5:
        return []

    # Deduplicate by order, keeping one representative per order value
    seen: dict[int, Card] = {}
    for c in cards:
        seen[c.order] = c
    unique_sorted = sorted(seen.values(), key=lambda c: c.order)

    # Find the longest consecutive run among unique orders
    longest_run: list[Card] = []
    n = len(unique_sorted)
    for i in range(n):
        for j in range(i, n):
            slc = unique_sorted[i : j + 1]
            is_run = len(slc) >= 3 and all(
                slc[k].order == slc[k - 1].order + 1 for k in range(1, len(slc))
            )
            if is_run and len(slc) > len(longest_run):
                longest_run = slc

    if not longest_run:
        return []

    # Group all original cards by the order values present in the longest run
    run_orders = {c.order for c in longest_run}
    by_order: dict[int, list[Card]] = {c.order: [] for c in longest_run}
    for card in cards:
        if card.order in run_orders:
            by_order[card.order].append(card)

    # Generate all permutations (one card chosen per rank in the run)
    all_perms: list[list[Card]] = []
    sorted_orders = sorted(run_orders)

    def build(idx: int, current: list[Card]) -> None:
        if idx == len(sorted_orders):
            all_perms.append(current)
            return
        for card in by_order[sorted_orders[idx]]:
            build(idx + 1, current + [card])

    build(0, [])
    return all_perms


def score_runs(cards: list[Card]) -> int:
    if len(cards) != 5:
        return 0
    return sum(len(run) for run in _find_all_run_permutations(cards) if len(run) >= 3)
