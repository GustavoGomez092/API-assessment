import { validateOrReject } from "class-validator";
import { Request } from "express";
import { Service } from "typedi";
import Post from "../models/post";

@Service()
export default class PostService {
  constructor(
    private post: Post
  ) {}
  
  async createPost(req: Request): Promise<Post> {
    try {
      // get data
      const userId = req.context!.id
      const postData: PostData = req.body 

      // validate data
      this.post.owner = userId
      this.post.content = postData.content
      await validateOrReject(this.post);

      // create the post
      const newPost = await this.post.getModel.create({owner: userId, content: postData.content})

      // return created post
      const {__v, ...post} = newPost.toJSON()
      return post
    } catch (errors) {
      if(Array.isArray(errors)) {
        errors = JSON.stringify(errors.map((error: any)=> error.constraints))
      }
      throw new Error(errors)
    }
  }

  async getMyPosts(req: Request): Promise<Post[]> {
    try {
      // get user ID
      const userId = req.context!.id

      // get all user posts
      const allPosts = await this.post.getModel.find({owner: userId})

      // return data 
      const posts = allPosts.map((x:any)=> {
        const {__v, ...postData} = x.toJSON()
        return postData
      })
      return posts
    } catch (error) {
      throw new Error(error)
    }
  }

  async getPostById(req: Request): Promise<Post> {
    try {
      // get post id
      const postId = req.params.postId

      // get user ID
      const userId = req.context!.id
      
      // find the post
      const foundPost = await this.post.getModel.findOne({
        owner: userId,
        _id: postId
      })

      if(!foundPost) throw new Error('Post not found')

      // return the post
      const {__v, ...post} = foundPost.toJSON()
      return post
    } catch (error) {
      throw new Error(error)
    }
  }

  async deletePostById(req:Request): Promise<string> {
    try {
      // get the post id
      const postId = req.params.postId

      // get user id
      const userId = req.context!.id

      // find the post and delete it
      const {ok, deletedCount} = await this.post.getModel.deleteOne({
        owner: userId,
        _id: postId
      })

      if(!ok || !deletedCount) throw new Error('No post found with that id')

      // return post deleted
      return 'Post deleted successfully'
    } catch (error) {
      throw new Error(error)
    }
  }

  async editPostById(req: Request): Promise<Post> {
    try {
      // get post id
      const postId = req.params.postId
      const newContent:PostData = req.body

      // get user ID
      const userId = req.context!.id
      
      // validate new post data
      this.post.content = newContent.content
      this.post.owner = userId
      await validateOrReject(this.post);

      // update the post
      const postToUpdate = await this.post.getModel.findOneAndUpdate({
        owner: userId,
        _id: postId
      },{
        content: newContent.content
      }, { lean: true, new: true })
      
      // if no doc to update found
      if(!postToUpdate) throw new Error('Post not found with given ID')

      // return the post
      const {__v, ...post} = postToUpdate
      return post
    } catch (error) {
      if(Array.isArray(error)) {
        error = JSON.stringify(error.map((error: any)=> error.constraints))
      }
      throw new Error(error)
    }
  }
}