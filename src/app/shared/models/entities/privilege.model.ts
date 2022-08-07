import {Injectable} from '@angular/core';
import {Deserializable} from "../../utils/deserializable.wrapper";

@Injectable()
export class Privilege implements Deserializable{
  id: number;
  name: string;
  authority?: string;
  description: string;
  checked: boolean;


  constructor(privilege?) {
    privilege = privilege || {};
    this.id = privilege.id;
    this.name = privilege.name;
    this.authority = privilege.authority;
    this.checked = privilege.checked || false;
    this.description = privilege.description;
  }

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  equals(obj: any): boolean {
    return this.id === obj.id;
  }
}
