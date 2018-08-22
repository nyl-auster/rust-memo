# Les difficultés rencontrées chronologiquement dans l'apprentissage de Rust

- la distinction pile et tas - pas de connaissance de ces principes en venant de PHP et JS
- il est préférable de bien maîtriser le binaire pour bien typer les variables (u32, u8)
- devoir appeler iter().enumerable() dans les boucles for
- le chapitre sur string slices m'a semblé confus sur certaines erreurs renvoyées https://doc.rust-lang.org/book/second-edition/ch04-03-slices.html
- les enums, qui ne correspondant pas à ce à quoi je m'attendais (une simple liste de valeurs comme "bleu", "jaune", "rouge") : le fait qu'il soit indispensable de passer par match pour en manipuler les valeurs; le fait qu'il n'est pas évident qu'une variante soit en réalité une collection implicite de structure, d'autant qu'à ce moment du livre, "tuple struct" ou "unit struct" sont des structures pas encore vues.
