import React from "react";
import {Row, Col} from 'antd'
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from "styled-components"

const SlideBarStyle = styled.div`
  background: linear-gradient(to bottom right, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  color: white;
  height: 100vh;

`
export default function SlideBar(){
  return (
    <div>
      <SlideBarStyle>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
      </SlideBarStyle> 
    </div>
  )
}