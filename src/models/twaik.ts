/**
 * Second half of a Twaiky,
 * created by the community
 */
import {
  createGraphqlModel,
  VulcanGraphqlModel,
  buildDefaultQueryResolvers,
  buildDefaultMutationResolvers,
} from "@vulcanjs/graphql";
import { CanReadFunction } from "@vulcanjs/model";
import { TweekType } from "./tweek";

const typeName = "Twaik";
const multiTypeName = "Twaiks";

const canReadTwaik: CanReadFunction = ({ user, document }) => {
  const twaik = document as TwaikType; // TODO: should be typed already using a generic
  if (user) return true;
  if (twaik?.isValid) return true;
  return false;
};
const Twaik = createGraphqlModel({
  name: typeName,
  graphql: {
    typeName, // TODO: automatically create from a modelName property
    multiTypeName,
    queryResolvers: buildDefaultQueryResolvers({ typeName }),
    mutationResolvers: buildDefaultMutationResolvers({ typeName }),
  },

  permissions: {
    canRead: canReadTwaik,
    canCreate: ["guests"],
    canUpdate: ["admins"],
    canDelete: ["admins"],
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
    isValid: {
      type: Boolean,
      optional: true,
      input: "checkbox",
      canRead: ["guests"],
      canCreate: ["guests"],
      canUpdate: ["admins"],
    },
  },
}) as VulcanGraphqlModel;

export interface TwaikType {
  _id: string;
  createdAt: Date;
  text: string;
  twaikId: string;
  tweek?: TweekType;
  isValid?: boolean;
}

export default Twaik;
