import { User } from "../entities";
import * as Argon from "argon2";
import { Context } from "src/types";
import { issueJWT, verifyJWT } from "../passport";
require("dotenv").config({ path: "../../.env" });
import {
  Arg,
  Mutation,
  Query,
  Resolver,
  InputType,
  Field,
  ObjectType,
  Ctx,
} from "type-graphql";

// List all users
// Search User by id or email
// find all Posts of this user
// create user
// update user
// Delete user
@InputType()
class UserOptions {
  @Field()
  username: string;
  @Field()
  email?: string;
  @Field()
  password!: string;
}
@ObjectType()
class Error {
  @Field(() => String, { nullable: true })
  error: string;
  @Field(() => String, { nullable: true })
  errorCode: string;
  @Field(() => String, { nullable: true })
  context?: string;
}

@ObjectType()
class AuthResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => Error, { nullable: true })
  error?: Error;
}

@Resolver()
export class UserController {
  @Query(() => User)
  async Me(): Promise<User> {
    // get user obj from jwt
    const user: User = verifyJWT()
    
    return await User.find(user);
  }
  @Query(() => [User])
  async allUsers(): Promise<User[]> {
    return await User.find();
  }
  @Query(() => User, { nullable: true })
  userByIdOrEmail(@Arg("id") id: number): Promise<User | null> {
    return User.findOneBy({ id });
  }
  @Mutation(() => AuthResponse, { nullable: true })
  async login(
    @Arg("options", () => UserOptions) options: UserOptions,
    @Ctx() context: Context
  ) {
    // find user, if user doesnt exist throw error

    const user = await User.findOneBy(
      { username: options.username } || { email: options.email }
    );

    if (user === null || user === undefined) {
      return {
        success: false,
        error: {
          error: "User Doesnt Exist",
          errorCode: "401 Unauthorized",
          context: "",
        },
      };
    }

    const match = await Argon.verify(user.password, options.password);

    if (!match) {
      return {
        success: false,
        error: {
          error: "Incorrect Credentials",
          errorCode: "401 Unauthorized",
          context: "",
        },
      };
    }

    const { password, ...payload } = user;
    console.log("secret", process.env.JWT_SECRET);
    // Sign token
    const token = issueJWT(payload);

    return {
      success: true,
      user: payload,
      token,
    };
  }
  @Mutation(() => AuthResponse, { nullable: true })
  async register(
    @Arg("options", () => UserOptions) options: UserOptions,
    @Ctx() context: Context
  ): Promise<AuthResponse | Error> {
    if (!options.username || !options.password)
      return {
        success: false,
        error: "Invalid Credentials",
        errorCode: "401 Unauthorized",
        context: "Recieved non-Empty string",
      };

    if (options.username.length <= 2 || options.password.length < 5)
      return {
        success: false,
        error: "Invalid Credentials",
        errorCode: "401 Unauthorized",
        context: "Credentials Too Weak",
      };

    if (options.email) {
      let email = options.email;

      if (!email.includes("@") && !email.includes("."))
        return {
          success: false,
          error: "Invalid Credentials",
          errorCode: "401 Unauthorized",
          context: "Incorrect email format",
        };
    }

    const hashedpassword = await Argon.hash(options.password);
    const user = await User.create({
      username: options.username,
      email: options.email,
      password: hashedpassword,
    }).save();

    const { password, ...payload } = user;

    const token = issueJWT(payload);

    return {
      success: true,
      user: payload,
      token,
    } as AuthResponse;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number): Promise<Boolean> {
    await User.delete(id);
    return true;
  }
}
