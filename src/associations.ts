import { TColumns } from './column';
import { ITable } from './table';

export enum AssociationKind {
  HAS_ONE = 'has_one',
  BELONGS_TO = 'belongs_to',
  HAS_MANY = 'has_many',
  BELONGS_TO_MANY = 'belongs_to_many'
}

export type TAbstractAssociation<A extends string, T extends ITable<any, any>, TT extends ITable<any, any>> = T extends ITable<infer C, any>
  ? TT extends ITable<infer TC, infer TA>
    ? {
      alias: A;
      kind: AssociationKind;
      table: T;
      column: keyof C;
      targetTable: TT;
      targetColumn: keyof TC;
    }
    : never
  : never;

export type THasOneAssociation<A extends string, T extends ITable<any, any>, TT extends ITable<any, any>> = TAbstractAssociation<A, T, TT> & {
  kind: AssociationKind.HAS_ONE;
};

export type TBelongsToAssociation<A extends string, T extends ITable<any, any>, TT extends ITable<any, any>> = TAbstractAssociation<A, T, TT> & {
  kind: AssociationKind.BELONGS_TO;
};

export type THasManyAssociation<A extends string, T extends ITable<any, any>, TT extends ITable<any, any>> = TAbstractAssociation<A, T, TT> & {
  kind: AssociationKind.HAS_MANY;
};

// export type TBelongsToManyAssociation<A extends string, C extends TColumns, TC extends TColumns, TA extends TAssociations<TC>, MC extends TColumns, T extends ITable<C>, TT extends ITable<TC>, MT extends ITable<MC>> = TAbstractAssociation<A, C, TC, T, TT> & {
//   kind: AssociationKind.BELONGS_TO_MANY;
//   middleTable: MT;
//   middleColumn: keyof MC;
// };

export type TAssociations<C extends TColumns, A extends string = string> = {
  [alias in A]: THasOneAssociation<alias, ITable<C, any>, ITable<any, any>>
    | THasManyAssociation<alias, ITable<C, any>, ITable<any, any>>
    | TBelongsToAssociation<alias, ITable<C, any>, ITable<any, any>>;
};

export type TAssociationDefinitions<C extends TColumns, A extends TAssociations<C>> = {
  [alias in Exclude<keyof A, number | symbol>]: Pick<A[alias], 'kind' | 'column' | 'targetTable' | 'targetColumn'>;
};
