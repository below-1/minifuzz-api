import { IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { Role } from '../user/user.model';

export class SignupDTO {

  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

export class LoginDTO {
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
