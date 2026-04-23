from itertools import combinations
from typing import TypeVar

T = TypeVar("T")


def get_combinations(lst: list[T], size: int) -> list[list[T]]:
    return [list(c) for c in combinations(lst, size)]
