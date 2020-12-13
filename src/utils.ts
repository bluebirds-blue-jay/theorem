export type TIfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;

export type TReadonlyKeys<T> = {
  [P in keyof T]-?: TIfEquals<{ [Q in P]: T[P]; }, { -readonly [Q in P]: T[P]; }, never, P>;
}[keyof T];
