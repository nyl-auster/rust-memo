# Collections

## Chaînes de caractères

```rust
// Créer une chaîne de caractère UTF-8 et agrandissable :
let mut s = String::from("Hello");
s.push_str(", world.");
println!("{}", s); // display "Hello, world."

// la macro "format!" est pratique pour créer une chaîne
// de caractères agrandissable (type "String") et
// y insérer des valeurs de variables ou faire des concaténations de chaînes de caractères.
let my_string = format!("les valeurs sont : {} {} {}", a, x, y);

// créer une string de taille fixe et immutable appelée "slice"
// Son  type est *&str* .
// Cette chaîne de caractère sera stockée dans la mémoire statique du programme
// ( il s'agit d'un espace mémoire pré-réservé dans le fichier exécutable lui-même )
/// Il n'est donc PAS possible de l'agrandir ultérieurement.
let greeting = "Hello there.";
```

## Vecteurs

Un vecteur peut s'agrandir pendant l'éxécution, ses valeurs sont donc stockées dans le **tas**.

Créér un nouveau vecteur contenant une collection d'entiers. On utilise ensuite la méthode `push` pour ajouter des éléments.

:::warning NOTA BENE
Il faut impérativement ajouter le mot-clef `mut` devant le nom de la variable pour pouvoir utiliser la méthode `push`, puisque celle-ci modifie les données de la collection.
:::

```rust
let mut suite: Vec<i32> = Vec::new();
suite.push(0);
suite.push(1);
```

La macro `vec!` permet d'écrire plus rapidement le code ci-dessus. Rust infère du code ci-dessous que le type est `Vec<i32>`.

```rust
fn main() {
    let mut ids = vec![18, 21, 36, 98];
    ids.push(101);
    // affiche [18, 21, 36, 98, 101]
    println!("{:#?}", ids);
    // afiche "21"
    println!("{}", ids[1]);
}
```

## HashMap

une collection agrandissable de valeur d'un **même type**, indexée des chaînes de caractères, entiers, booléens ou tout type implémentant les traits `Eq` et `Hash`

```rust
use std::collections::HashMap;

fn main() {
    let mut contacts = HashMap::new();
    contacts.insert("Daniel", "798-1364");
    contacts.insert("Ashley", "645-7689");
    contacts.insert("Katie", "435-8291");
    contacts.insert("Robert", "956-1745");
    // afficher toute la collection
    println!("{:#?}", contacts);
    // affiche le numéro de Daniel
    println!("{}", contacts["Daniel"]);
}
```