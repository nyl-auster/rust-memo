# Gestion des erreurs

La plupart des erreurs ne sont pas assez graves pour justifier que notre programme cesse complètement de fonctionner. Par exemple, si un utilisateur demande à voir une image et que celle-ci n'existe pas, on préfera lui indiquer que le fichier n'a pas été trouvé, plutôt que de planter totalement l'application sans autre forme de procès. 

C'est pourquoi Rust considère qu'il y a 2 catégories d'erreurs : **recouvrables** (*recoverable*) et **non-recouvrable**.

Rust utilise `Result<T, E>` pour les erreurs recouvrables ( qui n'arrêtent pas le programme) et `panic!` pour les erreurs non-recouvrables (qui arrêtent le programme).

`Result` joue un rôle similaire aux exceptions dans les autres langages.

## Techniquement, c'est quoi Result ?

Result est une **énumération** qui représente soit un succès ( `Ok` ), soit un échec ( `Err`). Voici sa déclaration complète :

```rust
pub enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

`T` représente le type de donnée renvoyée en cas de succès, et `E` le type d'erreur renvoyée en cas d'échec. Ces lettres sont juste une manière de déclarer que n'importe quel type peut être renvoyée, et que le type renvoyé par `Ok` et `Err` peuvent être différents. On peut ainsi utiliser l'énumération `Result` dans n'importe quel cas avec n'importe quel type. Mais utiliser `T` ou  `E` ne sont que des conventions, Rust fonctionnerait tout aussi bien avec n'importe quelle lettre en majuscule pour déclarer `Result`:

```rust
enum Result<A, Z> {
    Ok(A),
    Err(Z),
}
```

Voici comment déclarer une erreur avec `panic!`

```rust
fn main() {
    panic!("crash and burn");
}
```


