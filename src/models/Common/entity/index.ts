import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class CommonEntity {
  @CreateDateColumn({
    name: "created_dt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdDt!: string;

  @UpdateDateColumn({
    name: "updated_dt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedDt!: string;
}
