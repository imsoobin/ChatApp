import React, { useState } from "react";
import UserFireStore from "../hooks/userFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext()
export default function AppProvider({ children }) {
  const [visible, setVisible] = useState(false)
  const [inviteVisible, setInviteVisible] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState('')
  const { user: { uid }, } = React.useContext(AuthContext)

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    }
  }, [uid])
  const rooms = UserFireStore('rooms', roomsCondition)

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId])

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members])

  const members = UserFireStore('users', usersCondition)

  return (
    <AppContext.Provider value={{
      rooms,
      members,
      selectedRoom,
      visible,
      setVisible,
      selectedRoomId,
      setSelectedRoomId,
      inviteVisible,
      setInviteVisible
    }}>
      {children}
    </AppContext.Provider>
  )
}