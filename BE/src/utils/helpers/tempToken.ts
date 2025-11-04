import { type TempToken } from '@ts-types/general-types';
import db from '@utils/knex';

const Knex = db();

/**
 * Create a temporary token
 * @param {TempToken} token the token to create
 * @returns {string} token string
 */
export const createTempToken = async (token: TempToken): Promise<string> => {
  const res = await Knex('temp_token').insert(token).returning('token');
  if (!res) {
    throw new Error('An error Occurred while creating token');
  }

  const tempToken = res[0] as TempToken;
  if (!tempToken.token) {
    throw new Error('An error Occurred while creating token');
  }
  return tempToken.token;
};

/**
 * Delete Token after it has been used
 * @param {string} tokenString - Token string
 * @returns { bool }
 */
export const deleteTempToken = async (tokenString: string): Promise<string> => {
  if (!tokenString) {
    throw new Error('Token not found');
  }
  return await Knex('temp_token').where('token', tokenString).del().returning('token');
};

/**
 * Get Token by token string
 * @param {string} tokenString - Token string
 * @param {string} type - type of the token
 * @returns { TempToken }
 */
export const getTempToken = async (tokenString: string, type: string): Promise<TempToken> => {
  if (!tokenString) {
    throw new Error('Token not found');
  }

  const token = (await Knex('temp_token').select('*').where('token', tokenString).first()) as TempToken;

  if (!token) {
    throw new Error('Invalid Request, Token not found');
  } else {
    const today = new Date();
    if (new Date(token.expires_at ?? today) <= today) {
      throw new Error('Invalid Request, token expired');
    }
    if (token.type !== type) {
      throw new Error('Invalid Token');
    }
  }

  return token;
};

export default { createTempToken, deleteTempToken, getTempToken };
