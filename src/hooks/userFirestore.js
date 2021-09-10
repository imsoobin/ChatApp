import React, { useState } from "react";
import { db } from "../Firebase/config";

const UserFireStore = (collection, condition) => {
  const [documents, setDocuments] = useState([])
  React.useEffect(() => {
    let collectionRef = db.collection(collection).orderBy('createdAt')
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        setDocuments([])
        return
      }
      else {
        collectionRef = collectionRef.where(
          condition.fieldName,
          condition.operator,
          condition.compareValue,
        )
      }

    }
    const unsubcribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setDocuments(documents)
    })
    return unsubcribe
  }, [collection, condition])

  return documents
}
export default UserFireStore