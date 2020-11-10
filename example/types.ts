import { CountryCode } from '@bluejay/countries';
import { ITable, TBelongsToAssociation, TBelongsToManyAssociation, THasManyAssociation, THasOneAssociation } from '../src';
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
  country_id: TCountry['id'];
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
  // We can't simply use IUserTable here, as it would result in a cyclic dependency.
  inviter: THasOneAssociation<'inviter', IUserTable, ITable<TUser, Omit<TUserAssociations, 'inviter'>>>;
  country: TBelongsToAssociation<'country', IUserTable, ICountryTable>;
};

export type TUserPhoneNumberAssociations = {
  user: TBelongsToAssociation<'user', IUserPhoneNumberTable, ITable<TUser, Omit<TUserAssociations, 'phone_numbers' | 'inviter'>>>;
  country: TBelongsToAssociation<'country', IUserPhoneNumberTable, ICountryTable>;
};

export type TRoleAssociations = {
  users: TBelongsToManyAssociation<'users', IRoleTable, ITable<TUser, Omit<TUserAssociations, 'roles' | 'phone_numbers' | 'inviter'>>, IUserRoleTable>;
};
