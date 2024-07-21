import jwt, { JwtPayload } from 'jsonwebtoken';

interface JWT_PAYLOAD {
  userId: string;
}

export const createJWT = (payload: JWT_PAYLOAD): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });

  return token;
};

export const verifyJWT = (token: string): JWT_PAYLOAD => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload &
      JWT_PAYLOAD;

    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'userId' in decoded
    ) {
      return decoded as JWT_PAYLOAD;
    } else {
      throw new Error('Invalid token payload');
    }
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};
