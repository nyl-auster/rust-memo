**Nombre entier naturel :** un nombre positif. 
`1 ; 2 ; 3 ; 4 ; 5 ; 6 ; 7 ; 8 ; 9 ; 10 ; 11 ; …`

L'ensemble des entiers naturels, qu'il contienne ou non le nombre zéro, est noté « N » ou « ℕ »

**Adresse mémoire :** Une adresse mémoire est un nombre entier naturel (rarement une autre sorte d'identifiant) qui désigne une zone particulière de la mémoire, ou juste le début d'une zone. Le plus souvent, une donnée peut être lue ou écrite. La mémoire peut être temporaire (mémoire vive) pour le travail ou au contraire durable (mémoire non volatile) pour le stockage.

**pointeur:** Un pointer est une **variable** contenant une adresse mémoire sous forme d'entier naturel. Pour voir l'adresse mémoire d'une variable en Rust, il faut ajouter `&` devant la variable. Il faut aussi utiliser le formatteur `:p` car Rust déréférence automatiquement la variable à l'affichage (c'est à dire affiche sa valeur et pas l'adresse )

```rust
    println!("{:p}", &name);
```

**déréférencement :**  En Rust, l'étoile "*" est un opérateur préfixe qui dénote le *déréférencement*, c'est à dire l'accès à la donnée dont l'adresse est dans le pointeur.

