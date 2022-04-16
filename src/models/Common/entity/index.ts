import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class CommonEntity {
  @CreateDateColumn({
    name: "created_dt",
    type: "timestamp",
    comment: "생성 일자",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdDt!: string;

  @UpdateDateColumn({
    name: "updated_dt",
    type: "timestamp",
    comment: "변경 일자",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedDt!: string;
}
