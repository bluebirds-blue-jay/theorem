type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

type ReadonlyKeys<T> =  {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P]; }, { -readonly [Q in P]: T[P]; }, never, P>;
}[keyof T];

export type TJSON = string | number | boolean | TJSON[] | { [key: string]: TJSON; } | null;

export type TMySQLDataType = string | number | boolean | Date | TJSON | undefined;

export type TColumns = {
  [columnName: string]: TMySQLDataType;
};

export type TRecord<C extends TColumns> = {
  readonly [P in keyof C]-?: Exclude<C[P], never>;
};

export type TCreateValues<C extends TColumns> = Omit<C, ReadonlyKeys<C>>;

export type TUpdateValues<C extends TColumns> = Partial<TCreateValues<C>>;
