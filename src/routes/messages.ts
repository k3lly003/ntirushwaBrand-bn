import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.post("/create", (req: Request, res: Response, next: NextFunction) => {});
router.get(
  "/read_all",
  (req: Request, res: Response, next: NextFunction) => {}
);
router.get(
  "/:message_id/read",
  (req: Request, res: Response, next: NextFunction) => {}
);
router.put(
  "/:message_id/delete",
  (req: Request, res: Response, next: NextFunction) => {}
);

export {};
