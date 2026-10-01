import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.users.findOneBy({ email });
  }

  findById(id: string): Promise<User | null> {
    return this.users.findOneBy({ id });
  }

  create(data: Pick<User, "email" | "name" | "passwordHash">): Promise<User> {
    return this.users.save(this.users.create(data));
  }
}
