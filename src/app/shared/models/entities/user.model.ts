import {Entity} from '../base/entity';
import {Role} from "./role.model";

export class User extends Entity {
    username?: string;
    password?: string;
    address?: string;
    active?: boolean = true;
    admin?: boolean;
    checked: boolean;
    roles: Role[];
}
