import { Service } from "typedi";
import { getModelForClass, prop, pre } from "@typegoose/typegoose"
import { ModelType } from "@typegoose/typegoose/lib/types";
import {
  Length,
  IsEmail,
  IsDefined
} from 'class-validator';
import argon2 from "argon2";

@pre<User>('save', async function(next): Promise<void> {
  try {
    if(this.isNew) {
      // hash the password
      const hashedPassword = await argon2.hash(this.password)
      this.password = hashedPassword
    }
    
    const user = new User()

    const foundUser = await user.getModel.findOne({'email': this.email})

    if (foundUser) throw new Error('Email already in use')

    next()
  } catch (error) {
    return next(new Error(error))
  }
})

@Service()
export default class User {
  @prop({ required: true })
  @IsDefined({message: "Name is required"})
  @Length(1, 50, {message: "Name must be between 1 and 50 characters"})
  public name!: string

  @prop({ required: true })
  @IsDefined({message: "Email is required"})
  @IsEmail({}, {message: "invalid email address"})
  public email!: string

  @prop({ required: true })
  @IsDefined({message: "Password is required"})
  @Length(6, 16, {message: "password must be between 6 and 16 characters"})
  public password!: string

  get getModel(): ModelType<User> {
    return getModelForClass(User)
  }
}