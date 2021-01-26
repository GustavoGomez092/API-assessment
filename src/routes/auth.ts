import { Request, Response } from "express";
import { Service } from "typedi";
import AuthService from "../services/auth";
import Route from "./route";

@Service()
export default class AuthRoute extends Route {
  constructor(
    private auth: AuthService
  ) {
    super('/auth')
    this.router.post('/login', this.login)
    this.router.post('/signup', this.signup)
  }

  login = async (req: Request, res: Response):Promise<void> => {
    try {
      // get token
      const token = await this.auth.login(req.body)
      res.status(200).json({code: 200, token}) 
    } catch (error) {
      res.status(400).json({code: 401, message: error.message})
    }
  }

  signup = async (req: Request, res: Response):Promise<void> => {
    try {
      const user = await this.auth.signup(req.body)
      res.status(200).json({code: 200, user}) 
    } catch (error) {
      res.status(400).json({code: 400, message: error.message})
    }
  }
}