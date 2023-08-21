const _ = require("lodash");
module.exports = {
  type: {
    UsersPermissionsPermission: false, // Make this type NOT queriable.
  },
  definition: /* GraphQL */ `
    type UsersPermissionsMe {
      id: ID!
      name: String!
      username: String!
      email: String!
      blocked: Boolean
      role: UsersPermissionsMeRole
      bank: String
      phoneNumber: String
      salesPhoneNumber: String
      accountNumber: String
      businessRegistration: UploadFile
      profile: UploadFile
      copyAccount: UploadFile
      employmentContract: UploadFile
      iD_Card: UploadFile
      businessID: String
      teamID: String
      company: String
      rankID: String
      editLog: JSON
      businessNumber: String
      workingStatus: Boolean
    }
    input UsersPermissionsRegisterInput {
      role: ID
      username: String!
      email: String!
      password: String!
      bank: String
      phoneNumber: String
      salesPhoneNumber: String
      businessNumber: String
      accountNumber: String
      businessRegistration: ID
      profile: ID
      copyAccount: ID
      employmentContract: ID
      iD_Card: ID
      businessID: String
      company: String
      rankID: String
      editLog: JSON
      name: String
    }
    input userInfoEditData {
      businessRegistration: ID
      profile: ID
      copyAccount: ID
      employmentContract: ID
      iD_Card: ID
      teamID: String
      rankID: String
      phoneNumber: String
      bank: String
      accountNumber: String
      salesPhoneNumber: String
      businessNumber: String
      businessID: String
    }
    type emailDuplicate {
      duplicate: JSON
    }
    type phoneDuplicate {
      duplicate: JSON
    }
    type count {
      count: JSON
    }
    type times {
      times: JSON
    }
  `,
  query: `emailDuplicate(where: JSON): emailDuplicate`,
  mutation: `
  `,
  resolver: {
    Query: {
      emailDuplicate: {
        description: "Return emailDuplicate",
        resolver: "application::send-sms.send-sms.emailDuplicate",
      },
    },
    Mutation: {},
  },
};
