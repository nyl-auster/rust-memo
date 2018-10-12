# Structures - Créer des types personnalisés avec `struct`

## Déclarer une structure

Une structure est un type de donnée qui regroupe un ensemble de champs dont chaque type est spécifié. On peut également y attacher des **méthodes**.

Voici comment déclarer une structure simple:

```rust
// le trait debug est optionnel : il permet d'afficher notre structure avec println!
#[derive(Debug)]
struct User {
    name: String,
    email: String,
    age: u8,
    active: bool,
}
```

:::tip NOTE
On utilise le **PascalCase** pour le nommage des structures, au lieu de la **snake_case** habituelle. Example : `AuthenticatedUser`.
::: 

Créer une instance de la structure et afficher la valeur de ses champs:

```rust
fn main() {
    let yann = User {
        name: String::from("Yann"),
        email: String::from("yann@yineo.fr"),
        age: 35,
        active: true,
    };
    println!("age : {}", yann.age);
    println!("debug : {:#?}", yann)

}
```

Pour que les valeurs soient mutables, il faut rendre **toute** l'instance mutable avec le mot clef **mut** lors de l'instanciation de la structure.

```rust
// ajout du mot clef mut à l'instanciation
let mut yann = User {
    name: String::from("Yann"),
    email: String::from("yann@yineo.fr"),
    age: 35,
    active: true,
};

// muter les variables est désormais possible
yann.age = 43;
yann.email = String::from("email@email.fr");
yann.active = false;
println!("debug : {:#?}", yann);
```

:::warning NOTA BENE
**Toute** l'instance doit être mutable, Rust n'autorise pas seulement certains champs à être mutables.
:::

On peut utiliser la notation abrégée pour instancier des champs dans build_user, pour éliminer les redondances comme `name: name`. La fonction ci-dessous nous permet d'instancier une structure avec des valeurs par défaut et tire parti de la notation abrégée:

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

Il est possible d'instancier une structure en se basant sur les valeurs d'une autre instance. On peut ainsi redéfinir uniquement certaines valeurs et laisse l'instance de base. 

```rust
fn main() {
    let yann = build_user(String::from("yann"), String::from("yann@yineo.fr"));
    let roger = User {
        name: String::from("Roger"),
        email: String::from("roger@roger.fr"),
        // L'instance de base, elle doit toujours être en dernier.
        // Les valeurs ci-dessus écrasent celles de "yann".
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
