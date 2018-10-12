# La phase de compilation (compile-time) et la phase d'éxécution (run-time)

En *PHP* ou *JavaScript*, il n'y pas de phase de compilation : ce sont des languages interprétés à la volée. A l'opposé, un programme *Rust* nécessite d'être d'abord *compilé en un fichier binaire*, ce fichier pourra ensuite être *exécuté* par l'ordinateur.  On distingue donc la phase de **compilation** (*compile-time*) et la phase **d'éxécution**. (*run-time*)

PHP et JavaScript ont besoin qu'un *interpréteur* soit installé sur la machine du client pour fonctionner. Il faut par exemple un navigateur ou un serveur Node.js pour interpréter du JavaScript.

Rust de son côté fourni, après compilation, un fichier binaire qu'il est possible d'éxécuter même si Rust n'est pas installé sur la machine.

Le rôle du compilateur est central en Rust, il ne se limite pas à compiler et optimiser le programme en un fichier binaire : il oblige également le développeur à respecter des conventions de codage strictes dans le but d'éviter que des erreurs apparaissent à la compilation. La phase de compilation de Rust est en réalité une véritable revue de l'intégralité du code pour garantir au maximum au programmeur que son code ne plantera pas une fois exécuté. 
