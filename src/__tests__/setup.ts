import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
let mongo: any;
jest.setTimeout(60000);

// befor running all tests first create new mongodb instance
beforeAll(async () => {
  process.env.SECRET_KEY = "asdf";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});
// before each test clean up/ reset  all mongo collections
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
// after all tests stop the running mongodb instance and close mongodb connection
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
