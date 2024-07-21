import { Response } from 'express';

interface CookieOptions {
  tokenName: string;
  tokenData: string;
  res: Response;
}

export const createCookie = ({
  tokenName,
  tokenData,
  res,
}: CookieOptions): void => {
  const thirtyDays = 1000 * 60 * 60 * 24 * 30;

  res.cookie(tokenName, tokenData, {
    httpOnly: true,
    expires: new Date(Date.now() + thirtyDays),
    secure: process.env.NODE_ENV === 'production',
  });
};

export const removeCookie = ({
  tokenName,
  tokenData,
  res,
}: CookieOptions): void => {
  res.cookie(tokenName, tokenData, {
    httpOnly: true,
    expires: new Date(0),
  });
};
