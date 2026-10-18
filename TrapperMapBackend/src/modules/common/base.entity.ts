import { OptionalProps } from "@mikro-orm/core";
import { Entity,Property,PrimaryKey } from "@mikro-orm/decorators/legacy";
import { v4 } from "uuid";

@Entity({ abstract: true })
export abstract class baseSchema{
 @PrimaryKey({type:'number'})
 id!:number;
 [OptionalProps]?: 'createdAt' | 'updatedAt';
 
 

 @Property({ onCreate: () => new Date() })
  createdAt = new Date();

 @Property({ onUpdate: () => new Date() })
updatedAt = new Date();
}