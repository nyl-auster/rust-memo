# Références

## Qu'est ce qu'une référence ?

Une **référence** est fondamentalement un **pointeur** : c'est à dire une donnée qui est une adresse mémoire vers une autre donnée; et qui pemet d'accéder en lecture et / ou écriture à la donnée pointée. C'est un emplacement mémoire qui contient l'adresse d'un autre emplacement mémoire.

**Un pointeur n'est  pas la donnée elle-même : seulement une information qui permet de la retrouver.**.

Une référence en Rust **est un type de pointeur** qui offre en prime des garanties concernant la sûreté de la mémoire chère à Rust.

## Créer une référence

Un exemple de création d'une référence :

```rust
let s1 = String::from("hello");
let s = &s1;
println!("{}", s);
```

La variable `s` ci-dessus est une *référence* à un `s1`, ce qui donne  en mémoire la représentation suivante :

<img width="500px" src="../images/reference.svg" />

- `s` est une **variable** dont la **valeur**  est l'emplacement mémoire de `s1`. Ces deux variables sont stockées sur la pile car leur taille est connue au moment de la compilation.
- Comme `s1` est du type *String*, sa valeur `hello` est stockée dans le tas. On voit aussi que `s1` est donc aussi, à son tour, en réalité un type de pointeur vers une adresse mémoire.

En réalité, les types `String`, `Vec<T>`, `Box<T>` (et d'autres) sont des types de  références - et donc des types de pointeurs : ces variables stockent au final une adresse mémoire vers leurs valeurs qui se trouvent dans le tas.