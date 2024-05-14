import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Facility } from "./Facility";

// Define the User entity
@Entity()
export class User {
    // Primary key column, auto-generated UUID
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // Column for first name
    @Column()
    firstName: string;

    // Column for last name
    @Column()
    lastName: string;

    // Column for email
    @Column()
    email: string;

    // Column for user role, defaults to 'Doctor'
    @Column({
        type: "enum",
        enum: ["Doctor", "Administrator"],
        default: "Doctor",
    })
    role: string;

    // Column for creation timestamp
    @CreateDateColumn()
    createdAt: Date;

    // Many-to-many relationship with Facility entity
    // A user can be associated with multiple facilities
    @ManyToMany(() => Facility, (facility) => facility.users, {
        cascade: true, // Cascade operations to associated facilities
    })
    @JoinTable() // Join table to establish the relationship
    facilities: Facility[]; // Array of associated facilities
}
