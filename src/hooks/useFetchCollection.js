import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchCollection = ({ collectionName }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = () => {
    setIsLoading(true);
    try {
      let collRef = collection(db, collectionName);
      const q = query(collRef, orderBy("createdAt", "desc"));
      onSnapshot(
        q,
        (snapshot) => {
          let allData = snapshot.docs.map((doc) => {
            let data = doc.data();

            return {
              id: doc.id,
              ...data,
            };
          });
          setData(allData);
          setIsLoading(false);
        },
        (error) => {}
      );
    } catch (e) {
      setIsLoading(false);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { data, isLoading };
};

export default useFetchCollection;
