import { TAssociations } from './associations';
import { TColumns } from './column';
import { TSelect } from './select';

export type TRecordNotFoundErrorFactory = () => Error;
export type TIfExists<O extends Partial<TRecordExistsOption>, T, U> = O extends { exists: true | TRecordNotFoundErrorFactory; } ? T : (T | U);

export type TLimitOption = { limit: number; };
export type TOffsetOption = { offset: number; };
export type TParanoidOption = { paranoid: boolean; };
export type TRecordExistsOption = { exists: boolean | TRecordNotFoundErrorFactory; };
export type TSelectOption<C extends TColumns, A extends TAssociations<C>> = { select: TSelect<C, A>; };


export type TFindOneOptions<C extends TColumns, A extends TAssociations<C>> = Partial<
  TSelectOption<C, A> &
  TRecordExistsOption &
  TParanoidOption
>;

export type TFindOptions<C extends TColumns, A extends TAssociations<C>> = Partial<
  TSelectOption<C, A> &
  TLimitOption &
  TOffsetOption &
  TParanoidOption
>;
