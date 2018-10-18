# Resumé

le mot clef `let` permet de déclarer une variable.
Les variables sont **immutables** par défaut. Il faut ajouter le mot clef `mut` pour rendre une variable mutable.

```Rust
// entier
let y: u8 = 142;  // type entier non-signé 8 bits
let x = 142; // Rust infère le type i32 par défault

// booléen
let y: bool = false; // avec un type explicite
let x = true; // ici Rust infère le type bool

// nombre à virgule flottante
let y: f32 = 142.567890; // flottant 32 bits
let x = 2.0; // Rust infère le type f64 par défault

// caractère
let c = 'c';

// tuple : peut contenir des éléments de n'importe quel type.
// Ne peut pas être agrandi par la suite.
let tup: (i32, f64, u8, String) = (500, 6.4, 1, String::from("Hello")); // sans inférerence des types
let tup = (500, 6.4, 1, String::from("Hello")); // avec inférence des types

// array : tous les éléments doivent être du même type. 
// Ne peut pas être redimensionné par la suite
let ids: [i32; 5] = [12, 16, 23, 15, 99]; // sans inférence des types
let ids = [12, 16, 23, 15, 99]; // avec inférence du type

// String : Créer une chaîne de caractère UTF-8 ET redimensionnable 
let mut s = String::from("Hello");
s.push_str(", world.");
println!("{}", s); // display "Hello, world."

// ... ou en utilisant la macro format!
let my_string = format!("les valeurs sont : {} {} {}", a, x, y);

// Vecteurs: collection redimensionnable
let mut ids = vec![18, 21, 36, 98];
ids.push(101);
println!("{}", ids[1]);

// HashMap
let mut contacts = HashMap::new();
contacts.insert("Daniel", "798-1364");
contacts.insert("Ashley", "645-7689");
contacts.insert("Katie", "435-8291");
contacts.insert("Robert", "956-1745");
// affiche le numéro de Daniel
println!("{}", contacts["Daniel"]);

// tuple struct
struct Color(i32, i32, i32);

// unit-like ou unit struct
struct Electron;

// structure
#[derive(Debug)]
struct User {
    name: String,
    email: String,
    age: u8,
    active: bool,
}

// énumération simple
enum Country {
    France, // unit-like struct
    Espagne, // unit-like struct
    Allemagne, // unit-like struct
}

// énumération avec paramètres
enum Message {
    Quit, // unit-like struct 
    Move { x: i32, y: i32 }, // struct
    Write(String), // tuple struct avec un seul paramètre
    ChangeColor(i32, i32, i32), // tuple struct avec plusieurs paramètres
}
```
