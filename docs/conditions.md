# Conditions

## les expressions if

> 💡 Note : on parlera un peu plus loin des **patterns** qui sont une autre manière très puissante de gérer les conditions en Rust : https://doc.rust-lang.org/book/second-edition/ch18-03-pattern-syntax.html


```rust
fn main() {
    let number = 3;
    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}
```
> ⚠️ Rust n'essaiera **PAS** de convertir automatiquement des types non-booléens en type booléen au sein des conditions. 

Conditions multiples :

```rust
fn main() {
    let number = 6;

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
}
```

>  💡 Comme **if** est une expression, il retourne une valeur : on peut donc utiliser **if** pour assigner une valeur à une variable :

```rust
fn main() {
    let condition = true;
    let result = if condition { 5 } else { 6 };
    println!("{}", result); // display "5"
}

```

> 🚨 Le code ci-dessous provoquer une erreur : chaque **bras** du **if** doit être du même type.

```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { "six" };
    println!("The value of number is: {}", number);
}
```

# Match

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

