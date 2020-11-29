import { TAbstractAssociation, TAssociations } from './associations';
import { TColumns } from './column';
import { ITable } from './table';

export type TStar = '*';

// export type TAssociationSelect<C extends TColumns, A extends TAssociations<C>> = {
//   [alias in Exclude<keyof A, number | symbol>]?: A[alias] extends TAbstractAssociation<alias, ITable<C, A>, ITable<infer TC, infer TA>>
//     ? TSelect<TC, TA>
//     : never;
// };

export type TSelect<C extends TColumns, A extends TAssociations<C>> = (keyof C)[];

// export type TSelect<C extends TColumns, A extends TAssociations<C>> = TStar
//   | [...(keyof C)[]]
//   | [TStar]
//   | [TStar, TAssociationSelect<C, A>]
//   | [(keyof C)[], TAssociationSelect<C, A>];
