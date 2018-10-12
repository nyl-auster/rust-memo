# Pattern matching

`match` est une expression puissante très souvent utilisée en Rust et qui permet de remplacer des groupes complexes de if / else. Chaque branche d'un match est de la forme `motif => expression` , et l'expression exécutée sera celle dont le **motif** correspond à la valeur fournie à `match`.


```rust
fn main() {

    let x = 2;
    
    let result = match x {
        0 => "zero",
        1 => "one",
        2 | 3 | 4 => "two, three, four",
        5...9 => "five -- nine",
        10 => {
            println!("on peut ouvrir des accolades également");
            "ten"
        }
        // "_° est un pattern spécial exécuté dans tous les autres cas.
        _ => "other",
    };
    
    // affiche "two, three four"
    println!("{}", result);
}
```

> ⚠️  toutes les branches d'un bloc `match` doivent retourner le **même type**.

`match` permet aussi de travailler avec les énumérations (voir prochain chapitre) :

```rust
enum Color {
    Red,
    Yellow,
    Blue,
}

fn main() {
    let my_favourite_color = Color::Yellow;
    let result = match my_favourite_color {
        Color::Red => "Rouge",
        Color::Yellow => "Jaune",
        Color::Blue => "Blue",
    };
    println!("{}", result);
}
```

