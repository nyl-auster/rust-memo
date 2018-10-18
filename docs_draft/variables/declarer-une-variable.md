# Déclarer des variables

## Qu'est ce qu'une variable ?

Pour fonctionner, notre programme a besoin de stocker des valeurs dans la mémoire de l'ordinateur. Chacune de ces valeurs possède une **adresse** mémoire qui nous permet d'y accéder en lecture ou écriture. Une adresse mémoire ressemblera par exemple à :`0x7ffee458816c`.

Une *variable* permet de nommer un espace mémoire et de pouvoir y accéder en lecture ou écriture via le nom choisi. Un peu comme un nom de domaine est lié à une adresse IP. De cette manière, au lieu d'avoir à écrire `0x7ffee458816c` dans notre programme pour accéder au contenu de cet emplacement mémoire, on pourra écrire simplement un identifiant de notre choix, tel que `name`.

## let

C'est le mot-clef `let` qui permet de déclarer une variable. On entendra souvent parler de *variable binding* (liaison de variable) pour indiquer que `let` permet de **lier un nom à une valeur** de la mémoire.

```rust
let name = "Yann";
```

Ci-dessus, le mot-clef  `let` fait trois choses:

- il lie le nom à un emplacement mémoire: `name`
- il inscrit une valeur d'initialisation dans cet emplacement mémoire: *yann*
- il donne un type à la variable. Si il n'est pas donné, il l'infère. Ci-dessus, le type inféré est `&str`.

:::tip NOTE
En Rust on utilise toujour le type de casse **snake_case** pour nommer variables et fonctions, sauf pour le type de donnée [struct](./structure.html).
:::

Déclaration d'un entier stocké sur 32 bits, en déclarant explicitement le type

```rust
let my_variable :i32 = 67;
```

```rust
// Rust infère qu'il s'agit ici d'un entier et donne par défault le type i32
let my_variable = 67;
// Rust infère qu'il s'agit d'un booléen
let my_boolean = true
```

Il est possible "d'éclipser" (*shadow*) une variable en ré-utilisant le mot clef `let` avec le même nom de variable.

```rust
fn main() {
    let my_var = 5;
    println!("{}", my_var);  // affiche "5"

    let my_var = 6;
    println!("{}", my_var);  // affiche "6"
}
```

On peut aussi lier plusieurs variables en une seul fois avec la syntaxe suivante :

```rust
  let (x, y, z) = (1, 2.0, "Hello, world");
```

:::tip Note
La partie gauche de l'assignation est un type de donnée nommé `tuple`, la partie gauche permet de *déstructurer* ce `tuple`
:::

## const

Le mot clef `const` permet de créer une constante. Contrairement à `let` :

- il peut être utilisé dans la portée globale.
- le type est obligatoire

```rust
const MAX_SIZE: u32 = 100000;

fn main() {
    println!("{}", MAX_SIZE);
}
```

:::warning ATTENTION
Une constante peut être éclipsée si elle est redéclarée avec le même nom dans une sous-portée
:::

```rust
const MAX_SIZE: u32 = 100000;
fn main() {
    const MAX_SIZE: u32 = 7;
    println!("{}", MAX_SIZE); // affiche 7
}
```

## Immutabilité par défaut

Dans la plupart des langages, un programme peut modifier la valeur de n'importe quelle variable. Cependant, modifier l'état d'un variable change l'état d'un programme et peut donc causer un bogue. En revanche, lire une variable est une opération sûre et sans effet secondaires, car cela ne change pas l'état du programme. **C'est pourquoi en Rust, les variables sont immutables par défaut**.

```rust
fn main() {
  // `x` is immutable
  let x = 1;
  // `y` is immutable
  let y;
  // `z` is mutable
  let mut z = 1;
  // Error: `x` is immutable
  x = 1;
  // OK: initialize `y`
  y = 1;
  // Error: `y` is immutable
  y = 1;
  // OK: `z` is mutable
  z = 2;
}
```

Il faut obligatoirement utiliser le mot-clef **mut** pour rendre une variable _mutable_.

```rust
fn main() {
    let mut x = 5;
    x = 6;
}
```

## Emplacement mémoire sur la pile ou le tas.

Par défaut en Rust, la valeur d'une variable est stockée sur la **pile**. Pour allouer une valeur dans la mémoire du **tas**, il faut utiliser explicitement le type de donnée `Box`.

```rust
// sera stockée dans la mémoire du tas et non dans la pile
let five = Box::new(5);
```

La `Box` est la forme la plus élementaire en Rust pour créer un pointeur sur la pile vers notre valeur stockée dans le tas.

