import { useEffect, useRef, useState } from "react";
import "./layout.styles.css";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import {
  AddCatts,
  AddTags,
  EMPTY_CATTS,
  EMPTY_TAGS,
  deleterecordCatt,
  deleterecordTag,
  editrecordTag,
} from "../../redux/user_redux/userAction";
import {
  Button,
  notification,
  Space,
  Tag,
  FloatButton,
  Table,
  Form,
  Input,
  Modal,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import {} from "antd";
const Context = React.createContext({
  name: "Default",
});

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
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
  const [tagForm] = Form.useForm();
  const [catForm] = Form.useForm();
  const dispatch = useDispatch();
  const tagsState = useSelector((state) => state.user.tags);
  const cattsState = useSelector((state) => state.user.catts);
  const edit = useSelector((state) => state.user.edit);
  const spents = useSelector((state) => state.user.spent);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [defValueCatt, setDefValueCatt] = useState("");
  const [defValueTag, setDefValueTag] = useState("a");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openTag, setOpenTag] = useState(false);
  const [confirmLoadingTag, setConfirmLoadingTag] = useState(false);
  const [modalText, setModalText] = useState("catt of the modal");
  const [modalTextTag, setModalTextTag] = useState("tag of the modal");

  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(3);
  const [api, contextHolder] = notification.useNotification({
    stack: enabled
      ? {
          threshold,
        }
      : false,
  });

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
  const openNotification = (massage = "Notification Title") => {
    api.open({
      message: massage,
      description: `${Array(Math.round(Math.random() * 5) + 1)
        .fill("This is the content of the notification.")
        .join("\n")}`,
      duration: null,
    });
  };
  const onFinish = (values) => {
    console.log(values);
    setConfirmLoading(true);
    let newCatt = cattsState.filter((catt) => catt.value === values["catt"])[0];
    newCatt && newCatt.value !== undefined
      ? openNotification(`${values["catt"]} allready exist`)
      : dispatch(
          AddCatts({
            id: defValueCatt ? defValueCatt : uuidv4(),
            text: values["catt"],
            value: values["catt"],
          })
        ) &&
        catForm.setFieldsValue({ catt: "" }) &&
        openNotification("success") &&
        catForm.setFieldsValue({ catt: "" });
    openNotification();
    setTimeout(() => {
      setDefValueCatt("");
    }, 2000);
  };
  const onFinishTag = (values) => {
    setConfirmLoadingTag(true);
    let newTag = tagsState.filter((tag) => tag.value === values["tag"])[0];
    console.log(newTag);
    console.log(values);
    newTag && newTag.value !== undefined
      ? openNotification(`${values["tag"]} allready exist`)
      : dispatch(
          AddTags({
            id: defValueCatt ? defValueCatt : uuidv4(),
            text: values["tag"],
            value: values["tag"],
          })
        ) &&
        tagForm.setFieldsValue({ tag: "" }) &&
        openNotification("success") &&
        tagForm.setFieldsValue({ tag: "" });
    setTimeout(() => {
      setDefValueCatt("");
    }, 2000);
  };
  useEffect(() => {
    console.log(tagsState);
    console.log(cattsState);
    console.log(spents);
  }, [tagsState, cattsState, spents]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const onFill = (record, id, form) => {
    setDefValueCatt(id);
    console.log(record);
    form
      ? catForm.setFieldsValue({ catt: record.text })
      : tagForm.setFieldsValue({ tag: record.text });
    // dispatch(repeatrecordSpent({ spent: null, edit: true }));
    console.log(record);
  };
  const columnsCatt = [
    {
      title: "Catts",
      key: "catts",
      dataIndex: "catts",
      filters: cattsState,
      onFilter: (value, record) => record.catts.includes(value),
      render: (_, catts) => (
        <Tag key={catts.label}>{catts.value.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button type="button" onClick={() => onFill(record, record.id, true)}>
            Edit {record.name}
          </button>
          <button onClick={() => dispatch(deleterecordCatt(record.id))}>
            Delete
          </button>
        </Space>
      ),
    },
  ];
  const columnsTag = [
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      filters: tagsState,
      onFilter: (value, record) => record.tags.includes(value),
      render: (_, tags) => (
        <Tag key={tags.label}>{tags.value.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            type="button"
            onClick={() => onFill(record, record.id, false)}
          >
            Edit {record.name}
          </button>
          <button onClick={() => dispatch(deleterecordTag(record.id))}>
            DeleteRecord
          </button>
        </Space>
      ),
    },
  ];

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <div className="our-partner-controller" style={{}}></div>
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
            onFinish={onFinish}
            form={catForm}
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
            <Table
              columns={columnsCatt}
              dataSource={cattsState}
              onChange={onChange}
            />
          </Form>
        </Modal>

        <Modal
          title={modalTextTag}
          open={openTag}
          onOk={handleOkTag}
          confirmLoading={confirmLoadingTag}
          onCancel={handleCancelTag}
        >
          <Form
            {...layout}
            name="tag-form"
            onFinish={onFinishTag}
            form={tagForm}
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
            <Table
              columns={columnsTag}
              dataSource={tagsState}
              onChange={onChange}
            />
          </Form>
        </Modal>
      </Context.Provider>
    </>
  );
};

export default LayoutTop;
