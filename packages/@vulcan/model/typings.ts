export interface VulcanModel {
  options: {
    graphql: {
      typeName: string;
      multiTypeName: string; // plural name for the multi resolver
      multiResolverName: string;
    };
  };
  schema: any; // VulcanSchema
}
