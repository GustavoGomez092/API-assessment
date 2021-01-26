import { Service } from "typedi";
import PostRoute from "./post";
import AuthRoute from "./auth";


@Service()
export default class Routes {
  constructor(
    private authRoute: AuthRoute,
    private postRoute: PostRoute
  ) {}
  
  getRoutes() {
    return Object.values(this)
  }
}