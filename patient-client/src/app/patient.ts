import { FileHandler } from "./file-handler";

export class Patient {
    id!: number;
    name!: string;
    gender!: string;
    age!: string;
    dob!: Date;
    number!: string;
    email!: string;
    address!: string;
    photo!: FileHandler;
}
