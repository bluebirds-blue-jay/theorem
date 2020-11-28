import { TAssociations } from './associations';
import { TSelectOption } from './options';
import { TStar } from './select';

export type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

export type ReadonlyKeys<T> =  {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P]; }, { -readonly [Q in P]: T[P]; }, never, P>;
}[keyof T];

export type TJSON = string | number | boolean | TJSON[] | { [key: string]: TJSON; } | null;

export type TMySQLDataType = string | number | boolean | Date | TJSON | undefined; // undefined is added iin order to support optional properties.

export type TColumns = {
  [columnName: string]: TMySQLDataType;
};

export type TRecord<C extends TColumns> = {
  readonly [P in keyof C]-?: C[P]; // TODO: Exclude "undefined"?
};

export type TSelectableRecord<C extends TColumns, A extends TAssociations<C>, O extends Partial<TSelectOption<C, A>>> = O extends { select: TStar }
  ? TRecord<C>
  : O extends { select: [TStar] }
    ? TRecord<C>
    : O extends { select: [...(infer P)[]] }
      ? P extends keyof C
        ? TRecord<Pick<C, P>>
        : never
      : never;


export type TCreateValues<C extends TColumns> = Omit<C, ReadonlyKeys<C>>;

export type TUpdateValues<C extends TColumns> = Partial<TCreateValues<C>>;
