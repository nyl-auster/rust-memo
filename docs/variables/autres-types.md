# Autre type de données

## Tuple struct

Rust a un type de donnée qui est comme un hybride de `tuple` et `struct`, appelé _tuple struct_ . Un _Tuple struct_ a un nom, mais pas ses champs. On rencontrera ce format au moment de voir les énumérations.

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
	let black = Color(0, 0, 0);
	let origin = Point(0, 0, 0);
}
```

## Unit-like struct

Il est possible de définir une `struct` avec aucun champs :

```rust
struct Electron;

fn main() {
  let x = Electron;
}
```

Ca peut arriver si on doit implémenter un trait mais qu'on a rien à stocker au niveau de la structure, ou pour créer une variante d'énumération qui n'a pas de données.
