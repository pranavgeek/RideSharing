import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

class Ridbuter {
  constructor() {
    this.db = null;
    this.isAvailable = false;
  }

  open() {
    return new Promise((resolve, reject) => {
      try {
        const firebaseConfig = {
          apiKey: "AIzaSyD3OCZT9QKhWU3cCapxQlOcu_cle7t6lmc",
          authDomain: "ridbuter.firebaseapp.com",
          projectId: "ridbuter",
          storageBucket: "ridbuter.appspot.com",
          messagingSenderId: "587151532996",
          appId: "1:587151532996:web:e30af8c97ee4198e89ba91",
        };
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        console.log("firebase: ", app);
        const db = getFirestore(app);
        if (db) {
          this.db = db;
          this.isAvailable = true;
          resolve();
          console.log("Success");
        } else {
          reject("Not Connected!");
        }
      } catch (error) {
        console.log(error.message);
      }
    });
  }

  add(origin, destination, seats, departureTime) {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Database is not connected.");
      }

      const songs = {
        origin: origin,
        destination: destination,
        seats: seats,
        departureTime: departureTime,
      };

      const dbcollection = collection(this.db, "rides");

      addDoc(dbcollection, songs)
        .then((docRef) => {
          resolve();
          console.log("Success: ", docRef.id);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }

  searchTrip(searchOrigin, searchDestination, searchDepartureTime) {
    return new Promise(async (resolve, reject) => {
      if (!this.isAvailable) {
        reject("Database is not connected.");
      }

      const ridesCollection = collection(this.db, "rides");
      const q = query(
        ridesCollection,
        where("origin", "==", searchOrigin),
        where("destination", "==", searchDestination),
        where("departureTime", "==", searchDepartureTime),
      );

      try {
        const querySnapshot = await getDocs(q);
        const matchedTrips = [];

        querySnapshot.forEach((doc) => {
          const trip = doc.data();
          matchedTrips.push({
            id: doc.id,
            ...trip,
          });
        });
        console.log("Matching trips:", matchedTrips);
        resolve(matchedTrips);
      } catch (error) {
        console.error("Error searching trips:", error.message);
        reject(error.message);
      }
    });
  }
}

export default new Ridbuter();
