import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Blog, CreateBlogInput, UpdateBlogInput } from './blogs.dto';
import { BlogsService } from './blogs.service';

@Resolver(() => Blog)
export class BlogsResolver {

  constructor(private readonly blogsService: BlogsService) { }

  @Query(() => [Blog], { name: 'getBlogs' }) // Query to fetch all blogs
  getBlogs() {
    return this.blogsService.getData();
  }

  @Query(() => Blog) // Define a query that returns a single Blog
  async getPostById(@Args('id') id: string): Promise<Blog> {
    return this.blogsService.getBlogById(id);
  }

  @Mutation(() => Blog)
  async createBlog(@Args('input') createBlogInput: CreateBlogInput) {
    return this.blogsService.createBlog(createBlogInput);
  }

  @Mutation(() => Blog)
  async updatePost(
    @Args('id') id: string, // The ID of the blog post to update
    @Args('input') input: UpdateBlogInput, // The update data
  ): Promise<Blog> {
    return this.blogsService.updateBlog(id, input);
  }

  @Mutation(() => Boolean) // Define a mutation that returns a boolean
  async deletePost(@Args('id') id: string): Promise<boolean> {
    await this.blogsService.deleteBlog(id);
    return true; // Return true to indicate success
  }
}