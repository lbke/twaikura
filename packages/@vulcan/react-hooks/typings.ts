import { MutationHookOptions } from "@apollo/react-hooks";
import { VulcanModel } from "@vulcan/model";

export interface VulcanMutationHookOptions {
  model: VulcanModel;
  fragment?: string;
  fragmentName?: string;
  mutationOptions?: MutationHookOptions;
}
