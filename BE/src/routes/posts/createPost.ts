import { createPost as ctrlCreatePost } from '@controllers/post';
import ClassValidationError from '@/errors/validationError';
import Post, { type PostResponse } from '@models/post';
import { type ControllerParams } from '@ts-types/general-types';
import { cleanErrors } from '@/utils/helpers/cleanErrors';
import { validateOrReject, type ValidationError } from 'class-validator';

/**
 * Create a new post
 * @param {ControllerParams} options the controller parameters
 * @returns {Promise<PostResponse>} the created post
 */
const createPost = async (options: ControllerParams): Promise<PostResponse> => {
  const { body, user } = options;
  
  if (!body) {
    throw new Error('Invalid post data');
  }
  if (!user?.id) {
    throw new Error('User not authenticated');
  }
  
  // Add user_id from authenticated user
  const postData = {
    ...body,
    user_id: user.id,
  };
  
  const data = new Post(postData);
  // Skip validation for missing properties (id, created_at, updated_at will be auto-generated)
  await validateOrReject(data, { skipMissingProperties: true }).catch((errors) => {
    throw new ClassValidationError('An issue occurred during validation', cleanErrors(errors as ValidationError[]));
  });
  
  const post = await ctrlCreatePost(data);

  if (!post?.id) {
    throw new Error('Something went wrong creating post');
  }

  return {
    data: post,
  };
};

export default createPost;
