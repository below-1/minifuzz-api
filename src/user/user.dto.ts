import { Role } from './user.model';

export class CreateUserDTO {
  username: string;
  passwordHash: string;
  name: string;
  role: Role;
}

export class UpdateUserDTO {
  id: string;
  username: string;
  name: string;
  role: Role;
}