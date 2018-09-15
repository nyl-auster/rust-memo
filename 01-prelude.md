# Prélude

Rust requiert plus de connaissances dites "bas-niveau" que n'en requiert _PHP_ ou _JavaScript_. Le guide officiel de Rust est excellent mais s'adresse plus volontiers à celles et ceux provenant de C++ et C; ce guide se veut donc un complément pour ceux qui viennent de langage plus *haut-niveau*; en veillant à assurer l'introduction des concepts dans un ordre qui rendre aussi facile que possible la compréhension des concepts les plus atypiques de Rust.

Ce prélude contient un récapitulatif, adapté à Rust, de ce qu'il faut savoir pour aborder _Rust_ sans difficultés quand on vient de langage plus haut niveau tels que PHP ou JavaScript.

Pour apprendre Rust en douceur, il sera crucial de parfaitement maîtriser des notions **propriété** , **d'emprunt**, du **vérificateur d'emprunt** et de **temps de vie** : ces concepts permettent à Rust de garantir la sûreté mémoire à la compilation; mais pour bien la saisir il faut être parfaitement à l'aise avec les notions suivantes :

- La différence entre mémoire de la pile et mémoire du tas
- Ce qu'on entend par référence et par pointeur
- La numération binaire et la notion de bits