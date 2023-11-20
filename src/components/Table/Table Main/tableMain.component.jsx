import React, { useRef, useState } from "react";

import "./tableMain.styles.css";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Table,
  FloatButton,
  Modal,
  Space,
  Tag,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";

const data = [
  {
    key: "1",
    name: "John Brown",
    cattegory: ["cool"],
    tags: ["cool", "teacher"],
    price: 32,
    number: 32,
    date: "2014-12-24 23:12:00",
    description: "London No. 2 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    cattegory: ["cool"],
    tags: ["cool", "teacher"],
    price: 32,
    number: 32,
    date: "2014-12-24 23:12:00",
    description: "London No. 2 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    cattegory: ["cool"],
    tags: ["cool", "teacher"],
    price: 32,
    number: 32,
    date: "2014-12-24 23:12:00",
    description: "London No. 2 Lake Park f",
  },
  {
    key: "4",
    name: "Jim Red",
    cattegory: ["cool"],
    tags: ["cool", "teacher"],
    price: 32,
    number: 32,
    date: "2014-12-24 23:12:00",
    description: "London No. 2 Lake Park f",
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const TableMain = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
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

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    ...getColumnSearchProps("name"),
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Cattegory",
    dataIndex: "cattegory",
    filters: [
      {
        text: "cool",
        value: "cool",
      },
      {
        text: "teacher",
        value: "teacher",
      },
    ],
    // specify the condition of filtering result
    // here is that finding the cattegory started with `value`
    onFilter: (value, record) => record.cattegory.includes(value),
    render: (cattegory) => (
      <span>
        {cattegory.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Number",
    dataIndex: "number",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.number - b.number,
    ...getColumnSearchProps("number"),
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    filters: [
      {
        text: "cool",
        value: "cool",
      },
      {
        text: "teacher",
        value: "teacher",
      },
    ],
    onFilter: (value, record) => record.tags.includes(value),
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Description",
    dataIndex: "description",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.description.indexOf(value) === 0,
    ...getColumnSearchProps("description"),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
  return (
    <>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
};
export default TableMain;
