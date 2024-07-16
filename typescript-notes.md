### Array types:
```ts
type TrendingProps = {
    posts0 ?: {
        id: number;
    }[];
    posts1?: Array<{
        id: number;
    }>;
}

let data: TrendingProps = {
    posts0 : [{id:1}, {id:2}, {id: 3}],
    posts1 : [{id:4}, {id:5}, {id: 6}]
};
```
### Generics:

### optional `?` (undefined) and non-undefined assurance (!):

### anything.d.ts file (*.d.ts):
The "d.ts" file is used to provide typescript type information about an API that's written in pure JavaScript. Here d stands for `Declaration Files`. The concept of declaration files is analogous to the concept of header files found in C/C++.

The .d.ts file is used to declare types/module for non type supplied javascript files/lib that are consumed by Typescript projects.

```ts
// proving function's signature inside arithmetics module written else where in js
declare module arithmetics {
    add(left: number, right: number): number;
    subtract(left: number, right: number): number;
    multiply(left: number, right: number): number;
    divide(left: number, right: number): number;
}
```

*d.ts file can also be used to resolve some ts error for media file types

```ts
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
```

https://stackoverflow.com/questions/21247278/about-d-ts-in-typescript

### `///` triple slash directive:
Triple-slash directives are single-line comments containing a single XML tag. The contents of the comment are used as compiler directives.

The `/// <reference path="..." />` directive serves as a declaration of dependency between files.

And `/// <reference types="..." />` directive declares a dependency on a package

https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html.