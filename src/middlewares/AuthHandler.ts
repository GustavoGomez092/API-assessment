import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Service } from "typedi";
import config from "../config";
import User from "../models/user";

@Service()
export default class Auth {

  constructor(
    private user: User
  ){}
  
  handle = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {

      const headers = req.headers

      // check if auth header sent
      if(!headers.authorization) throw new Error('No auth headers found')

      // get bare token
      const token = headers.authorization.split(" ")[1]

      // validate token & integrity
      if (!token) throw new Error('No token provided or auth header malformed')

      // if token, validate JWT
      const payload = jwt.verify(token, config.JWT_SECRET) as Payload

      // add payload to context
      req.context = payload

      // verify if user ID from payload exists
      const user = await this.user.getModel.findById(payload.id)

      // if no user throw error
      if (!user) throw new Error('Unauthorized')

      next()
    } catch (error) {
      res.status(401).json({code: 401, message: error.message})
    }
  }
}