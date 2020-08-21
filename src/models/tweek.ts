import { VulcanModel } from "@vulcan/model";
const Tweek: VulcanModel = {
  options: {
    graphql: {
      typeName: "Tweek", // TODO: automatically create from a modelName property
      multiTypeName: "Tweeks",
      multiResolverName: "multi", // TODO: fix, and create a createModel function to facilitate this
    },
  },
  schema: {},
};
export default Tweek;
