import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";

@Index("uq_user_email", ["email"], { unique: true })
@Index("uq_user_phone_namber", ["phoneNamber"], { unique: true })
@Entity("user", { schema: "aplikacija" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", {
    name: "email",
    unique: true,
    length: 255,
    default: () => "'0'",
  })
  email: string;

  @Column("varchar", {
    name: "password_hash",
    length: 128,
    default: () => "'0'",
  })
  passwordHash: string;

  @Column("varchar", { name: "forename", length: 64, default: () => "'0'" })
  forename: string;

  @Column("varchar", { name: "surename", length: 64, default: () => "'0'" })
  surename: string;

  @Column("varchar", {
    name: "phone_namber",
    unique: true,
    length: 24,
    default: () => "'0'",
  })
  phoneNamber: string;

  @Column("text", { name: "postal_addres" })
  postalAddres: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
