# Déclarer des variables

## Qu'est ce qu'une variable ?

Les variables sont un moyen simple pour le développeur d'accéder à un emplacement mémoire; dans lequel il peut lire ou écrire une valeur. C'est en quelque sorte un simple identifiant; porteur de sens sur son rôle ( normalement :-p ), pour que le code soit plus facile écrire et à lire.

Par défaut, une variable représente toujours un emplacement mémoire allouée sur la **pile**.

Une valeur peut aussi être allouée dans le **tas**, mais pour cela il faudra utiliser explicitement une `Box<T>`. Une `Box` sera techniquement un pointeur sur la pile qui référence un emplacement mémoire dans le tas.

## let

:::tip NOTE
En Rust on utilise toujour le type de casse **snake_case** pour nommer variables et fonctions, sauf pour le type de donnée [struct](./structure.html).
:::

Déclarer une variable avec `let`, c'est faire les trois choses suivantes:

- on lie un nom à un emplacement mémoire
- on inscrit une valeur dans cet emplacement mémoire
- on indique de quel type est la variable

Déclaration d'un entier stocké sur 32 bits:

```rust
let my_variable :i32 = 67;
```

Si le type n'est pas précisé, Rust est capable d'**inférer** le type, il n'est donc pas toujours nécessaire de préciser le type.

```rust
// Rust infère qu'il s'agit ici d'un entier et donne par défault le type i32
let my_variable = 67;
// Rust infère qu'il s'agit d'un booléen
let my_boolean = true
```

:::tip NOTA BENE 
Rust infère en réalité pas mal de choses; il faut juste bien se rappeler quand dans tous les cas, si quelque chose n'est pas précisé explicitement, il l'est **implicitement**. Dans l'exemple ci-dessus, `let my_boolean = true` et `let my_boolean :bool = true` sont strictement équivalent.
:::


Il est possible "d'éclipser" (*shadow*) une variable en ré-utilisant le mot clef `let` avec le même nom de variable.

```rust
fn main() {
    let my_var = 5;
    println!("{}", my_var);  // affiche "5"

    let my_var = 6;
    println!("{}", my_var);  // affiche "6"
}
```

On peut aussi lier plusieurs variables avec un seul mot clef `let` avec la syntaxe suivante. 

```rust
  let (x, y, z) = (1, 2.0, "Hello, world");
```

:::tip EXPLICATIONS
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
Une constant peut être éclipsé si elle est redéclarée avec le même nom dans une sous-portée
:::

```rust
const MAX_SIZE: u32 = 100000;
fn main() {
    const MAX_SIZE: u32 = 7;
    println!("{}", MAX_SIZE); // affiche 7
}
```

## Immutabilité par défaut

Dans la plupart des langages, un programme peut modifier la valeur de n'importe quelle variable. Cependant, modifier l'état d'un variable change l'état d'un programme et peut donc causer un bogue. En revanche, lire une variable est sûr, car cela ne change pas l'état du programme. **C'est pourquoi en Rust, les variables sont immutables par défaut**.

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
