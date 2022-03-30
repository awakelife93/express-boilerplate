import { AppRepository } from "@/lib";
import { hashSync } from "@/utils";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "../../Common/entity";
import { UserRole } from "../type";

@Entity("user")
export class User extends CommonEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  userId!: number;

  @IsEmail()
  @Column({ length: 50, unique: true })
  email!: string;

  @Length(1, 10)
  @IsString()
  @Column({ length: 10 })
  name!: string;

  @Length(3, 20)
  @IsString()
  @Column({
    length: 200,
    select: false,
    transformer: {
      to: (str: string) => hashSync(str),
      from: (str: string) => str,
    },
  })
  password!: string;

  @IsEnum(UserRole)
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @IsOptional()
  @IsBoolean()
  @Column({ name: "is_deleted", default: false })
  isDeleted!: boolean;

  async findPassword(userId: number): Promise<string> {
    const user = await AppRepository.User.createQueryBuilder("user")
      .select("user.userId", "userId")
      .addSelect("user.password")
      .where("user.userId = :userId", { userId })
      .getOne();

    return user?.password ?? "";
  }
}
