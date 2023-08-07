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
      role: UsersPermissionsMeRole
      companyName: String
      companyNumber: String
      companyPaper: UploadFile
      business: Business
      created_at: DateTime
      bank: String
      account: String
      team: Team
      rank: Rank
      goalActive: Boolean
      confirmed: Boolean
      counselorStatus: String
    }
    input UsersPermissionsRegisterInput {
      role: ID
      username: String!
      email: String!
      password: String!
      name: String
      companyName: String
      companyNumber: String
      companyPaper: ID
      authNumber: Int
      phone: String
      bank: String
      businessID: String
      account: String
      confirmed: Boolean
      counselorStatus: String

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
  mutation: ``,
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
