import { Schema, model } from "mongoose";
import { Querry } from "../utils/types";

const QuerrySchema = new Schema<Querry>(
  {
    client_info: {
      names: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
    },
    client_budget: {
      type: String,
      required: true,
    },
    client_message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const querry = model<Querry>("Clients", QuerrySchema);
