import { TUser, TUserPhoneNumber } from '../example/types';
import { TColumns, TSQLDataType } from './column';

export interface ISelectable<K extends string, V extends TSQLDataType> {
  key: K;
}

export type TQueryTable<T extends TColumns, N extends string, A extends string = N> = {
  allColumns(): Readonly<{ [P in Exclude<keyof T, number | symbol>]: ISelectable<P, T[P]> }>;
  pickColumns<C extends Exclude<keyof T, number | symbol>>(...cols: C[]): Pick<{ [P in Exclude<keyof T, number | symbol>]: ISelectable<P, T[P]> }, C>;
  pickColumns(start: '*'): { [P in Exclude<keyof T, number | symbol>]: ISelectable<P, T[P]> };
  omitColumns<C extends Exclude<keyof T, number | symbol>>(...cols: C[]): Omit<{ [P in Exclude<keyof T, number | symbol>]: ISelectable<P, T[P]> }, C>;
};

export interface ISelectQueryExecutor {
  execute<T extends TSelectables>(selectQuery: ISelectQuery<T>): T extends TSelectables
    ? { [P in Exclude<keyof T, number | symbol>]: T[P] extends ISelectable<P, infer V> ? V : never }[]
    : never;
}

export type TSelectables = {
  [key: string]: ISelectable<any, any>;
};

export type TCommonKeys<T, U> = (keyof T) & (keyof U);
export type THasCommonKeys<T, U> = TCommonKeys<T, U> extends never ? false : true;

export interface ISelectQuery<S extends TSelectables> {
  select<T extends TSelectables>(selected: THasCommonKeys<S, T> extends true ? ['Duplicated keys(s)', TCommonKeys<S, T>] : T): ISelectQuery<T & S>;
  distinct(value?: boolean): this;
  from(table: TQueryTable<any, any>, ...tables: TQueryTable<any, any>[]): this;
  join(table: TQueryTable<any, any>): this;
}

export interface IQueryBuilder {
  createSelectStatement(): ISelectQuery<{}>;
}

declare const queryBuilder: IQueryBuilder;

declare const executor: ISelectQueryExecutor;

declare const one: ISelectable<'foo', 1>;

declare const userTable: TQueryTable<TUser, 'user'>;
declare const userPhoneNumberTable: TQueryTable<TUserPhoneNumber, 'user_phone_number'>;

type Foo = { id: number; email: string };
type Bar = { id: string; value: string; };
type Boo = {};

type T1 = TCommonKeys<Foo, Bar>;
type T2 = TCommonKeys<Foo, Boo>;
type T3 = never extends string ? true : false;
type T4 = string extends never ? true : false;
type T5 = TCommonKeys<Boo, Bar>;
type T6 = THasCommonKeys<Boo, Bar>;
type T7 = THasCommonKeys<Foo, Bar>;

const q = queryBuilder.createSelectStatement()
  .select(userTable.pickColumns('id', 'email', 'first_name', 'last_name'))
  .select(userPhoneNumberTable.pickColumns('value'))
  .select({
    foo: one
  })
  .from(userTable)
  .join(userPhoneNumberTable);

const r = executor.execute(q);
