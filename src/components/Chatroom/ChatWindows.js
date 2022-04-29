import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Tooltip, Form, Input, Alert } from "antd";
import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { AppContext } from "../../ContextAPI/AppProvider";
import { AuthContext } from "../../ContextAPI/AuthProvider";
import { addDocument } from "../../Firebase/services";
import UserFireStore from "../../hooks/userFirestore";
import Messages from "./Messages";

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  padding: 0px 15px;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.2);

  .header{
    &__info{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title{
      margin: 0;
      font-weight: 600;
      font-size: 17px;
      font-family: cursive;
    }

    &__description{
      font-size: 14px;
      font-family: cursive;
    }
  }

`
const ButtonStyle = styled.div`
  display: flex;
  align-items: center;
`
const ContentStyle = styled.div`
  height: calc(100% - 57px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end; 
`
const MessageList = styled.div`
  max-height: 100%;
  overflow-y: auto;
  
  ::--webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	  background-color: #F5F5F5;
	  border-radius: 10px;
  }
  ::-webkit-scrollbar
  {
	  width: 7px;
	  background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb
  {
	  border-radius: 10px;
	  background-image: 
      -webkit-gradient(linear,
			left bottom,
			left top,
			color-stop(0.44, rgb(122,153,217)),
			color-stop(0.72, rgb(73,125,189)),
			color-stop(0.86, rgb(28,58,148)));
  }
`
const WrapperStyles = styled.div`
  height: 100vh;
`
const FormStyle = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0,0.2);

  .ant-form-item{
    flex: 1;
    margin-bottom: 0;
    padding: 3px;
  }
`

export default function ChatWindows() {
  const { selectedRoom, members, setInviteVisible } = useContext(AppContext)
  const { user: { uid, photoURL, displayName } } = useContext(AuthContext)
  const [inputValue, setInputValue] = useState('')

  const [form] = Form.useForm()
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleOnSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName
    })

    form.resetFields(['messages'])
  }
  const messCondition = React.useMemo(() => ({
    fieldName: 'roomId',
    operator: '==',
    compareValue: selectedRoom.id,
  }), [selectedRoom.id])
  const messages = UserFireStore('messages', messCondition)

  const messageRef = useRef(null)
  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({behavior: "smooth"})
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <WrapperStyles>
      {
        selectedRoom.id ? (
          <>
            <HeaderStyle>
              <div className="header__info">
                <p className="header__title">{selectedRoom.name}</p>
                <span className="header__description">{selectedRoom.description}</span>
              </div>
              <ButtonStyle>
                <Button icon={<UserAddOutlined />} type="text" onClick={() => setInviteVisible(true)}>Mời</Button>
                <Avatar.Group size="small" maxCount={2}>
                  {
                    members.map((member) => (
                      <Tooltip title={member.displayName} key={member.id}>
                        <Avatar src={member.photoURL}>
                          {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                      </Tooltip>))
                  }
                </Avatar.Group>
              </ButtonStyle>
            </HeaderStyle>
            <ContentStyle>
              <MessageList className="list__messages">
                {
                  messages.map(mess =>
                    <Messages key={mess.id} text={mess.text}
                      photoURL={mess.photoURL} displayName={mess.displayName} createdAt={mess.createdAt}
                    />)
                }
                <div ref={messageRef}></div>
              </MessageList>
              <FormStyle form={form}>
                <Form.Item name="messages">
                  <Input
                    onChange={handleInputChange}
                    onPressEnter={handleOnSubmit}
                    placeholder="Hãy viết gì đó ..."
                    bordered={false}
                    autoComplete="off" />
                </Form.Item>
                <Button onClick={handleOnSubmit} type="primary">
                  Gửi
                </Button>
              </FormStyle>
            </ContentStyle>
          </>
        ) : <Alert message="Hãy chọn phòng" type="info" showIcon closable style={{ margin: 5 }} />

      }
    </WrapperStyles>
  )
}