import { TAssociationDefinitions, TAssociations } from './associations';
import { TColumns, TCreateValues, TRecord, TUpdateValues } from './column';
import { TFindOneOptions, TFindOptions } from './options';
import { TReadWhere, TWriteWhere } from './where';

export interface ITable<C extends TColumns, A extends TAssociations<C> = never> {
  create<T extends TCreateValues<C> | TCreateValues<C>[]>(values: T): Promise<T extends TCreateValues<C>[] ? TRecord<C>[] : TRecord<C>>;

  find<O extends TFindOptions<C, A>>(where?: TReadWhere<C, A>, options?: O): Promise<TRecord<C>[]>;
  findOne<O extends TFindOneOptions<C, A>>(where?: TReadWhere<C, A>, options?: O): Promise<TRecord<C>>;
  count(where: TReadWhere<C, A>): Promise<number>;

  update(where: TWriteWhere<C, A>, values: TUpdateValues<C>): Promise<number>;
  delete(where: TWriteWhere<C, A>): Promise<number>;

  associate(definitions: TAssociationDefinitions<C, A>): void;
}
