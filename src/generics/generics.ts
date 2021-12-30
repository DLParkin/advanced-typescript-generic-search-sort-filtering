export {};
interface IFooBar {
  foo: string;
  bar: string;
}

const fooBars: Array<IFooBar> = [
  {
    foo: "foo1",
    bar: "bar1",
  },
  {
    foo: "foo num 2",
    bar: "bar num 2",
  },
  {
    foo: "foo is 3",
    bar: "bar is 3",
  },
];

// Sorts by foo
function sortByFoo(fooBars: Array<IFooBar>) {
  fooBars.sort((a, b) => {
    if (a.foo > b.foo) {
      return 1;
    }
    if (a.foo < b.foo) {
      return -1;
    }
    return 0;
  });
}

// Sorts by bar
function sortByBar(fooBars: Array<IFooBar>) {
  fooBars.sort((a, b) => {
    if (a.bar > b.bar) {
      return 1;
    }
    if (a.bar < b.bar) {
      return -1;
    }
    return 0;
  });
}

// Generic sort function
function sortByKey<T>(data: Array<T>, key: keyof T) {
  data.sort((a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return 1;
    }
    return 0;
  });
}

sortByKey<IFooBar>(fooBars, "foo");
sortByKey<IFooBar>(fooBars, "bar");

class Animal {
  public legCount: number;
  public armCount: number | undefined;

  constructor(legCount: number, armCount: number | undefined) {
    this.legCount = legCount;
    this.armCount = armCount;
  }
}

class Cat extends Animal {
  public purr: string | undefined;

  constructor(purr: string) {
    super(4, undefined);
    this.purr = purr;
  }
}

class Kangaroo extends Animal {
  constructor() {
    super(2, 2);
  }
}

class Bacteria {}

function printLegCount<T extends Animal>(animal: T) {
  console.log(`My leg count is ${animal.legCount}`);
}

const myCat = new Cat("purrrr");
const myKangaroo = new Kangaroo();

printLegCount(myCat);
printLegCount(myKangaroo);

//const myBacteria = new Bacteria();

//printLegCount(myBacteria);
