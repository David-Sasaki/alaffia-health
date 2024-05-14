import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Facility } from "./Facility";

@Entity()
export class Location {
    // Primary key for the location entity, generated as UUID
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // State of the location
    @Column()
    state: string;

    // Zip code of the location
    @Column()
    zip: string;

    // Street address of the location
    @Column()
    address: string;

    // Many-to-one relationship with Facility entity
    // Each location belongs to one facility
    @ManyToOne(() => Facility, (facility) => facility.locations)
    facility: Facility;
}
