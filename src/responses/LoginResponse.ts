import { UserDto } from "../dtos/UserDto";

export interface LoginResponse {
  user: UserDto;
  expiresIn: number;
}