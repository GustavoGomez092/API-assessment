import express, { Application, json } from 'express'
import { Service } from 'typedi'
import Routes from '../routes'

@Service()
export default class ExpressLoader {
	
	app:Application
	
	constructor (
    private routes: Routes
  ) {
    this.app = express()
  }

  init(): Application {
    // add body parser
    this.app.use(json())
    
    // Add routes to server
    this.routes.getRoutes().forEach(({router, name})=>{
      this.app.use(name, router)
    })

    console.log('Initializing Express')
    return this.app
  }
}
