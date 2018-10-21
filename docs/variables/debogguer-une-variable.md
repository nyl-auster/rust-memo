# Déboguer les variables avec les placeholders de "println!" 💡

## afficher une vartaible avec println! et ses formatteurs

`println!` permet d'afficher une variable à l'aide de différents formatteurs tels que `{}`, `{:?}` , `{:#?}`, `{:p}` et d'autres :

```rust
// pour une variable primitive atomique, "{}" est suffisant:
let x = "hello world";
println!("{}", x);

// pour les types plus complexes, un formatteur est nécessaire
let array = [1, 2, 3];

// ceci ne fonctionnera pas
println!("this is my variable : {}", array);
// error[E0277]: `[{integer}; 3]` doesn't implement `std::fmt::Display`

// ceci fonctionne
println!("this is my variable : {:?}", array);
// affiche: "this is my variable : [1, 2, 3]"

// pour encore plus de lisibilité :
println!("this is my variable : {:#?}", array);
// affiche :
// this is my variable : [
//    1,
//    2,
//    3
// ]

// affiche l'adresse mémoire, par exemple `0x7ffee458816c`
// L'éperluette signifie "donne moi l'adresse mémoire de cette variable"
// Mais Rust affiche par défaut la valeur au lieu de l'adresse dans println!,
// on doit donc ajouter le formateur `:p` pour voir réellement l'adresse.
println!("{:p}", &array);

// affiche une valeur sous forme de séquences de bits, ici `11`.
println!("{:b}", array[2]);
```

## Connaître le type d'une variable

[TODO : indiquer qu'on peut connaître le type d'une variable en plantant le compilateur en affiliant volontaire un type erroné]
