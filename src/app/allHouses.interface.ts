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
  rooms: number;
  numberOfResidents: number;
  fullArea: number;
  livingArea: number;
  primaryResidentId: number;
  houseId: number;
  residents: Resident[];

}

export interface Resident{
  id:number;
  name:string;
  lastName:string;
  personalNumber:string;
  birthday: Date;
  phoneNumber: number;
  email:string;
  isOwner: boolean;
  apartmentId: number;
  username:string;
  password:string;
}
