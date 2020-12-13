import { TUser, TUserPhoneNumber } from '../example/types';
import { TColumns} from './column';

export interface ISelectable<K extends string, V> {
  key: K;
}

export type TQueryTable<T extends TColumns, N extends string, A extends string = N> = {
  allColumns(): Readonly<{ [P in Exclude<keyof T, number | symbol>]: ISelectable<P, T[P]> }>;
  pickColumns<C extends Exclude<keyof T, number | symbol>>(...cols: C[]): Pick<{ [P in Exclude<keyof T, number | symbol>]: ISelectable<P, T[P]> }, C>;
  pickColumns(start: '*'): { [P in Exclude<keyof T, number | symbol>]: ISelectable<P, T[P]> };
  omitColumns<C extends Exclude<keyof T, number | symbol>>(...cols: C[]): Omit<{ [P in Exclude<keyof T, number | symbol>]: ISelectable<P, T[P]> }, C>;
};

export interface ISelectStatementExecutor {
  execute<T extends TSelectables>(selectQuery: ISelectStatementFactory<T>): T extends TSelectables
    ? { [P in Exclude<keyof T, number | symbol>]: T[P] extends ISelectable<P, infer V> ? V : never }[]
    : never;
}

export type TSelectables = {
  [key: string]: ISelectable<any, any>;
};

export type TCommonKeys<T, U> = (keyof T) & (keyof U);
export type THasCommonKeys<T, U> = TCommonKeys<T, U> extends never ? false : true;

export interface ISelectStatementFactory<S extends TSelectables> {
  select<T extends TSelectables>(selected: THasCommonKeys<S, T> extends true ? ['Duplicated keys(s)', TCommonKeys<S, T>] : T): ISelectStatementFactory<T & S>;
  distinct(value?: boolean): this;
  from(table: TQueryTable<any, any>, ...tables: TQueryTable<any, any>[]): this;
  join(table: TQueryTable<any, any>): this;
}

export interface IStatementFactory {
  createSelectStatement(): ISelectStatementFactory<{}>;
}





declare const queryBuilder: IStatementFactory;

declare const executor: ISelectStatementExecutor;

declare const one: ISelectable<'foo', 1>;

declare const userTable: TQueryTable<TUser, 'user'>;
declare const userPhoneNumberTable: TQueryTable<TUserPhoneNumber, 'user_phone_number'>;

const q = queryBuilder.createSelectStatement()
  .select(userTable.pickColumns('id', 'email', 'first_name', 'last_name'))
  .select(userPhoneNumberTable.pickColumns('value'))
  .select({
    foo: one
  })
  .from(userTable)
  .join(userPhoneNumberTable);

const r = executor.execute(q);
