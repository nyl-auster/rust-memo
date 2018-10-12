# Suite de fibonacci avec des boucles Rust

La suite de Fibonacci est une suite d'entiers dans laquelle chaque terme est la somme des deux termes qui le précèdent. Elle commence généralement par les termes 0 et 1 (parfois 1 et 1) et ses premiers termes sont : 0, 1, 1, 2, 3, 5, 8, 13, 21, etc. (suite A000045 de l'OEIS). [wikipedia](https://fr.wikipedia.org/wiki/Suite_de_Fibonacci)

```rust
fn main() {
    println!("Fibonnaci 1 :",);
    println!("{:#?}", fibonacci_1(10));

    println!("Fibonnaci 2 :",);
    println!("{:#?}", fibonacci_2(10));

    println!("Fibonnaci 3 :",);
    fibonacci_3(10);
}

// retourne un tableau en utilisant les Vecteur et les range
fn fibonacci_1(max: usize) -> Vec<i32> {
    let mut suite = vec![0, 1];
    let mut n;
    for i in 2..max {
        n = suite[i - 1] + suite[i - 2];
        suite.push(n);
    }
    suite
}

// retourn un tableau en utilisant les vecteur et loop
fn fibonacci_2(iterations: usize) -> Vec<i32> {
    let mut suite: Vec<i32> = Vec::new();
    suite.push(0);
    suite.push(1);
    let mut n;
    loop {
        n = suite[suite.len() - 2] + suite[suite.len() - 1];
        suite.push(n);
        if suite.len() == iterations {
            break;
        }
    }
    suite
}

// Ne retourne rien : affiche la suite en utisant les tuple
fn fibonacci_3(n: usize) {
    let mut x = (1, 1);
    for i in 0..n {
        println!("{} : {:#?}", i, x.0);
        x = (x.1, x.0 + x.1);
    }
}
```