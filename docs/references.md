## Références

Une **référence** est fondamentalement un **pointeur** : c'est à dire une donnée qui est une adresse mémoire vers une autre donnée; et qui pemet d'accéder en lecture et / ou écriture à la donnée pointée. 

**Un pointeur n'est  pas la donnée elle-même, seulement une information qui permet de la retrouver. **

Une référence en Rust **est un type de pointeur**; mais qui donne lieu à des vérifications de sûreté mémoire au moment de la compilation. 

Un exemple de création d'une référence :

```rust
let s1 = String::from("hello");
let s = &s1;
println!("{}", s);
```

La variable `s` ci-dessus est une *référence* à un `s1`, ce qui donne  en mémoire la représentation suivante :

<img width="500px" src="images/reference.svg" />

- `s` est une **variable** dont la **valeur**  est l'emplacement mémoire de `s1`. Ces deux variables sont stockées sur la pile car leur taille est connue au moment de la compilation.
- Comme `s1` est du type *String*, sa valeur `hello` est stockée dans le tas. On voit aussi que `s1` est donc aussi, à son tour, en réalité un type de pointeur vers une adresse mémoire.

En réalité, les types `String`, `Vec<T>`, `Box<T>` (et d'autres) sont des références - et donc des types de pointeurs : ces variables stockent une adresse mémoire vers leurs valeurs qui se trouvent dans le tas.