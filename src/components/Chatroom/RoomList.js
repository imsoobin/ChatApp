import { Button, Collapse, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { PlusSquareOutlined } from '@ant-design/icons'
import { AppContext } from "../../ContextAPI/AppProvider";


const { Panel } = Collapse

const PanelStyle = styled(Panel)`
  &&&{
    .ant-collapse-header{
      font-weight: 600;
      font-family: cursive;
      border-bottom: 1px solid rgba(255,255,255,0.6);
    }
    .ant-collapse-header, p, a{
      color: #fff;
    }
  }
`
const LinkStyle = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.3);
  text-align: center;
`
export default function RoomList() {
  const { rooms, setVisible, setSelectedRoomId } = React.useContext(AppContext)

  const handleAddRoom = () => {
    setVisible(true)
  }
  return (
    <div>
      <Collapse ghost defaultActiveKey={['1']} >
        <PanelStyle header="Danh sách các phòng chat" key='1'>
          {
            rooms.map(room => (
              <LinkStyle key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
              >{room.name}
              </LinkStyle>))
          }
          <Button style={{ borderRadius: 5, marginTop: 5, border: 'none' }} ghost icon={<PlusSquareOutlined />} onClick={handleAddRoom}>
            Thêm phòng chat mới
          </Button>
        </PanelStyle>
      </Collapse>
    </div>
  )
}