import { createModel } from "@vulcanjs/model";
import {
  extendModel as extendModelWithGraphql,
  VulcanGraphqlModel,
  buildDefaultQueryResolvers,
  buildDefaultMutationResolvers,
} from "@vulcanjs/graphql";

const typeName = "Twaik";
const multiTypeName = "Twaiks";
const Twaik = createModel({
  name: typeName,
  extensions: [
    extendModelWithGraphql({
      typeName, // TODO: automatically create from a modelName property
      multiTypeName,
      queryResolvers: buildDefaultQueryResolvers({ typeName }),
      mutationResolvers: buildDefaultMutationResolvers({ typeName }),
    }),
  ],
  permissions: {
    canRead: ["guests"],
    canCreate: ["guests"],
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
      onCreate: () => {
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
    tweekId: {
      type: String,
      optional: true,
      input: "select",
      canRead: ["guests"],
      canCreate: ["guests"],
      canUpdate: ["admins"],
      relation: {
        fieldName: "tweek",
        typeName: "Tweek",
        kind: "hasOne",
      },
    },
  },
}) as VulcanGraphqlModel;

export interface TwaikType {
  _id: string;
  createdAt: Date;
  text: string;
  twaikId: string;
}

export default Twaik;
