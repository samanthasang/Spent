import { useState } from "react";
import "./layout.styles.css";

import { useDispatch, useSelector } from "react-redux";
import {
  AddCatts,
  AddTags,
  EMPTY_CATTS,
  EMPTY_TAGS,
  LOGIN,
} from "../../redux/user_redux/userAction";
import { Button, FloatButton, Form, Input, Modal } from "antd";
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const LayoutTop = () => {
  const dispatch = useDispatch();
  const tagsState = useSelector((state) => state.user.tags);
  const cattsState = useSelector((state) => state.user.catts);
  const spents = useSelector((state) => state.user.spent);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [confirmLoadingTag, setConfirmLoadingTag] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [modalTextTag, setModalTextTag] = useState("Content of the modal");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const showModalTag = () => {
    setOpenTag(true);
  };
  const handleOkTag = () => {
    setModalText("The Tag modal will be closed after two seconds");
    setConfirmLoadingTag(true);
    setTimeout(() => {
      setOpenTag(false);
      setConfirmLoadingTag(false);
    }, 2000);
  };
  const handleCancelTag = () => {
    console.log("Clicked cancel button");
    setOpenTag(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch(LOGIN());
    dispatch(EMPTY_TAGS());
    dispatch(EMPTY_CATTS());
  };
  const onFinish = (values) => {
    console.log(values);
    dispatch(
      AddCatts([
        ...cattsState,
        { label: values["catt"], value: values["catt"] },
      ])
    );
  };
  const onFinishTag = (values) => {
    console.log(values["tag"]);
    
    dispatch(
      AddTags([
        ...tagsState,
        { label: values["tag"], value: values["tag"] },
      ])
    );
  };

  return (
    <>
      <div className="our-partner-controller" style={{}}>
      </div>
      <Button
        htmlType="submit"
        className="btn_next"
        style={{ width: "100%", marginLeft: "0" }}
        onClick={handleSubmit}
      >
        LogOut
      </Button>

      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{
          right: 24,
        }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton onClick={showModal} />
        <FloatButton icon={<CommentOutlined />} onClick={showModalTag} />
      </FloatButton.Group>
      <Modal
        title="Add a category"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="catt-form"
          onSubmit={onFinish}
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="catt"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={modalText}
        open={openTag}
        onOk={handleOkTag}
        confirmLoading={confirmLoadingTag}
        onCancel={handleCancelTag}
      >
        <Form
          {...layout}
          name="tag-form"
          onSubmit={onFinishTag}
          onFinish={onFinishTag}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="tag"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LayoutTop;
