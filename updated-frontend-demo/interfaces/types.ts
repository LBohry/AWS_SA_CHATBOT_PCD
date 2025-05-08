export interface Logo {
    name: string;
    url: string;
  }
  
  export type Feature = string;
  
  export interface Tier {
    name: string;
    id: string;
    price: string;
    description: string;
    features: Feature[];
  }