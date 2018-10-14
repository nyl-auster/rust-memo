# Temps de vie (lifetimes)

En rust il est possible de faire des références, qu'on nomme "emprunt". Une référence est une adresse vers une autre donnée. Si jamais cet autre donnée a disparue entre temps, on a un gros souci : nous avons une référence vers un emplacement mémoire vide; ce qui provoque un plantage du programme.

La "durée de vie" de la référence excède dans ce cas la donnée référencée, c'est quelque chose que Rust veut à tout prix éviter; et il veut pouvoir détecter dès la compilation que la durée de vie des références ( ou emprunt ) ne causera pas une erreur mémoire.

Ce sont les *annotations de temps de vie* , qui permettent au compilateur de s'assurer qu'une référence ne restent pas trop longtemps en vie par rapport à la donnée pointée; rien qu'en regardant **la signature de la fonction**.

Autrement dit, nous devons écrire notre signature de fonction de manière à ce que Rust soit en mesure de déterminer si on ne fait pas de la merde avec les références.

```rust
foo<'a>
```

Se lit : La durée de `foo` ne doit pas éxéder la durée de vie `'a`.

```rust
foo<'a, 'b>
```

Se lit : la durée de vie de `foo` ne peut pas exéceder celle de `a` OU `b`. 

## Les temps de vies implicites

Rust infèrent beaucoup de choses pour facilité l'écriture du code, les temps de vies ne font pas exception. Quand on écrit ceci :

```rust
fn foo(x: &i32) {
  prinln!("{}", x)
}
```

En réalité Rust en quelque chose comme ceci :

```rust
fn foo<'a>(x: &'a i32) {
  prinln!("{}", x)
}
```

On a mis `a` mais ça marcherait aussi bien avec `toto`.

```rust
fn main() {
  let x = 12; 
  foo(&x);
}

fn foo<'a>(y: &'a i32) {
  println!("{}", y)
}
```

`y` est une référence à `x`. Il faut s'assurer `y` ne vivent pas plus longtemps que `x`.