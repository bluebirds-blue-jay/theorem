import { ITable } from '../';
import { TCountry, TRole, TRoleAssociations, TUser, TUserAssociations, TUserPhoneNumber, TUserPhoneNumberAssociations, TUserRole } from './types';

export interface IUserTable extends ITable<TUser, TUserAssociations> {

}

export interface IUserPhoneNumberTable extends ITable<TUserPhoneNumber, TUserPhoneNumberAssociations> {

}

export interface IRoleTable extends ITable<TRole, TRoleAssociations> {

}

export interface IUserRoleTable extends ITable<TUserRole> {

}

export interface ICountryTable extends ITable<TCountry> {

}


export declare const userTable: IUserTable;
export declare const userPhoneNumberTable: IUserPhoneNumberTable;
export declare const roleTable: IRoleTable;
export declare const userRoleTable: IUserRoleTable;
export declare const countryTable: ICountryTable;
