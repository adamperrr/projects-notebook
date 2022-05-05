import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from "../utils/hash.utils";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
    createUserDto.password = await hash(createUserDto.password, 10);
    const { password, ...savedResult } = await this.usersRepository.save(
      createUserDto
    );
    return savedResult;
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      email,
    });

    return user;
  }
}
