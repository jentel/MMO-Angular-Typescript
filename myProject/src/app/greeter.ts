class Student {
    fullName: string;
    constructor (public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person:Person) {
    return "Hello, " + person.firstName + " "+ person.lastName;
}

let user = new Student("Jane", "M.", "User");

function identity<T>(arg: T) : T {
    return arg;
}

let output = identity<string>("myString"); // or identity("myString") will work too

document.body.innerHTML = greeter(user);