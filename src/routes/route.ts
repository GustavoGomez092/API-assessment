import { Router } from "express";

export default class Route {
  router!: Router
  name!: string
  
  constructor(name: string) {
    this.router = Router()
    this.name = name  
  }
}