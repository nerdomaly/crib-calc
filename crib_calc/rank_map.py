from crib_calc.card import CardRank

# Maps single-char keys to (rank, value, order). "T" maps to rank "10".
RANK_MAP: dict[str, tuple[CardRank, int, int]] = {
    "A": ("A",   1,  1),
    "2": ("2",   2,  2),
    "3": ("3",   3,  3),
    "4": ("4",   4,  4),
    "5": ("5",   5,  5),
    "6": ("6",   6,  6),
    "7": ("7",   7,  7),
    "8": ("8",   8,  8),
    "9": ("9",   9,  9),
    "T": ("10", 10, 10),
    "J": ("J",  10, 11),
    "Q": ("Q",  10, 12),
    "K": ("K",  10, 13),
}
