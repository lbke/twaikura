import { createMutator, getModelConnector } from "@vulcanjs/graphql";
import Tweek from "~/models/tweek";
import { User } from "~/models/user";

const seed = (context) => {
  // Seeding, using the context
  const TweekConnector = getModelConnector(context, Tweek);
  // TODO: find best practices to seed in a serverless context
  // maybe define a "seed" callaback at the model level?
  const seedTweeks = async () => {
    const count = await TweekConnector.count({});
    if (count === 0) {
      console.log("No Tweeks found, seeding one");
      try {
        await TweekConnector.create({ text: "Hello world," });
      } catch (error) {
        console.error("Could not seed tweeks", error);
      }
    } else {
      console.log(`Found ${count} Tweek(s) in the database, no need to seed.`);
    }
  };

  const UserConnector = getModelConnector(context, User);

  const seedAdminUser = async () => {
    const count = await UserConnector.count({ isAdmin: true });
    if (count === 0) {
      console.log("No admin user found, seeding admin");
      const admin = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_INITIAL_PASSWORD,
        isAdmin: true,
      };
      try {
        await createMutator({
          model: User,
          data: admin,
          context,
          asAdmin: true,
          validate: false,
        });
      } catch (error) {
        console.error("Could not seed admin user", error);
      }
    } else {
      console.log(`Found ${count} Admin(s) in the database, no need to seed.`);
    }
  };

  seedTweeks();

  seedAdminUser();
};

export default seed;
