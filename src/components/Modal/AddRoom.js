import React, { useContext } from "react";
import { Modal, Form, Input } from "antd";
import { AppContext } from "../../ContextAPI/AppProvider";
import { addDocument } from "../../Firebase/services";
import { AuthContext } from "../../ContextAPI/AuthProvider";

export default function AddRoom() {
  const { visible, setVisible } = useContext(AppContext)
  const { user: { uid } } = useContext(AuthContext)
  const [form] = Form.useForm()
  const handleOK = () => {
    // console.log({formData: form.getFieldValue()})
    //add new room to firebase
    addDocument('rooms', { ...form.getFieldValue(), members: [uid] })

    //reset form after add room
    form.resetFields()
    setVisible(false)
  }
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  return (
    <div>
      <Modal title="Tạo phòng" visible={visible} onOk={handleOK} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập mô tả phòng" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}