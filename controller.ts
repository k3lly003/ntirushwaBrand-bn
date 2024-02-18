import Blog from "./src/models/blogModels";
import bcrypt from "bcrypt";
import { AppError } from "./src/middleware/error.middleware";


export const getBlog = async (
    req: Request,
    res: Response,
    next: NextFunction
=>{

});

export const updateBlog = async (
    req: Request,
    res: Response,
    next:NextFunction
=>{
    try{
        const {_id, content} = req.blog;
        const blog = await Blog.findOne({_id,email})
        if(!blog) {
            throw new AppError(401, "blog does not exist!")
        }
        res.status(200).send({
            message:"blog exists",
            success: true,
            data: blog
        })
    }
    catch{}

});

export const deactivateBlog = async (
    req: Request,
    res: Response,
    next:NextFunction
=>{

});