import mongoose from "mongoose";
import logger from "./logger.config";
import { serverConfig } from ".";


export const connectDB = async () => {
  try {
    await mongoose.connect(serverConfig.DB_URL);
    logger.info("Connected to MongoDB");


    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB connection error", { error: err });
    }); 
    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB connection lost");
    });
    mongoose.connection.on("reconnected", () => {
      logger.info("MongoDB connection reestablished");
    });
    mongoose.connection.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed due to app termination");
      process.exit(0);
    });



  } catch (error) {
    logger.error("Failed to connect to MongoDB", { error });
    process.exit(1);
  }
};