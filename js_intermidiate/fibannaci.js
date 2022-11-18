//fabinaci
let fib = (n) => {
    for (let i = 0; i < n; i++) {
        let a = 0;
        let b = 1;
        let c = a + b;
        a = b;
        b = c;
        console.log(c);
    }
}
console.log(fib(6));
