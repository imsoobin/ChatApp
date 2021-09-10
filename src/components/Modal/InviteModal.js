import { Modal, Form, Select, Spin, Avatar } from "antd";
import { debounce } from "lodash";
import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { AppContext } from "../../ContextAPI/AppProvider";

import { db } from "../../Firebase/config";


function DebounSelect({ fetchOptions, curMember, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMember).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false)
      })
    }
    return debounce(loadOptions, debounceTimeout)
  }, [debounceTimeout, fetchOptions, curMember])

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {
        options.map((option) => (
          <Select.Option key={option.value} title={option.label} value={option.value}>
            <Avatar size="small" src={option.photoURL}>
              {
                option.photoURL ? '' : option.label?.charAt(0)?.toUpperCase()
              }
            </Avatar>
            {`${option.label}`}
          </Select.Option>
        ))
      }
    </Select>
  )
}

async function fetchUserList(search, curMember) {
  return db
    .collection('users')
    .where('keywords', 'array-contains', search?.toLowerCase())
    .orderBy('displayName')
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL,
      })).filter((opt) => !curMember.includes(opt.value))
      // .filter((option) => !currentMember.includes(option.value))
    })
}
export default function InviteModal() {
  const { inviteVisible, setInviteVisible, selectedRoomId, selectedRoom } = useContext(AppContext)
  const [value, setValue] = useState([])
  const [form] = Form.useForm()
  const handleOK = () => {
    form.resetFields()
    //update member currentroom
    setValue([])
    const roomref = db.collection('rooms').doc(selectedRoomId)

    roomref.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)]
    })
    setInviteVisible(false)
  }
  const handleCancel = () => {
    form.resetFields()
    setInviteVisible(false)
  }
 
  return (
    <div>
      <Modal title="Mời thêm thành viên" visible={inviteVisible} onOk={handleOK} onCancel={handleCancel} destroyOnClose={true}>
        <Form form={form} layout="vertical">
          <DebounSelect
            mode="multiple"
            label="Ten thanh vien"
            value={value}
            placeholdel="Nhap ten thanh vien muon them"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: '100%' }}
            curMember={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  )
}