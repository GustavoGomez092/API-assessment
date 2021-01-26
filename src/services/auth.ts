import { validateOrReject } from "class-validator";
import { Service } from "typedi";
import config from "../config";
import User from "../models/user";
import jwt from "jsonwebtoken";
import argon2 from "argon2";


@Service()
export default class AuthService {
  secret:string
  tokenExpiration: string
  constructor(
    private user: User
  ){
    this.secret = config.JWT_SECRET
    this.tokenExpiration = config.TOKEN_EXP
  }

  async login(loginData:LoginData): Promise<string> {
    try {
      // get login data
      const email = loginData.email
      const password = loginData.password

      // verify if user exists
      const foundUser = await this.user.getModel.findOne({email})
      if (!foundUser) throw new Error('Email or password invalid')
      
      // if user exists verify password
      const validPass = await argon2.verify(foundUser.password, password)
      if(!validPass) throw new Error('Email or password invalid')

      // create payload
      const payload: Payload = { id: foundUser.id }

      // return JWT
      const token = jwt.sign(payload, this.secret, {expiresIn: this.tokenExpiration });

      return token
    } catch (error) {
      throw new Error(error)
    }

  }

  async signup(userData: UserData):Promise<any> {
    try {
      //get userInfo
      this.user.name = userData.name
      this.user.email = userData.email
      this.user.password = userData.password

      // validate data
      await validateOrReject(this.user);

      // create user
      const userDoc = await this.user.getModel.create(userData)
      const {__v, password, ...user} = userDoc.toJSON()
      // return the user
      return user
    } catch (errors) {
      if(Array.isArray(errors)) {
        errors = JSON.stringify(errors.map((error: any)=> error.constraints))
      }
      throw new Error(errors)
    }
  }
}