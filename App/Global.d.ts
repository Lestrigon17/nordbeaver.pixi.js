type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type Nullable<T> = T | undefined | null;
type PromiseReturnType<F extends Promise> = F extends Promise<infer T> ? T : never;
type PartialNullable<T> = {
    [P in keyof T]?: T[P] | null;
};