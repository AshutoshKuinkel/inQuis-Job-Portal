import mongoose from "mongoose";

export const ConnectDatabase = (DB_URI:string) => {
  mongoose.connect(DB_URI, {})
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
  };