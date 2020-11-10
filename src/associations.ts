import { TColumns } from './column';
import { ITable } from './table';

export enum AssociationKind {
  HAS_ONE = 'has_one',
  BELONGS_TO = 'belongs_to',
  HAS_MANY = 'has_many',
  BELONGS_TO_MANY = 'belongs_to_many'
}

export type TAbstractAssociation<A extends string, C extends TColumns, TC extends TColumns, T extends ITable<C>, TT extends ITable<TC>> = {
  alias: A;
  kind: AssociationKind;
  table: T;
  column: keyof C;
  targetTable: TT;
  targetColumn: keyof TC;
};

export type THasOneAssociation<A extends string, C extends TColumns, TC extends TColumns, T extends ITable<C>, TT extends ITable<TC>> = TAbstractAssociation<A, C, TC, T, TT> & {
  kind: AssociationKind.HAS_ONE;
};

export type TBelongsToAssociation<A extends string, C extends TColumns, TC extends TColumns, T extends ITable<C>, TT extends ITable<TC>> = TAbstractAssociation<A, C, TC, T, TT> & {
  kind: AssociationKind.BELONGS_TO;
};

export type THasManyAssociation<A extends string, C extends TColumns, TC extends TColumns, T extends ITable<C>, TT extends ITable<TC>> = TAbstractAssociation<A, C, TC, T, TT> & {
  kind: AssociationKind.HAS_MANY;
};

export type TBelongsToManyAssociation<A extends string, C extends TColumns, TC extends TColumns, MC extends TColumns, T extends ITable<C>, TT extends ITable<TC>, MT extends ITable<MC>> = TAbstractAssociation<A, C, TC, T, TT> & {
  kind: AssociationKind.BELONGS_TO_MANY;
  middleTable: MT;
  middleColumn: keyof MC;
};

export type TAssociations<C extends TColumns, A extends string = string> = {
  [alias in A]: THasOneAssociation<alias, C, TColumns, ITable<C, TAssociations<C>>, ITable<TColumns, TAssociations<TColumns>>>
    | THasManyAssociation<A, C, TColumns, ITable<C, TAssociations<C>>, ITable<TColumns, TAssociations<TColumns>>>
    | TBelongsToAssociation<alias, C, TColumns, ITable<C, TAssociations<C>>, ITable<TColumns, TAssociations<TColumns>>>
    | TBelongsToManyAssociation<alias, C, TColumns, TColumns, ITable<C, TAssociations<C>>, ITable<TColumns, TAssociations<TColumns>>, ITable<TColumns, TAssociations<TColumns>>>;
};

export type TAssociationDefinitions<C extends TColumns, A extends TAssociations<C>> = {
  [alias in Exclude<keyof A, number | symbol>]: A[alias] extends TBelongsToManyAssociation<string, TColumns, TColumns, TColumns, ITable<C, TAssociations<C>>, ITable<TColumns, TAssociations<TColumns>>, ITable<TColumns, TAssociations<TColumns>>>
    ? Pick<A[alias], 'kind' | 'column' | 'targetTable' | 'targetColumn' | 'middleTable' | 'middleColumn'>
    : Pick<A[alias], 'kind' | 'column' | 'targetTable' | 'targetColumn'>;
};
