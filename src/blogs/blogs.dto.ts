import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';

@ObjectType()
export class Blog {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  imageUrl: string;

  @Field()
  isPublish: boolean;

  @Field(() => [String], { nullable: true })
  reference: string[];

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}

@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field({defaultValue: false, nullable: true})
  isPublish: boolean;

  @Field({ nullable: true }) // Make imageUrl optional
  imageUrl?: string;

  @Field(() => [String], { nullable: true }) // Make reference optional
  reference?: string[];
}

@InputType()
export class UpdateBlogInput {
  @Field({ nullable: true }) // Make fields optional
  title?: string; // Title field is optional and can be of any type

  @Field({ nullable: true }) // Make fields optional
  content?: string; // Content field is optional and can be of any type

  @Field({ defaultValue: false, nullable: true })
  isPublish: boolean;
}