import React from "react";
import { Row, Col, Button, Typography } from 'antd'
import firebase, { auth } from "../../Firebase/config";
import '../../App.css'
import { addDocument, generateKeywords } from "../../Firebase/services";

const { Title } = Typography
const fbProvider = new firebase.auth.FacebookAuthProvider()
const ggProvier = new firebase.auth.GoogleAuthProvider()
export default function Login() {
  const handleFbLogin = () => {
    auth.signInWithPopup(fbProvider)
  }
  const handleGGLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(ggProvier)
    // console.log({ data })
    if (additionalUserInfo?.isNewUser) {
      // db.collection('users').add({
      //   displayName: user.displayName,
      //   email: user.email,
      //   photoURL: user.photoURL,
      //   uid: user.uid,
      //   providerId: additionalUserInfo.providerId
      // })
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName),
        uid: user.uid,
      })
    }
  }
  return (
    <div className="form">
      <Row justify="center" style={{ height: 'auto' }}>
        <Col span={20}>
          <Title className="title" style={{ textAlign: "center", color: "#fff" }} level={5}>Ứng dụng nhắn tin miễn phí</Title>
          <Button style={{ width: "100%", marginBottom: 5, color: "green", borderRadius: 5 }} onClick={handleGGLogin}>Đăng nhập với tài khoản Google</Button>
          <Button style={{ width: "100%", color: "blueviolet", borderRadius: 5 }} onClick={handleFbLogin}>Đăng nhập với tài khoản Facebook</Button>
        </Col>
      </Row>
    </div>
  )
}