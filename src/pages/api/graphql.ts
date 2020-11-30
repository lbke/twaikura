import express, { Request } from "express";
import cors from "cors";
// import mongoose from "mongoose";
import corsOptions from "~/api/cors";
import { ApolloServer /*, gql*/ } from "apollo-server-express";
import { makeExecutableSchema /*, mergeSchemas*/ } from "graphql-tools";
import mongoConnection from "~/api/middlewares/mongoConnection";
import { buildApolloSchema } from "@vulcanjs/graphql";

import Tweek from "~/models/tweek";
import Twaik from "~/models/twaik";
import { User } from "~/models/user";
import seed from "~/api/seed";

const models = [Tweek, Twaik];
const vulcanRawSchema = buildApolloSchema([...models, User]);
const vulcanSchema = makeExecutableSchema(vulcanRawSchema);

import { contextBase, contextFromReq } from "~/api/context";

seed(contextBase);

/**
 * Sample Apollo server
 */
/*
const typeDefs = gql`
  type Query {
    users: [User!]!
    restaurants: [Restaurant]
  }
  type User {
    name: String
  }
  type Restaurant {
    _id: ID!
    name: String
  }
`;
const resolvers = {
  Query: {
    users() {
      return [{ name: "Rick" }, { name: "Morty" }];
    },
    // Demo with mongoose
    // Expected the database to be setup with the demo "restaurant" API from mongoose
    async restaurants() {
      try {
        const db = mongoose.connection;
        const restaurants = db.collection("restaurants");
        // @ts-ignore
        const resultsCursor = (await restaurants.find(null, null)).limit(5);
        const results = await resultsCursor.toArray();
        return results;
      } catch (err) {
        throw err;
      }
    },
  },
};
const schema = makeExecutableSchema({ typeDefs, resolvers });

*/

// NOTE: schema stitching can cause a bad developer experience with errors
const mergedSchema = vulcanSchema; // mergeSchemas({ schemas: [vulcanSchema, schema] });

// Define the server (using Express for easier middleware usage)
const server = new ApolloServer({
  schema: mergedSchema,
  context: ({ req }) => contextFromReq(req as Request),
  introspection: process.env.NODE_ENV !== "production",
  playground:
    process.env.NODE_ENV !== "production"
      ? {
          settings: {
            "request.credentials": "include",
          },
        }
      : false,
});

const app = express();

app.set("trust proxy", true);

const gqlPath = "/api/graphql";
// setup cors
app.use(gqlPath, cors(corsOptions));
// init the db
app.use(gqlPath, mongoConnection());

server.applyMiddleware({ app, path: "/api/graphql" });

export default app;

export const config = {
  api: {
    bodyParser: false,
  },
};
