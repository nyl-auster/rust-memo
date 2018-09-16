## Immutabilité par défaut

Dans la plupart des langages, un programme peut modifier la valeur de n'importe quelle variable. Cependant, modifier l'état d'un variable change l'état d'un programme et peut donc causer un bogue. En revanche, lire une variable est sûr, car cela ne change pas l'état du programme. **C'est pourquoi en Rust, les variables sont immutables par défaut**.

> ⚠️ En Rust on utilise le type de casse **snake_case** pour nommer les fonctions et variables. Exemple : `fn hello_world() {}`

```rust
fn main() {
	// `x` is immutable
	let x = 1;
	// `y` is immutable
	let y;
	// `z` is mutable
	let mut z = 1;
	// Error: `x` is immutable
	x = 1;
	// OK: initialize `y`
	y = 1;
	// Error: `y` is immutable
	y = 1;
	// OK: `z` is mutable
	z = 2;
}
```

Il faut obligatoirement utiliser le mot-clef **mut** pour rendre une variable _mutable_.

```rust
fn main() {
    let mut x = 5;
    x = 6;
}
```