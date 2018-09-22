# Références

## Qu'est ce qu'une référence ?

Une **référence** est d'abord un **pointeur** : c'est à dire une donnée qui est une adresse mémoire vers une autre donnée.

Une référence en Rust **est un type de pointeur** en mieux : il offre des garanties de sûreté mémoire et elle joue un rôle clef dans la notion de propriété.

## Créer une référence

Pour créer une référence, on peut utiliser le symbole `&`.

```rust
let s1 = String::from("hello");
let s = &s1;
println!("{}", s);
```

Puisqu'une référence est au fond un *pointeur*, ça veut dire que `s` contient en réalité une adresse mémoire vers la valeur de `s1`. On peut afficher d'ailleurs cette adresse mémoire de la manière suivante :

```rust
fn main() {
    let s1 = String::from("hello");
    let s = &s1;
    println!("{:p}", &s);
}
```

Qui affichera par exemple :

```rust
0x7ffee457f1b0
```

La variable `s` ci-dessus est une *référence* à un `s1`, ce qui donne  en mémoire la représentation suivante :

<img width="500px" src="../images/reference.svg" />


- `s` est une **variable** dont la **valeur**  est l'emplacement mémoire de `s1`. Ces deux variables sont stockées sur la pile car leur taille est connue au moment de la compilation.
- Comme `s1` est du type *String*, sa valeur `hello` est stockée dans le tas. On voit aussi que `s1` est donc aussi, à son tour, en réalité un type de pointeur vers une adresse mémoire.

En réalité, les types `String`, `Vec<T>`, `Box<T>` (et d'autres) sont des types de  références - et donc des types de pointeurs : ces variables stockent au final une adresse mémoire vers leurs valeurs qui se trouvent dans le tas.