import { Request, Response } from "express";
import { querry } from "../models/querriesModel";

export const createQuerries = async (req: Request, res: Response) => {
  try {
    const clientQuery = new querry({
      client_info: req.body.client,
      client_budget: req.body.budget,
      client_message: req.body.message,
    });
    const query = await clientQuery.save();
    res.status(200);
    res.send(query);
  } catch (error) {
    res.status(500);
    res.send({ error: "Validation failed " });
  }
};

export const getQuerries = async (req: Request, res: Response) => {
  const allqueries = await querry.find();
  if (allqueries) {
    res.status(200);
    res.send(allqueries);
  } else {
    res.status(404);
    res.send({ message: "no client querries found in record" });
  }
};

export const deleteQuerries = async (req: Request, res: Response) => {
  try {
    await querry.deleteOne({ _id: req.params.id });
    res.send({ message: "Client Querry is deleted" });
  } catch {
    res.status(404);
    res.send({ error: "Querry doesn't exist!" });
  }
};
