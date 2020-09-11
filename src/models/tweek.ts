import { createModel } from "@vulcan/model";
import {
  extendModel as extendModelWithGraphql,
  VulcanGraphqlModel,
} from "@vulcan/graphql";
const Tweek = createModel({
  name: "Tweek",
  extensions: [
    extendModelWithGraphql({
      typeName: "Tweek", // TODO: automatically create from a modelName property
      multiTypeName: "Tweeks",
    }),
  ],
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
}) as VulcanGraphqlModel;

export default Tweek;
