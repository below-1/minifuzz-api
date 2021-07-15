import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { SignupDTO, LoginDTO } from './auth.dto';
import { UserRepo } from '../user/user.repo';
import { CreateUserDTO } from '../user/user.dto';

class PasswordNotMatchError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'PasswordNotMatchError';
  }
}

const JWT_SECRET = 'secret';

@Injectable()
export class AuthService {

  constructor (private userRepo: UserRepo) {}

  async signup(payload: SignupDTO) {
    let createPayload = new CreateUserDTO();
    createPayload.username = payload.username;
    const passwordHash = await hash(payload.password, 2);
    createPayload.passwordHash = passwordHash;
    createPayload.role = payload.role;
    createPayload.name = payload.name;
    let user = await this.userRepo.create(createPayload);
    return user;
  }

  async login(payload: LoginDTO) {
    const user = await this.userRepo.findByUsername(payload.username);
    const passwordMatch = await compare(payload.password, user.passwordHash);
    if (!passwordMatch) {
      throw new PasswordNotMatchError(`password not match`);
    }
   const token = sign({
     username: user.username,
     role: user.role
   }, JWT_SECRET, { expiresIn: '24h' });
   return token;
  }

  async verifyUser(token: string): Promise<any> {
    const data = await verify(token, JWT_SECRET);
    return data;
  }
}
