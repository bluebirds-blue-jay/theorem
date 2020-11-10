import { CountryCode } from '@bluejay/countries';
import { TBelongsToManyAssociation, THasManyAssociation, THasOneAssociation } from '../src';
import { ICountryTable, IRoleTable, IUserPhoneNumberTable, IUserRoleTable, IUserTable } from './tables';

export enum PhoneNumberPurpose {
  WORK = 'work',
  PERSONAL = 'personal'
}

export type TUser = {
  readonly id: number;
  email: string;
  country_id: TCountry['id'];
  first_name: string;
  last_name: string;
  invited_by_id?: TUser['id'] | null; // Self reference.
  birth_date?: Date | null;
  enabled?: boolean | false;
  readonly created_at: Date;
  readonly updated_at: Date;
};

export type TUserPhoneNumber = {
  readonly id: number;
  user_id: TUser['id'];
  value: string;
  purpose: PhoneNumberPurpose;
  verified?: boolean | false;
  readonly created_at: Date;
  readonly updated_at: Date;
};

export type TRole = {
  readonly id: number;
  identifier: string;
  readonly created_at: Date;
  readonly updated_at: Date;
};

export type TUserRole = {
  readonly id: number;
  user_id: TUser['id'];
  role_id: TRole['id'];
  readonly created_at: Date;
  readonly updated_at: Date;
};

export type TCountry = {
  readonly id: number;
  code: CountryCode;
  readonly created_at: Date;
  readonly updated_at: Date;
};


export type TUserAssociations = {
  phone_numbers: THasManyAssociation<'phone_numbers', IUserTable, IUserPhoneNumberTable>;
  roles: TBelongsToManyAssociation<'roles', IUserTable, IRoleTable, IUserRoleTable>;
};

export type TUserPhoneNumberAssociations = {

};

export type TRoleAssociations = {

};
