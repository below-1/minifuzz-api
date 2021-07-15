import { Request } from 'express';

export default function getTokenFromRequest(request: Request) {
  const authHeader = request.headers.authorization;
  const token = authHeader.split(' ')[1];
  return token;
}