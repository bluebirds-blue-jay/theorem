import { TAssociations } from './associations';
import { TColumns } from './column';
import { TSelectOption } from './options';

export type TSelect<Col extends TColumns, Ass extends TAssociations<Col>> = (keyof Col)[];

export type TSelectedColumns<
  Col extends TColumns,
  Ass extends TAssociations<Col>,
  Opt extends Partial<TSelectOption<Col, Ass>>
> = Opt extends { select: (infer Sel)[] }
  ? Sel
  : keyof Col;
