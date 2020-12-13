import { TAssociations } from './associations';
import { TColumns } from './column';
import { TSelect } from './select';

export type TRecordNotFoundErrorFactory = () => Error;
export type TIfExists<O extends Partial<TRecordExistsOption>, T, U> = O extends { exists: true | TRecordNotFoundErrorFactory; } ? T : (T | U);

export type TLimitOption = { limit: number; };
export type TOffsetOption = { offset: number; };
export type TParanoidOption = { paranoid: boolean; };
export type TRecordExistsOption = { exists: boolean | TRecordNotFoundErrorFactory; };
export type TSelectOption<Col extends TColumns, Ass extends TAssociations<Col>> = {
  select: TSelect<Col, Ass>;
};

export type TFindOneOptions<Col extends TColumns, Ass extends TAssociations<Col>> = Partial<
  TSelectOption<Col, Ass> &
  TRecordExistsOption &
  TParanoidOption
>;

export type TFindByPrimaryKeyOptions<Col extends TColumns, Ass extends TAssociations<Col>> = Partial<
  TSelectOption<Col, Ass> &
  TRecordExistsOption &
  TParanoidOption
  >;

export type TFindOptions<Col extends TColumns, Ass extends TAssociations<Col>> = Partial<
  TSelectOption<Col, Ass> &
  TLimitOption &
  TOffsetOption &
  TParanoidOption
>;

export type TRecordOptions<Col extends TColumns, Ass extends TAssociations<Col>> = Partial<
  TSelectOption<Col, Ass> &
  TRecordExistsOption
>;

