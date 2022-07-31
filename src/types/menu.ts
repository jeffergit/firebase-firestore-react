import { Icategory } from "./category";

export interface Imenu {
    name: string;
    category: Icategory;
    cost: number;
    price: number;
    stock: number;
    options?: Array<Ioption>;
  }
  
interface Ioption {
  name: string
}