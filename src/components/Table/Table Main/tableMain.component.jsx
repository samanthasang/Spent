import React, { useEffect, useRef, useState } from "react";

import "./tableMain.styles.css";
import dayjs from "dayjs";
import { DatePicker, Typography, Button, Input, Table, Space, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  deleterecordSpent,
  repeatrecordSpent,
} from "../../../redux/user_redux/userAction";
import SearchForm from "../../Form/search form/searchForm.component";

const { RangePicker } = DatePicker;
const { Text } = Typography;
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const TableMain = () => {
  const dispatch = useDispatch();
  const spents = useSelector((state) => state.user.spent);
  const tagsState = useSelector((state) => state.user.tags);
  const cattsState = useSelector((state) => state.user.catts);
  const searchState = useSelector((state) => state.user.search);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const searchInput2 = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log(selectedKeys);
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const DeleteRecord = (recordId) => {
    dispatch(deleterecordSpent(recordId));
  };

  const GetColumnSearchPropsSearch = (dataIndex) => ({
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
  const getColumnSearchPropsDate = (dataIndex) => ({
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
        <RangePicker
          ref={searchInput2}
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
        setTimeout(() => searchInput2.current?.select(), 100);
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
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      render: (cattegory) => (
        <span>
          {cattegory.map((cattegory) => {
            let color = cattegory.length > 5 ? "geekblue" : "green";
            if (cattegory === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={cattegory}>
                {cattegory.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      filters: tagsState,
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
      title: "Cattegory",
      dataIndex: "cattegory",
      filters: cattsState,
      // specify the condition of filtering result
      // here is that finding the cattegory started with `value`
      onFilter: (value, record) => record.cattegory.includes(value),
      render: (cattegory) => (
        <span>
          {cattegory.map((cattegory) => {
            let color = cattegory.length > 5 ? "geekblue" : "green";
            if (cattegory === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={cattegory}>
                {cattegory.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => <span>{price.number + " " + price.currency}</span>,
      sorter: (a, b) => a.price.number - b.price.number,
    },
    {
      title: "Number",
      dataIndex: "number",
      sorter: (a, b) => a.number - b.number,
      ...getColumnSearchProps("number"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <span>{dayjs(date).format("YYYY-MM-DD -  HH:mm:ss")}</span>
      ),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      defaultSortOrder: ["descend"],
      onFilter: (value, record) => record.date.indexOf(value) === 0,
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
          <button
            onClick={() =>
              dispatch(repeatrecordSpent({ spent: record, edit: record.id }))
            }
          >
            Edit {record.name}
          </button>
          <button
            onClick={() =>
              dispatch(repeatrecordSpent({ spent: record, edit: false }))
            }
          >
            Repeat {record.name}
          </button>
          <button onClick={() => DeleteRecord(record.id)}>DeleteRecord</button>
        </Space>
      ),
    },
  ];

  const search = (search) => {
    console.log(search);
  };
  useEffect(() => {
    console.log(spents);
  }, [spents]);

  return (
    <>
      <Table
        columns={columns}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
        }}
        dataSource={searchState.length > 0 ? searchState : spents}
        onChange={onChange}
        summary={(pageData) => {
          let priceCurrency = 0;
          let totalPriceRial = 0;
          pageData.forEach(({ price }) => {
            totalPriceRial += price.number;
            priceCurrency = price.currency;
          });
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Total Item</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Text type="success">
                    {pageData.length} 
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Text type="success">
                    {totalPriceRial} {priceCurrency}
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </>
  );
};
export default TableMain;
