// import { blogLike } from "../models/likeModel";
// import { Request, Response } from "express";
// import { IUser } from "../utils/userType";

// const createNewLike = async (req: Request, res: Response) => {
//   if (req.user) {
//     const user = req.user as IUser;
//     const userID = user._id;

//     const userlikes = await blogLike.findOne({
//       blogId: req.params.id,
//       userId: userID,
//     });

//     if (userlikes) {
//       userlikes.blogLike = !userlikes.blogLike;
//       await userlikes.save();
//       const TotalLike = await blogLike.countDocuments({
//         blogId: req.params.id,
//         blogLike: true,
//       });
//       const TotalDislike = await blogLike.countDocuments({
//         blogId: req.params.id,
//         blogLike: false,
//       });

//       res.send({
//         message:
//           "you are already reacted to this page and the status of your reaction is changed to like or dislike accordingly",
//         like: TotalLike,
//         dislike: TotalDislike,
//       });
//     } else {
//       const likes = new blogLike({
//         blogId: req.params.id,
//         userId: req.body.user,
//         blogLike: req.body.like,
//       });

//       const newLike = await likes.save();
//       const TotalLike = await blogLike.countDocuments({
//         blogId: req.params.id,
//         blogLike: true,
//       });

//       res.send({
//         message: `new like is added and now total like is:${TotalLike}`,
//         data: newLike,
//       });
//     }
//   } else {
//     res.status(400).json({
//       message: "something went wrong in user verification",
//     });
//   }
// };

// const getLikeStatus = async (req: Request, res: Response) => {
//   const TotalLike = await blogLike.countDocuments({
//     blogId: req.params.id,
//     blogLike: true,
//   });
//   const TotalDislike = await blogLike.countDocuments({
//     blogId: req.params.id,
//     blogLike: false,
//   });
//   res.status(200);
//   res.send({
//     Total_like: TotalLike,
//     dislike: TotalDislike,
//   });
// };

// export { createNewLike, getLikeStatus };
