import "reflect-metadata";
import { Application, NextFunction, Request, Response } from "express";
import Container, { Service } from "typedi";
import config from "./config";
import Loaders from "./loaders";
import NotFound from "./middlewares/404handler";


@Service()
class Server {
  port: number
  env:string
  constructor(
    private loaders: Loaders,
    private notFound: NotFound
  ) {
    this.port = config.PORT as number
    this.env = config.NODE_ENV as string
  }

  async waitForLoaders(): Promise<Application> {
    try {
      const server = await this.loaders.init()
      return server
    } catch (error) {
      throw new Error(error)
    }
  }

  async init(): Promise<void> {
    try {
      
      // wait for loaders
      const server = await this.waitForLoaders()
      
      // Get the port
      const thePort = this.env === 'develop' ? this.port : process.env.PORT

      // Start server
      server.listen(
        thePort,
        () => console.log(`server Initialized & runing at http://localhost:${thePort}`)
      )

      // Handle not found
      server.use((__: Error, _:Request, res: Response, next: NextFunction)=>this.globalError(res))
      server.use(this.notFound.handle)
    } catch (error) {
      throw new Error(error)
    }
  }

  globalError (res: Response) {
    res.json({code: 500, message: 'Internal server error'})
  }
}
const server = Container.get(Server)
server.init()