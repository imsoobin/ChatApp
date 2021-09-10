import { Button,Avatar, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { auth } from "../../Firebase/config";
import { AuthContext } from "../../ContextAPI/AuthProvider";

const WrapperStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;

  .txtusername{
    color: #fff;
    margin-left: 5px;
  }
`
export default function UserInfo(){
  // React.useEffect(() => {
  //   db.collection('users').onSnapshot((snapshot) => {
  //     const data = snapshot.docs.map(doc => ({
  //       ...doc.data(),
  //       id: doc.id
  //     }))
  //     console.log({data, snapshot, docs: snapshot.docs})
  //   })
  // }, [])

  const {user: {displayName, photoURL}, 
  } = React.useContext(AuthContext)
  return (
    <WrapperStyle>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="txtusername">{displayName}</Typography.Text>
      </div>
      <Button ghost style={{borderRadius: 5, fontFamily: 'cursive'}} onClick={() => auth.signOut()}>Đăng xuất</Button>
    </WrapperStyle>
  )
}