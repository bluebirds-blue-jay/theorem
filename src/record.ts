import { TAssociations } from './associations';
import { TColumns, TReadValues } from './column';
import { TRecordExistsOption, TRecordOptions, TSelectOption } from './options';
import { TSelectedColumns } from './select';

export type TRecordWithExistsOption<R, O extends Partial<TRecordExistsOption>, D = null> = O extends { exists: false }
  ? R | D
  : O extends { exists: undefined }
    ? R | D
    : R;

export type TRecordWithSelectOption<
  Col extends TColumns,
  Ass extends TAssociations<Col>,
  Opt extends Partial<TSelectOption<Col, Ass>>
> = Pick<Col, TSelectedColumns<Col, Ass, Opt>>;


export type TRecord<
  Col extends TColumns,
  Ass extends TAssociations<Col>,
  Opt extends TRecordOptions<Col, Ass>
> = TReadValues<TRecordWithSelectOption<Col, Ass, Opt>>;
