# Historique de Rust

Rust est un language crée par [Mozilla Research](https://research.mozilla.org/). Une partie de leur travail consiste à travailler sur un navigateur internet nouvelle génération : c'est le le projet [Servo](<https://fr.wikipedia.org/wiki/Servo_(moteur_de_rendu)>)

Une partie de la question posée par Servo est : si on écrit aujourd'hui le coeur d'un nouveau navigateur en prenant en compte les expériences passées, en quel language faut-il le faire ?

A l'heure actuelle, les principaux navigateurs sont constitués de plusieurs millions de lignes de code en _C++_. Le choix du language _C++_ est lié à une nécessité de pouvoir contrôler ce qu'il se passe au bas-niveau pour maîtriser les performances de rendu du navigateur. _C++_ offre notamment un grand contrôle de la gestion de la mémoire.

La contrepartie de cette flexibilité, c'est qu'une mauvaise manipulation des développeur·e·s peut vite mener à une erreur mémoire pour l'application : libération d'une mémoire déjà libérée, pointeur qui pointe vers une valeur qui n'est plus la bonne (dangling pointers), fuites de mémoires (memory leaks), "data races" ...

Le développeur peut faire des efforts et preuve de discipline pour respecter un ensemble de règles pour éviter au maximum ces erreurs, mais en _C++_, rien ne me permet de **garantir** dans le langage lui-même que le code final ne contient aucune de ces erreurs, ni au moment de la compilation, ni après.

Il s'agissait pour le projet _Servo_ de trouver un langage qui offrait le même niveau de contrôle et performance que le _C++_ tout en offrant de solide garanties concernant la sûreté de la mémoire pour s'assurer que toutes ces erreurs mémoire deviennent **impossibles**. C'est ce que Rust nomme la **sûreté de la mémoire**.

Les personnes en charges du projet ont estimé que la plupart des autres languages disponibles offraient :

- Un grand contrôle du bas-niveau mais peu ou pas de garanties de sûreté de la mémoire
- Des garanties solides de la sûreté mémoire mais peu ou pas de contrôle du bas-niveau.

Rust est né du besoin de satisfaire ces deux conditions à la fois : un grand contrôle de la mémoire tout en garantissant la sûreté de la mémoire. Ainsi une des promesses fondamentales de _Rust_ par rapport à C++, c'est que si le code **compile sans erreur**, c'est qu'il n'y aura **pas** d'erreur mémoire au moment de l'éxécution du programme.

Servo, encore en version expérimentale, est aujourd'hui codé en _Rust_
