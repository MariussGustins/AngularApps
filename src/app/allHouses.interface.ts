export interface Houses{
  id:number;
  number: string;
  street: string;
  city:string;
  country:string;
  postcode:string;
  apartments: Apartment[];
}

export interface Apartment {
  id: number;
  number: string;
  floor: number;
}
