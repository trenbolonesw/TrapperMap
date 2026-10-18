import { Entity,Property,Enum } from "@mikro-orm/decorators/legacy";

import { baseSchema } from "../common/base.entity.js";

export enum TrapCategory {
   CONNIBEAR = 'connibear',
  FLOAT = 'float',
 POWERSNARE = 'powersnare'
}

@Entity()
export class TrapMarkerSchema extends baseSchema{
 
 @Enum(() => TrapCategory)
    trapCategory!:TrapCategory;

    @Property({type:'boolean'})
    isChecked!:boolean;
    

}