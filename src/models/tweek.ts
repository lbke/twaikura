import { VulcanModel } from "@vulcan/model";
const Tweek: VulcanModel = {
  options: {
    graphql: {
      typeName: "Tweek", // TODO: automatically create from a modelName property
      multiTypeName: "Tweeks",
      multiResolverName: "multi", // TODO: fix, and create a createModel function to facilitate this
    },
  },
  schema: {
    _id: {
      type: String,
      optional: true,
      canRead: ["guests"],
    },
    createdAt: {
      type: Date,
      optional: true,
      canRead: ["guests"],
      onCreate: ({ newDocument, currentUser }) => {
        return new Date();
      },
    },
    // userId: {
    //   type: String,
    //   optional: true,
    //   canRead: ['guests'],
    //   resolveAs: {
    //     fieldName: 'user',
    //     type: 'User',
    //     resolver: (movie, args, context) => {
    //       return context.Users.findOne({ _id: movie.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
    //     },
    //     addOriginalField: true
    //   }
    // },
    text: {
      type: String,
      optional: false,
      canRead: ["guests"],
      canCreate: ["guests"],
      canUpdate: ["admins"],
      max: 120,
      input: "textarea",
    },
    twaikId: {
      type: String,
      optional: true,
      input: "select",
      canRead: ["guests"],
      canCreate: ["guests"],
      canUpdate: ["admins"],
      relation: {
        fieldName: "twaik",
        typeName: "Twaik",
        kind: "hasOne",
      },
    },
  },
};
export default Tweek;
