const Add = (a, b) => {
    return a + b;
}
const Subtract = (a, b) => {
    return a - b;
}
const Multiply = (a, b) => {
    return a * b;
}

const anotherOverLoadFun = (...args) => {
    console.log(args);
}

module.exports = {
    Add,
    Subtract,
    Multiply,
    MethodOverload: anotherOverLoadFun
}