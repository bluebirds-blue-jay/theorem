import { TAssociationDefinitions, TAssociations } from './associations';
import { TColumns, TCreateValues, TRecord, TUpdateValues } from './column';
import { TReadWhere, TWriteWhere } from './where';

export interface ITable<C extends TColumns, A extends TAssociations<C> = never> {
  create<T extends TCreateValues<C> | TCreateValues<C>[]>(values: T): Promise<T extends TCreateValues<C>[] ? TRecord<C>[] : TRecord<C>>;

  find(where?: TReadWhere<C, A>): Promise<TRecord<C>[]>;
  findOne(where?: TReadWhere<C, A>): Promise<TRecord<C> | undefined>;
  count(where: TReadWhere<C, A>): Promise<number>;

  update(where: TWriteWhere<C, A>, values: TUpdateValues<C>): Promise<number>;
  delete(where: TWriteWhere<C, A>): Promise<number>;

  associate(definitions: TAssociationDefinitions<C, A>): void;
}
