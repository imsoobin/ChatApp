import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns";
import React from "react";
import styled from "styled-components";

const WrapperStyle = styled.div`
  margin-bottom: 15px;

  .author{
    margin-left: 5px;
    font-weight: 600;
  }
  .date{
    margin-left: 5px;
    font-size: 11px;
    color: #a7a7a7;
  }
  .text{
    width: auto;
    margin-left: 30px;
  }
  .content{
    padding: 1px;
  }
`

function FormatDate(seconds){
  let formatedData = ''
  if(seconds){
    formatedData = formatRelative(new Date(seconds * 1000), new Date())
  }
  return formatedData
}
export default function Messages({text, displayName, createdAt, photoURL}) {
  return (
    <WrapperStyle>
      <div>
        <Avatar size="small" src={photoURL}>
          {
            photoURL ? '' : displayName?.charAt(0)?.toUpperCase()
          }
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">{FormatDate(createdAt?.seconds)}</Typography.Text>
      </div>
      <div className="text">
        <Typography.Text className="content">{text}</Typography.Text>
      </div>
    </WrapperStyle>
  )
}