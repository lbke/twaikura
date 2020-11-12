import { Connector } from "@vulcanjs/graphql";
import { VulcanModel } from "@vulcanjs/model";
import * as mongoose from "mongoose";
export const createMongooseConnector = (model: VulcanModel): Connector => {
  // 1. retrieve or create the mongoose model
  // TODO: get a better key than "model.name" eg "model.mongo.collectionName"
  let mongooseModel = mongoose.models[model.name];
  if (!mongooseModel) {
    // TODO: compute a Mongoose schema from a VulcanSchema automatically
    const schema = new mongoose.Schema({});
    // TODO: get name from a custom "model.mongo" option, using the model extension system like for graphql
    mongooseModel = mongoose.model(model.name, schema);
  }
  // 2. create the connector
  return {
    find: async () => [],
    findOne: async (selector) => {
      return await mongooseModel.findOne(selector).exec();
    },
    findOneById: async () => ({}),
    filter: () => ({ selector: {}, filteredFields: [], options: {} }),
    count: async (selector) => 0,
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  };
};
