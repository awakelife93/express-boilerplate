import { AppRepository } from "@/lib";
import { hashSync } from "@/utils";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length
} from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "../../Common/entity";
import { UserRole } from "../type";

@Entity("user")
export class User extends CommonEntity {
  @PrimaryGeneratedColumn({ name: "id", comment: "고유키" })
  userId!: number;

  @IsEmail()
  @Column({ length: 50, unique: true, comment: "이메일" })
  email!: string;

  @Length(1, 10)
  @IsString()
  @Column({ length: 10, comment: "이름" })
  name!: string;

  @Length(3, 20)
  @IsString()
  @Column({
    length: 200,
    select: false,
    comment: "패스워드",
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
    comment: "권한",
    default: UserRole.USER,
  })
  role!: UserRole;

  @IsOptional()
  @IsBoolean()
  @Column({ name: "is_deleted", default: false, comment: "삭제 여부" })
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
