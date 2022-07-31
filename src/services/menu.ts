  /**firebase */
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import {dateFormat} from '../util/date'

/**type */
import { Imenu } from "../types/menu";

/**var */
const collectionName = 'menus'
  
export const menuFind = async () => {
  try {
    const menusRef = collection(db, collectionName)
    const q = query(menusRef, orderBy("timestamp","desc"))
    const querySnapshot = await getDocs(q)
    const data = await Promise.all(
      querySnapshot.docs.map(async (snap: any) => {
        const categoryId = snap?.data()?.categoryId
        const categoryRef = doc(db, 'categories', categoryId);
        const category = await getDoc(categoryRef).then((cat: any) => {
          return { ...cat.data(), id: cat?.id };
        });
        const timestamp = snap?.data()?.timestamp ? dateFormat(new Date(snap?.data()?.timestamp.seconds * 1000)) : 'None'
        return {
          ...snap?.data(),
          id: snap?.id,
          category,
          timestamp
        };
      })
    );
  return data
  } catch (error) {
    throw error
  }
};

export const menuFindOne = async (id: string) => {
  try {
    const menuRef = doc(db, collectionName, id)
    const docSnap = await getDoc(menuRef)
    if (docSnap.exists()) {
      const categoryId = docSnap?.data()?.categoryId
      const categoryRef = doc(db, 'categories', categoryId)
      const categoryData = await getDoc(categoryRef).then((cat: any) => {
        return { ...cat?.data(), id: cat?.id }
      });
      const timestamp = docSnap?.data()?.timestamp ? dateFormat(new Date(docSnap?.data()?.timestamp.seconds * 1000)) : 'None'
      return {
        ...docSnap.data(),
        id: docSnap?.id,
        category: categoryData,
        timestamp
      };
    } else {
      return {
        error: "Document not found",
      };
    }
  } catch (error) {
    throw error
  }

};

export const menuSave = async (payload: Imenu) => {
  try {
    const menusRef = collection(db, collectionName)
    const timestamp = serverTimestamp()
    return await addDoc(menusRef, {...payload,timestamp})
  } catch (error) {
    throw error
  }
};

export const menuUpdate = async (payload: any, id: string) => {
  try {
    const menuRef = doc(db, collectionName, id)
    const timestamp = serverTimestamp()
    return await updateDoc(menuRef, {...payload,timestamp});
  } catch (error) {
    throw error
  }
};

export const menuDelete = async (id: string) => {
  try {
    const menuRef = doc(db, collectionName, id)
    return await deleteDoc(menuRef)
  } catch (error) {
    throw error
  }
};