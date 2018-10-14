# Structures - Créer des types personnalisés avec `struct`

## Déclarer une structure

Une structure est un type de donnée qui regroupe un ensemble de champs, dont chaque type est spécifié. On peut également y attacher des **méthodes**.

Voici comment déclarer une structure simple. On utilise le **PascalCase** pour le nommage des structures, au lieu de la **snake_case** habituelle.

```rust
// le trait debug est optionnel : il permettra d'afficher
// une instance de notre structure avec `println!`
#[derive(Debug)]
struct User {
    name: String,
    email: String,
    age: u8,
    active: bool,
}

// Créer une instance de la structure
fn main() {
    let yann = User {
        name: String::from("Yann"),
        email: String::from("email@email.fr"),
        age: 35,
        active: true,
    };
    // afficher la valeur d'un champ
    println!("age : {}", yann.age);
    // afficher toute l'instance
    println!("debug : {:#?}", yann)
}
```

## Structure unitaires et `tuple struct`

Les structures sont souvent utilisées de deux autres manière qu'il est bon de savoir repérer pour la suite.

On peut déclarer une structure sans aucun champ, on l'appelle *structure unitaire* (unit struct). Exemple :

```rust
struct User;
```

On peut aussi créer des `tuple struct`, qui sont au final simplement des `tuple` nommés.

```rust
// suppose qu'on veuille répresenter un point par
// ses coordonnées x et y avec un tuple struct:
#[derive(Debug)]
struct Point(i32, i32);

fn main() {
  let point = Point(0, 10);
  // on accède aux valeurs de la même manière qu'avec un tuple classique
  println!("{}", point.0);
  println!("{}", point.1);
  // affiche : Point(0, 10)
  println!("{:?}", point)
}
```

Cela permet d'éclairer la syntaxe **énumération** en Rust, qui sont composés des 3 types de structures qu'on vient de voir. La seule différence c'est que le mot clef `struct` n'est pas utilisé pour déclarer une énumération:

```rust
enum Message {
    Quit, // structure unitaire
    Move { x: i32, y: i32 }, // structure classique
    Write(String), // tuple struct
    ChangeColor(i32, i32, i32), // tuple struct
}
```

## structure mutables

Pour que les valeurs soient mutables, il faut rendre **toute** l'instance mutable avec le mot clef **mut** lors de l'instanciation de la structure.

```rust
// ajout du mot clef mut à l'instanciation
let mut yann = User {
    name: String::from("Yann"),
    email: String::from("email@email.fr"),
    age: 35,
    active: true,
};

// muter les variables est désormais possible
yann.age = 43;
yann.email = String::from("email@email.fr");
yann.active = false;
println!("debug : {:#?}", yann);
```

:::tip NOTE
**Toute** l'instance doit être mutable, Rust n'autorise pas seulement certains champs à être mutables.
:::

On peut utiliser des fonctions pour construire des instances avec des valeurs par défaut.

```rust
fn build_user(name: String, email: String) -> User {
    User {
        // notation abrégée. Identique à "name: name"
        name,
        // notation abrégée. Identique à "email: email"
        email,
        active: true,
        age: 35,
    }
}
```

Il est possible d'instancier une structure en se basant sur les valeurs d'une autre instance. On peut ainsi redéfinir uniquement certaines valeurs :

```rust
fn main() {
    let yann = build_user(String::from("yann"), String::from("yann@yineo.fr"));
    let roger = User {
      // ces valeurs écrasent celle de l'instance "yann"
        name: String::from("Roger"),
        email: String::from("roger@roger.fr"),
        // l'instance de base ( toujours en dernier )
        ..yann
    };
    println!("debug : {:#?}", roger);
}
```

Le debug ci-dessus affichera :

```rust
debug : User {
    name: "Roger",
    email: "roger@roger.fr",
    age: 35,
    active: true
}
```

## Implémenter une méthode sur la structure

Une **méthode** est une fonction attachée à une structure, qui recoit automatiquement **&self** en premier argument; qui est **l'instance de la structure**.

Pour ajouter une méthode, il faut créer un bloc **impl**. Voici comment définir une méthode "area" sur une structure "Rectangle", qui calculera l'aire de l'instance du Rectangle.

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// ajout d'un bloc implémentation
impl Rectangle {
    // self est forcément le premier paramètre de la signature de la méthode
    fn area(&self) -> u32 {
        self.width * self.height
    }
}
```

On peut ensuite appelé notre _méthode_ area() sur une **instance** de _Rectangle_

```rust
let my_rectangle = Rectangle {
    width: 2,
    height: 5,
};
let area_with_struct = my_rectangle.area();
```

## Les fonctions associées

Les fonctions associées sont des méthodes qui ne prennent **pas** `&self` en premier paramètre :

```rust
impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}
```

Une fonction associée ne dépend **pas** de l'instance, on l'appelle de la manière suivante :

```rust
Rectangle::square(10);
```

On sait maintenant d'où provient la notation `String::from("hello")` vu précédemment.
