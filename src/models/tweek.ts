import {
  extendModel as extendModelWithGraphql,
  VulcanGraphqlModel,
  buildDefaultQueryResolvers,
  buildDefaultMutationResolvers,
  createGraphqlModel,
} from "@vulcanjs/graphql";

const typeName = "Tweek";
const Tweek = createGraphqlModel({
  name: "Tweek",
  graphql: {
    typeName, // TODO: automatically create from a modelName property
    multiTypeName: "Tweeks",
    queryResolvers: buildDefaultQueryResolvers({ typeName }),
    mutationResolvers: buildDefaultMutationResolvers({ typeName }),
  },
  permissions: {
    canRead: ["guests"],
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
    /*
    Instead the Twaik (end of a twaiku) has a beggining, but a Tweek can have a lot of Twaik
    We should instead use a virtual resolver or a paginated query
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
    },*/
  },
}) as VulcanGraphqlModel;

export interface TweekType {
  _id: string;
  createdAt: Date;
  text: string;
}

export default Tweek;
