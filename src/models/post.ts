import { getModelForClass, prop } from "@typegoose/typegoose"
import { IsDefined, Length } from "class-validator"
import { Service } from "typedi"
import User from './user'

@Service()
export default class Post {
  @prop({ required: true })
  public owner!: string

  @prop({ required: true })
  @IsDefined({message: 'Content is required'})
  @Length(1, 100, {message: 'your post content should be between 1 and 100 characters'})
  public content!: string

  get getModel() {
    return getModelForClass(Post)
  }
}