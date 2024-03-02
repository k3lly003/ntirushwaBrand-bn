// import { Schema, model } from "mongoose";
// import { Likes } from "../utils/types";

// const LikeSchema = new Schema<Likes>(
//   {
//     blogId: {
//       type: String,
//     },
//     userId: {
//       type: String,
//     },
//     blogLike: {
//       type: Boolean,
//     },
//   },
//   { timestamps: true }
// );

// export const blogLike = model<Likes>("userLike", LikeSchema);
import { Schema, model } from "mongoose";
import { Message } from "../utils/types";

const messageSchema = new Schema<Message>(
  {
    email: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const message = model<Message>("Message", messageSchema);
