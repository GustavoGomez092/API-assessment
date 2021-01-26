import { Request, Response } from "express";
import { Service } from "typedi";

@Service()
export default class NotFound {

  handle(_:Request, res: Response){
    return res.status(404).json({code: 404, message: 'Route not found'})
  }
}