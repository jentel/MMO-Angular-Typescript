interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T) : T {
    return arg;
}

function loggingIdentity<T>(arg: Array<T>) : Array<T> {
    console.log(arg.length);
    return arg;
}

let output = identity<string>("myString"); // or identity("myString") will work too

// These are all the same
//let myIdentity : <T>(arg: T) => T = identity;
//let myIdentity: <U>(arg: U) => U = identity;
//let myIdentity: {<T>(arg: T): T} = identity;

let myIdentity: GenericIdentityFn<number> = identity;

document.body.innerHTML = identity(output);