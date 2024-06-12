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