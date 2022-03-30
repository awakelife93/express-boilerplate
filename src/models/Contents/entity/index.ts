import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "../../Common/entity";

@Entity("contents")
export class Contents extends CommonEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  contentId!: number;

  @IsNotEmpty()
  @Column({ length: 10 })
  title!: string;

  @IsString()
  @Column({ name: "sub_title", length: 10, nullable: true })
  subTitle!: string;

  @IsString()
  @Column({ length: 200, nullable: true })
  description!: string;

  @IsString()
  @Column({ name: "image_link", length: 50, nullable: true })
  imageLink!: string;

  @IsBoolean()
  @Column({ name: "is_deleted", default: false })
  isDeleted!: boolean;
}
