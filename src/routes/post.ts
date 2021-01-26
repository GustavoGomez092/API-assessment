import { request, Request, Response } from "express";
import { Service } from "typedi";
import Auth from "../middlewares/AuthHandler";
import PostService from "../services/post";
import Route from "./route";

@Service()
export default class PostRoute extends Route {
  constructor(
    private authMiddleware: Auth,
    private postService: PostService
  ) {
    super('/post')
    this.router.use(this.authMiddleware.handle)
    this.router.post('/', this.post)
    this.router.get('/', this.get)
    this.router.get('/:postId', this.get)
    this.router.delete('/:postId', this.delete)
    this.router.put('/:postId', this.put)
  }

  post = async (req: Request, res: Response):Promise<void> => {
    try {
      // get all user posts
      const newPost = await this.postService.createPost(req)
      res.status(200).json({code: 200, data: newPost})
    } catch (error) {
      res.status(400).json({code: 400, message: error.message})
    }
  }

  get = async (req: Request, res: Response): Promise<Response> => {
    try {      
      // verify if we have a post id
      if(!req?.params?.postId) {
        // get all user posts
        const allPosts = await this.postService.getMyPosts(req)
        return res.status(200).json({code: 200, data: allPosts})
      }

      // get post by id
      const post = await this.postService.getPostById(req)
      return res.status(200).json({code: 200, data: post})

    } catch (error) {
      return res.status(400).json({code: 400, message: error.message})
    }
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {      
      // verify if we have a post id
      if(!req?.params?.postId) throw new Error('no post id provided')

      // delete found post
      const deleted = await this.postService.deletePostById(req)
      return res.status(200).json({code: 200, data: deleted})
    } catch (error) {
      return res.status(400).json({code: 400, message: error.message})
    }
  }

  put = async (req: Request, res: Response): Promise<Response> => {
    try {      
      // verify if we have a post id
      if(!req?.params?.postId) throw new Error('no post id provided')

      // process update 
      const updatedPost = await this.postService.editPostById(req)
      return res.status(200).json({code: 200, data: updatedPost})
    } catch (error) {
      return res.status(400).json({code: 400, message: error.message})
    }
  }

}