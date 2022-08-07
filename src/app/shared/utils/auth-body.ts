import {Injectable} from '@angular/core';
import {Deserializable} from "./deserializable.wrapper";

@Injectable()
export class AuthBody implements Deserializable {
    userId?: number;
    username?: string;
    password?: string;
    user?: any;
    token?: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: this): boolean {
        return true;
    }

}
