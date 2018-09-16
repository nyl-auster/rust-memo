# Structure - Créer des types personnalisés avec les structures (Structs)

## Déclarer une structure

Une structure est un ensemble de _champs_ dont chaque type est spécifié.

```rust
// créer une structure, en implémentant le trait Debug pour pouvoir
// afficher la variable dans un println!
#[derive(Debug)]
struct User {
    name: String,
    email: String,
    age: u8,
    active: bool,
}

// instanciation de la structure
fn main() {
    let yann = User {
        name: String::from("Yann"),
        email: String::from("yann@yineo.fr"),
        age: 35,
        active: true,
    };
    // afficher l'âge
    println!("age : {}", yann.age);
    // afficher l'objet pour debug
    println!("debug : {:#?}", yann)
}
```

Pour rendre le champ mutable, il faut rendre toute l'instance mutable avec le mot clef **mut** lors de la déclaration de la variable

```rust
// ajout du mot clef mut à l'instanciation
let mut yann = User {
    name: String::from("Yann"),
    email: String::from("yann@yineo.fr"),
    age: 35,
    active: true,
};

// muter les variables
yann.age = 43;
yann.email = String::from("email@email.fr");
yann.active = false;
println!("debug : {:#?}", yann);
```

:::warning NOTA BENE
**Toute** l'instance doit être mutable, Rust n'autorise pas seulement certains champs à être mutables.
:::

Utiliser une fonction pour instancier la structure :

```rust
fn main() {
    let yann = build_user(String::from("yann"), String::from("yann@yineo.fr"));
    println!("debug : {:#?}", yann);
}

#[derive(Debug)]
struct User {
    name: String,
    email: String,
    age: u8,
    active: bool,
}

fn build_user(name: String, email: String) -> User {
    User {
        name: name,
        email: email,
        active: true,
        age: 35,
    }
}
```

On peut utiliser la notation abrégée pour instancier les champs dans build_user, pour éliminer les redondances comme "name: name" :

```rust
fn build_user(name: String, email: String) -> User {
    User {
        // notation abrégée. Identique à "name: name"
        name,
        // notation abrégée
        email,
        active: true,
        age: 35,
    }
}
```

Il est possible d'instancier une structure en reprenant les valeurs d'une autre instance. Ici, Roger est identique à Yann, on change juste le nom et l'email pour créer l'instance de Roger.

```rust
fn main() {
    let yann = build_user(String::from("yann"), String::from("yann@yineo.fr"));
    let roger = User {
        name: String::from("Roger"),
        email: String::from("roger@roger.fr"),
        // Struct update syntax
        ..yann
    };
    println!("debug : {:#?}", yann);
    println!("debug : {:#?}", roger);
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

## Créer une fonction associée

Les fonctions associées d'une structure s'ajoutent auss dans le bloc **impl** de la structure, mais ne prennent **pas** l'instance _&self_ en premier paramètre.

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
