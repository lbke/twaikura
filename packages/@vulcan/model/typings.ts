import { VulcanSchema } from "@vulcan/schema";

type FilterFunction = (args: {
  input: any;
  context: any;
  filterArguments: any;
}) => { selector: Object; options: Object };

export interface VulcanModel {
  options: {
    graphql: {
      typeName: string;
      multiTypeName: string; // plural name for the multi resolver
      multiResolverName: string;
    };
    customFilters: Array<{ name: string; filter: FilterFunction }>;
  };
  schema: VulcanSchema;
}
