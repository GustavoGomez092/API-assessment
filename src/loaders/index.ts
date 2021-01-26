import { Application } from "express";
import { Service } from "typedi";
import ExpressLoader from "./expressLoader";
import MongoLoader from "./mongoLoader";

@Service()
export default class Loaders {
  constructor (
    private express: ExpressLoader,
    private mongo: MongoLoader
  ) {}

  async init(): Promise<Application> {
    try {
      const app = this.express.init()
      await this.mongo.init()
      return app
    } catch (error) {
      throw new Error(error)
    }
  }
}