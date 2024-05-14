import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, OneToMany } from "typeorm";
import { User } from "./User";
import { Location } from "./Location";

@Entity()
export class Facility {
    // Primary key generated as UUID
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // Name of the facility
    @Column()
    name: string;

    // Date when the facility was created
    @CreateDateColumn()
    createdAt: Date;

    // Many-to-many relationship with User entity
    @ManyToMany(() => User, (user) => user.facilities)
    users: User[];

    // One-to-many relationship with Location entity
    @OneToMany(() => Location, (location) => location.facility, {
        cascade: true, // Cascade delete when a facility is deleted
    })
    locations: Location[];
}
