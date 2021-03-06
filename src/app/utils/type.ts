export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
