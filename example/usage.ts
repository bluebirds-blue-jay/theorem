import { CountryCode } from '@bluejay/countries';
import { AssociationKind } from '../';
import { countryTable, roleTable, userPhoneNumberTable, userRoleTable, userTable } from './tables';
import { PhoneNumberPurpose } from './types';

userTable.associate({
  phone_numbers: {
    kind: AssociationKind.HAS_MANY,
    column: 'id',
    targetTable: userPhoneNumberTable,
    targetColumn: 'user_id'
  },
  country: {
    kind: AssociationKind.BELONGS_TO,
    column: 'country_id',
    targetTable: countryTable,
    targetColumn: 'id'
  },
  roles: {
    kind: AssociationKind.BELONGS_TO_MANY,
    column: 'id',
    targetTable: roleTable,
    targetColumn: 'id',
    middleTable: userRoleTable,
    middleColumn: 'user_id'
  }
});

userPhoneNumberTable.associate({
  user: {
    kind: AssociationKind.BELONGS_TO,
    column: 'user_id',
    targetTable: userTable,
    targetColumn: 'id'
  }
});

roleTable.associate({
  users: {
    kind: AssociationKind.BELONGS_TO_MANY,
    column: 'id',
    targetTable: userTable,
    targetColumn: 'id',
    middleTable: userRoleTable,
    middleColumn: 'role_id'
  }
});

Promise.resolve().then(async () => {
  const [sweden, usa] = await countryTable.create([{ code: CountryCode.SE }, { code: CountryCode.US }]);

  const [customerRole, adminRole] = await roleTable.create([{ identifier: 'customer' }, { identifier: 'admin' }]);

  const john = await userTable.create({
    email: 'john@theorem.com',
    first_name: 'John',
    last_name: 'Doe',
    country_id: sweden.id
  });

  const jane = await userTable.create({
    email: 'jane@theorem.com',
    first_name: 'Jane',
    last_name: 'Doe',
    country_id: usa.id
  });

  await userPhoneNumberTable.create([
    { user_id: john.id, value: '+46705552068', purpose: PhoneNumberPurpose.PERSONAL },
    { user_id: jane.id, value: '+14155557821', purpose: PhoneNumberPurpose.PERSONAL }
  ]);

  await userRoleTable.create([
    { user_id: john.id, role_id: customerRole.id },
    { user_id: jane.id, role_id: adminRole.id }
  ]);

  // Find user his first_name
  await userTable.findOne({ first_name: 'John' });

  // Find users without a birth_date
  await userTable.findOne({ birth_date: null });
  await userTable.findOne({ birth_date: { isNull: true } });

  // Find user whose name starts by J
  await userTable.find({ first_name: { like: 'J%' } });

  // Find users from Sweden OR USA
  await userTable.find({ country_id: { in: [sweden.id, usa.id] } });

  // Find user with given phone number
  // await userTable.findOne({
  //   phone_numbers: {
  //     value: '+14155557821',
  //     purpose: PhoneNumberPurpose.PERSONAL
  //   }
  // });


});