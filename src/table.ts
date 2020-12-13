import { TAssociationDefinitions, TAssociations } from './associations';
import { TColumns, TCreateValues, TPrimaryKeyValues, TReadValues, TUpdateValues } from './column';
import { TFindByPrimaryKeyOptions, TFindOneOptions, TFindOptions } from './options';
import { TRecord } from './record';
import { TReadWhere, TWriteWhere } from './where';

/**
 * A table object maps directly to a table in the database.
 *
 * Col represents the columns in the table.
 * Ass represents the relations to the table.
 * Vir represents the virtual properties defined for the table.
 */
export interface ITable<Col extends TColumns, Ass extends TAssociations<Col> = never, Vir extends {} = {}> {
  create(values: TCreateValues<Col>): Promise<TReadValues<Col>>;
  createMany(values: TCreateValues<Col>[]): Promise<TReadValues<Col>[]>;

  findOne<Opt extends TFindOneOptions<Col, Ass>>(where?: TReadWhere<Col, Ass>, options?: Opt): Promise<TRecord<Col, Ass, Opt> | null>;
  findByPrimaryKey<Opt extends TFindByPrimaryKeyOptions<Col, Ass>>(pk: TPrimaryKeyValues<Col>): Promise<TRecord<Col, Ass, Opt> | null>;



  find<O extends TFindOptions<Col, Ass>>(where?: TReadWhere<Col, Ass>, options?: O): Promise<TReadValues<Col>[]>;
  count(where: TReadWhere<Col, Ass>): Promise<number>;

  update(where: TWriteWhere<Col, Ass>, values: TUpdateValues<Col>): Promise<number>;
  delete(where: TWriteWhere<Col, Ass>): Promise<number>;

  associate(definitions: TAssociationDefinitions<Col, Ass>): void;
}
