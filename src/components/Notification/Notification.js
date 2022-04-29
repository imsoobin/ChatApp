import React, { useEffect, useState } from "react";
import { getToken } from "../../firebase-lint";

const Notification = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  console.log("Token found", isTokenFound);
  useEffect(() => {
    let data;
    async function tokenFunc() {
      data = await getToken(setTokenFound);
      // console.log(data);
      if (data) {
        console.log(data);
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);
  return <div></div>;
};

Notification.prototype = {};
export default Notification;
