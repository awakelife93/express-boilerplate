import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "./Common";

@Entity("contents")
export class Contents extends CommonEntity {
  @PrimaryGeneratedColumn({ name: "id", comment: "고유키" })
  contentId!: number;

  @IsNotEmpty()
  @Column({ length: 10, comment: "제목" })
  title!: string;

  @IsString()
  @Column({ name: "sub_title", length: 10, nullable: true, comment: "부제목" })
  subTitle!: string;

  @IsString()
  @Column({ length: 200, nullable: true, comment: "설명" })
  description!: string;

  @IsString()
  @Column({
    name: "image_link",
    length: 50,
    nullable: true,
    comment: "이미지 링크",
  })
  imageLink!: string;
}
