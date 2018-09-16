# Fonctions

:::tip Note
Rust peut accéder à vos fonctions quel que soit l'endroit de leur déclaration.
:::

## Déclarer une fonction

Vous **devez** déclarer le type de valeur retournée avec une flèche. Si vous ne le faites pas, Rust considérera que votre fonction retourne par défaut un `tuple` vide "()".

```rust
fn get_x() -> i32 {
    76
}
```

:::danger ATTENTION
Bien noter que ci-dessus il n'y a **PAS** de point-virgule à la fin de la ligne. Cela permet à `76` d'être évalué comme une expression, et *Rust* retourne alors automatiquement la valeur d'une expression. Voir [Expression et déclaration](../expression-et-declaration.html)
 :::

La notation ci-dessus est donc strictement équivalente à la suivante :

```rust
fn get_x() -> i32 {
   return 76;
}
```

Exemple avec des paramètres. La signature de la fonction **doit** déclarer le type de chaque argument.

```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y
}
```

Exemple sans retourner explicitement une valeur ( Rust retournera donc "()" par défault )

```rust
fn my_function(x: i32, y: i32) {
    println!("The value of x is: {}", x);
}
```

## Pièges pour les débutants

🚨 Ceci provoquera une erreur du compilateur

```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y;
}
```

Comme il y a un point-virgule à la fin de "x * y", l'expression est convertie en **déclaration** (statement), et une déclaration ne retourne rien. Donc Rust considère que la fonction renvoie un tuple vide, ce qui ne correspondant pas au type de retour *i32\* qui a été déclaré dans la signature de notre fonction.

Pour réparer l'erreur, il suffit de retirer le point-virgule pour convertir la déclaration en expression, dont la valeur sera retournée automatiquement.

```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y
}
```

## La différente entre arguments et paramètres

:::tip NOTE
 Les **paramètres** sont les variables spéciales utilisées dans la signature d'une fonction. Les **arguments** sont les valeurs concrètes passées au moment de l'appel de la fonction.
:::

```rust
// x est un paramètre
fn hello_world(x: i32) {
    println!("Hello world");
}

fn main() {
  // 67 est un argument
  hello_world(67)
}
```
