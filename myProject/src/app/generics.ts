class GenericNumber<T> {
    zeroValue: T;
    add:(x: T, y:T) => T;
}

interface GenericIdentityFn<T> {
    (arg: T): T;
}

interface LengthWise {
    length: number;
}

function identity<T>(arg: T) : T {
    return arg;
}

function loggingIdentity<T extends LengthWise>(arg: T) : T {
    console.log(arg.length);
    return arg;
}

let output = identity<string>("myString"); // or identity("myString") will work too

// These are all the same
//let myIdentity : <T>(arg: T) => T = identity;
//let myIdentity: <U>(arg: U) => U = identity;
//let myIdentity: {<T>(arg: T): T} = identity;

let myIdentity: GenericIdentityFn<number> = identity;

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x,y) {return x + y; };

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

alert(stringNumeric.add(stringNumeric.zeroValue, "test"));

loggingIdentity({length: 10, value: 3});

document.body.innerHTML = identity(output);