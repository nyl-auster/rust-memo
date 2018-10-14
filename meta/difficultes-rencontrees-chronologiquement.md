# Les points qui ont posé questions, chronologiquement, dans l'apprentissage de Rust en venant de PHP / JS

## En lisant le guide

- Les strings : String::from(), &str ou format!() ? 

- la distinction pile et tas - je n'avais pas de connaissance de ces principes en venant de PHP et JS

- être très à l'aise avec le binaire pour bien comprendre le typage les variables (u32, u8) et le bas niveau d'une manière générale.

- pourquoi la syntaxe iter().enumerable() dans les boucles for  ?

- le chapitre sur string slices m'a semblé confus sur certaines erreurs renvoyées https://doc.rust-lang.org/book/second-edition/ch04-03-slices.html

- les enums, qui ne correspondant pas à ce à quoi je m'attendais (une simple liste de valeurs comme "bleu", "jaune", "rouge") : le fait qu'il soit indispensable de passer par match pour en manipuler les valeurs; le fait qu'il n'est pas évident qu'une variante soit en réalité une collection implicite de structures, d'autant qu'à ce moment du livre, "tuple struct" ou "unit struct" sont des structures pas encore vues je crois.

- la différence entre un pointeur, une référence, un emprunt

- les lifetimes avec leur scope implicite (accolades cachées) ^^'

- Confusion entre <Option>, <Result>, expect() unwrap() ...

- gestion des erreurs : pas le réflexion d'utiliser Option à la place de null

- confusion entre mod, use, crate

## En Code

Les putains de lifetime !
