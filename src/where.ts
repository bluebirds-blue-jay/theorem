import { TAssociations } from './associations';
import { TColumns, TMySQLDataType } from './column';
import { ITable } from './table';

export type TOperator = 'in' | 'nin' | 'notIn' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'between' | 'isNull' | 'isNotNull';
export type TSimpleOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte';
export type TInOperator = 'in' | 'nin';
export type TNullOperator = 'isNull' | 'isNotNull';
export type TBetweenOperator = 'between';
export type TLikeOperator = 'like';

export type TSimpleOperatorWhere<T extends TMySQLDataType> = {
  [O in TSimpleOperator]: T;
};

export type TInOperatorWhere<T extends TMySQLDataType> = {
  [O in TInOperator]: T[];
};

export type TNullOperatorWhere<T extends TMySQLDataType> = {
  [O in TNullOperator]: boolean;
};

export type TBetweenOperatorWhere<T extends TMySQLDataType> = {
  [O in TBetweenOperator]: [T, T];
};

export type TLikeOperatorWhere<T extends TMySQLDataType> = {
  [O in TLikeOperator]: string;
};

export type TColumnsWhere<C extends TColumns> = {
  [P in keyof C]?: C[P] | Partial<
    TSimpleOperatorWhere<C[P]> &
    TInOperatorWhere<C[P]> &
    TNullOperatorWhere<C[P]> &
    TBetweenOperatorWhere<C[P]> &
    TLikeOperatorWhere<C[P]>
  >;
};

export type TReadWhere<C extends TColumns, A extends TAssociations<C>> = TColumnsWhere<C> & {
  [P in Exclude<keyof A, number | symbol>]?: A[P]['targetTable'] extends ITable<infer TC, infer TA>
    ? TReadWhere<TC, TA>
    : never
};

export type TWriteWhere<C extends TColumns, A extends TAssociations<C>> = TColumnsWhere<C>;
