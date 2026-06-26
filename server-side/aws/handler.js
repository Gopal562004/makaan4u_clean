import serverless from "serverless-http";
import app from "../app.js";
import connectDB from "../config/database.js";

const serverlessHandler = serverless(app);

export const handler = async (event, context) => {
  // Ensure MongoDB is connected before handling the request
  await connectDB();
  return serverlessHandler(event, context);
};
