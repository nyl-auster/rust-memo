# La phase de compilation (compile-time) et la phase d'éxécution (run-time)

En PHP ou JavaScript, il n'y pas de phase de compilation : ce sont des languages interprétés à la volée. A l'opposé, Rust nécessite d'être compilé avant de pouvoir être exécuté.  Donc en Rust, on distingue le "compile-time" ( phase de compilation ) et le run-time ( phase d'éxécution). 

Mais en contre-partie PHP et JavaScript ont besoin d'un interpréteur pour être exécuté. Il faut un navigateur ou Node.js pour exécuter du JavaScript; et il faut un serveur HTTP sur lequel il faut installer un interpréteur pour PHP. 

Rust de son côté fourni après compilation un fichier binaire qu'il est possible d'éxécuter même si Rust n'est pas installé sur la machine. [<span style="color:red">A préciser</span>]

Le rôle du compilateur de Rust n'est pas seulement de compiler et optimiser le programme en un fichier binaire; c'est aussi lui qui, pendant la phase de développement, garantit la sûreté de la mémoire et la qualité du code en imposant le respect de certaines conventions d'écriture du code.
