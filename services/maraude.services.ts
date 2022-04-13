import { GeoPoint, Timestamp } from "firebase/firestore";

export type Maraude = {
  adresse: GeoPoint;
  id: string;
  notes: string;
  dateMar: Timestamp;
};

export type Localisation = {
  latitude:number,
  longitude:number,
  latitudeDelta: number,
  longitudeDelta: number,


}
