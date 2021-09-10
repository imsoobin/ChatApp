import React, { Component } from "react";
import { Row, Col } from 'antd'
import SlideBar from "./SlideBar";
import ChatWindows from "./ChatWindows";

class Chatroom extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={6}>
            <SlideBar />
          </Col>
          <Col span={18}>
            <ChatWindows />
          </Col>
        </Row>
      </div>
    )
  }
}
export default Chatroom