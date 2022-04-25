import { getAuth } from "firebase/auth";
import {
  deleteDoc,
  doc,
  GeoPoint,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { colRef, db } from "../firebase/firebase-config";

export type Maraude = {
  //Ici on définit le type Maraude
  adresse: Localisation;
  id: string;
  notes: string;
  date: Timestamp;
  userId: string;
};

export type Localisation = {
  //Ici on définit le type Localisation
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

class MaraudeService {
  private maraudes: Array<Maraude> = [];

  async getAll(): Promise<Array<Maraude>> {
    await getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const notes = doc.get("notes");
          const adresse = doc.get("adresse");
          const id = doc.id;
          const date = doc.get("date");
          const userId = doc.get("userId");
          if (userId == getAuth().currentUser?.uid) {
            if (
              this.maraudes.find(function (maraude: Maraude) {
                return maraude.id == id;
              })
            ) {
            } else {
              this.maraudes.push({ id, notes, adresse, date, userId });
            }
          }
        });
      })
    return this.maraudes;
  }
  

  async remove(maraude: Maraude) {
    const MaraudeRef = doc(db, "Maraudes", maraude.id);
    deleteDoc(MaraudeRef);
    this.maraudes = this.maraudes.filter(
      (laMaraude) => laMaraude.id !== maraude.id
    );
  }
}

export default new MaraudeService();
