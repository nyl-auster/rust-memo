**Nombre entier naturel :** un nombre positif. 
`1 ; 2 ; 3 ; 4 ; 5 ; 6 ; 7 ; 8 ; 9 ; 10 ; 11 ; …`

L'ensemble des entiers naturels, qu'il contienne ou non le nombre zéro, est noté « N » ou « ℕ »

**Adresse mémoire `&` :** Une adresse mémoire est un nombre entier naturel (rarement une autre sorte d'identifiant) qui désigne une zone particulière de la mémoire, ou juste le début d'une zone. Le plus souvent, une donnée peut être lue ou écrite. La mémoire peut être temporaire (mémoire vive) pour le travail ou au contraire durable (mémoire non volatile) pour le stockage.

**référence :** une référence est une **valeur** qui est un moyen d'accéder en lecture et/ou écriture à une donnée. Une référence n'est **pas** la donnée elle-même mais seulement une information sur sa localisation.

Il ne faut pas la confondre avec le **pointeur** qui est une **variable** contenant une **référence**.

**pointeur:** Un pointer est une **variable** contenant une adresse mémoire sous forme d'entier naturel. Pour voir l'adresse mémoire d'une variable en Rust, il faut ajouter `&` devant la variable. Il faut aussi utiliser le formatteur `:p` avec `println!` car Rust **déréférence** automatiquement la variable à l'affichage (c'est à dire affiche sa valeur et pas l'adresse )

```rust
    println!("{:p}", &name);
```

**déréférencement `*` :**  En Rust, l'étoile `*` est un opérateur préfixe qui dénote le *déréférencement*, c'est à dire l'accès à la donnée dont l'adresse est dans le pointeur.


**Tas :** Le tas (heap en anglais) est un des deux segments de mémoire utilisés lors de l'allocation dynamique de mémoire durant l'exécution d'un programme informatique. L'autre segment de mémoire utilisé lors de l'allocation dynamique de mémoire est la pile d'exécution (call stack).

**Pile :** En informatique, la pile d’exécution (souvent abrégée en la pile ; en anglais, call stack) est une structure de données de type pile qui sert à enregistrer des informations au sujet des fonctions actives dans un programme informatique. La pile d’exécution emmagasine aussi d’autres valeurs associées comme les variables locales de la fonction, les paramètres de la fonction, etc.

Une pile d'exécution est utilisée pour emmagasiner plusieurs valeurs, mais sa principale utilisation est de garder la trace de l'endroit où chaque fonction active doit retourner à la fin de son exécution (les fonctions actives sont celles qui ont été appelées, mais n’ont pas encore terminé leur exécution). Si, par exemple, un programme DessineCarré appelle une fonction DessineLigne à quatre endroits différents, la fonction DessineLigne doit avoir un moyen de savoir où poursuivre l’exécution à la fin de chacune de ses exécutions. Cela est fait par chacun des appels à la fonction DessineLigne qui place l’adresse de l'instruction suivant l'appel (l’adresse de retour) sur la pile d’exécution avant de transférer le contrôle de l’exécution à la fonction DessineLigne.



