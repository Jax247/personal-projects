import { Post } from "../entities/";
// import passport from "passport";
import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Int,
  Field,
  // InputType,
  Args,
  ArgsType,
} from "type-graphql";

@ArgsType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

// TODO:
// find all for one creators

@Resolver()
export class PostController {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return Post.find();
  }
  @Query(() => Post, { nullable: true })
  findPost(@Arg("id") id: number): Promise<Post | null> {
    return Post.findOneBy({ id });
  }

  @Query(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Arg("text") text: string
  ): Promise<Post> {
    return await Post.create({
       title: title,
       text: text 
      }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async editPost(
    @Arg("id", () => Int) id: number,
    @Args() { title, text }: PostInput
  ): Promise<Post | null> {
    let post = await this.findPost(id);
    let newData = {
      title: title ? title : "",
      text: text ? text : "",
    };

    if (!post) return null;

    await Post.update(id, newData);
    return post as Post;
  }
  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<Boolean> {
    await Post.delete(id);
    return true;
  }
}
