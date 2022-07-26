import { UserRole } from "@/types/user";
import { hashSync } from "@/utils";
import { IsEmail, IsEnum, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "./Common";

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
}
