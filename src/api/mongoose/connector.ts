import { Connector } from "@vulcanjs/graphql";
import { VulcanModel } from "@vulcanjs/model";
import * as mongoose from "mongoose";
export const createMongooseConnector = (model: VulcanModel): Connector => {
  // 1. retrieve or create the mongoose model
  // TODO: get a better key than "model.name" eg "model.mongo.collectionName"
  let MongooseModel = mongoose.models[model.name];
  if (!MongooseModel) {
    // TODO: compute a Mongoose schema from a VulcanSchema automatically
    const schema = new mongoose.Schema({});
    // TODO: get name from a custom "model.mongo" option, using the model extension system like for graphql
    MongooseModel = mongoose.model(model.name, schema);
  }
  // 2. create the connector
  return {
    find: async () => [],
    findOne: async (selector) => {
      return await MongooseModel.findOne(selector).exec();
    },
    findOneById: async () => ({}),
    filter: () => ({ selector: {}, filteredFields: [], options: {} }),
    count: async (selector) => {
      return await MongooseModel.count(selector);
    },
    create: async (document) => {
      const mongooseDocument = new MongooseModel(document);
      const createdDocument = await mongooseDocument.save();
      console.log("createdDocument", createdDocument);
      return createdDocument;
    },
    update: async () => ({}),
    delete: async () => ({}),
  };
};
