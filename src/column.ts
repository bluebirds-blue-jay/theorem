import { TReadonlyKeys } from './utils';

export type TColumns = {};

export type TReadValues<Col extends TColumns> = {
  readonly [P in keyof Col]-?: Col[P]; // TODO: Exclude "undefined"?
};

export type TCreateValues<Col extends TColumns> = Omit<Col, TReadonlyKeys<Col>>;

export type TUpdateValues<Col extends TColumns> = Partial<TCreateValues<Col>>;

export type TPrimaryKeyValues<Col extends TColumns> = never;

export type PK<T> = T;
