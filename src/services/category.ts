/**firebase */
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const categoryFind = async () => {
    try {
      const categoryCollection = collection(db, "categories");
      const docRef = await getDocs(categoryCollection);
      const data = docRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return data
    } catch (error) {
      throw error
    }
  };