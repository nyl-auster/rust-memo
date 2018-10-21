# Déclarer des variables

<Avertissement />

## let

Le mot-clef `let` permet de déclarer une variable.

```rust
let message = "Hello";
```

`let` fait trois choses:

- il lie le nom (ici `message`) à un emplacement mémoire de l'ordinateur
- il inscrit une valeur d'initialisation dans cet emplacement mémoire: `yann`
- il donne un **type** à la variable. Si le type n'est pas précisé, il est *inféré*. Ci-dessus, le type inféré est `&str`.

:::tip NOTE
En Rust on utilise toujours le type de casse **snake_case** pour nommer les variables et les fonctions.
:::

## Typage des variables

En Rust, une variable est toujours typée, que ce soit de manière *implicite* ou *explicite*.  On parle d'*inférence de type* pour désigner le fait que Rust soit capable de donner un type par défaut à une variable quand on ne précise pas explicitement le type souhaitée.

Pour expliciter le type d'une variable, il faut utiliser deux points `:` suivi du type désiré :

```rust
let message :&str = "Hello";

// ... est équivalent à :
let message = "Hello";
```

## Shadowing

Il est possible "d'éclipser" (*shadow*) une variable en ré-utilisant le mot clef `let` avec le même nom de variable.

```rust
fn main() {
    let my_var = 5;
    println!("{}", my_var);  // affiche "5"

    let my_var = 6;
    println!("{}", my_var);  // affiche "6"
}
```

## Déclarer plusieurs variables en une seule fois

Il est possible de déclarer plusieurs variables avec un seul `let` en utilisant la syntaxe suivante :

```rust
  let (x, y, z) = (1, 2.0, "Hello");
  println!("{}, {}, {}", x, y, z);
  // affiche : 1, 2, Hello
```

:::tip NOTE
Il s'agit en réalité d'une *déstructuration* (à gauche) d'un type *tuple* ( à droite) que nous verrons plus loin.
:::

## const

Le mot clef `const` permet, curieusement, de créer une constante. Contrairement à `let` :

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

Dans la plupart des langages, un programme peut modifier la valeur de n'importe quelle variable. Cependant, modifier l'état d'un variable change l'état d'un programme et peut donc causer un bogue. En revanche, lire une variable est une opération sûre et sans effet secondaire, car cela ne change pas l'état du programme. C'est pourquoi en Rust, les variables sont immutables par défaut.

Il faut utiliser le mot-clef **mut** pour rendre une variable _mutable_:

```rust
fn main() {
    let mut x = 5;
    x = 6;
}
```

En revanche, le code ci-dessous, qui modifie `x` alors que la variable n'est pas déclarée comme étant mutable, provoquera une erreur du compilateur.

```rust
fn main() {
  let x = 1;  
  // `x` est déclaré implicitement comme immutable

  x = 1;
  // Erreur: `x` est immutable
}
```
