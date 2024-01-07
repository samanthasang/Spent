import React, { useState } from "react";

import "./searchForm.styles.css";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN,
  addSearchRecord,
  resetSearchRecord,
} from "../../../redux/user_redux/userAction";

const { RangePicker } = DatePicker;
const { Option } = Select;
const PriceInput = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState("تومان");
  const triggerChange = (changedValue) => {
    onChange?.({
      number,
      currency,
      ...value,
      ...changedValue,
    });
  };
  const onNumberChange = (e) => {
    const newNumber = parseInt(e.target.value || "0", 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!("number" in value)) {
      setNumber(newNumber);
    }
    triggerChange({
      number: newNumber,
    });
  };
  const onCurrencyChange = (newCurrency) => {
    if (!("currency" in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({
      currency: newCurrency,
    });
  };

  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{
          width: 100,
        }}
      />
      <Select
        value={value.currency || currency}
        style={{
          width: 80,
          margin: "0 8px",
        }}
        onChange={onCurrencyChange}
      >
        <Option value="تومان">تومان</Option>
        <Option value="ریال">ریال</Option>
      </Select>
    </span>
  );
};

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};
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
/* eslint-enable no-template-curly-in-string */

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
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
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
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const onChange = (date) => {
  if (date) {
    console.log("Date: ", date);
  } else {
    console.log("Clear");
  }
};

const rangePresets = [
  {
    label: "Last 7 Days",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "Last 14 Days",
    value: [dayjs().add(-14, "d"), dayjs()],
  },
  {
    label: "Last 30 Days",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
  {
    label: "Last 90 Days",
    value: [dayjs().add(-90, "d"), dayjs()],
  },
];

const SearchForm = () => {
  const dispatch = useDispatch();
  const spentState = useSelector((state) => state.user.spent);
  const tagsState = useSelector((state) => state.user.tags);
  const cattsState = useSelector((state) => state.user.catts);
  const [searchForm] = Form.useForm();

  const onReset = () => {
    searchForm.setFieldsValue({
      user: {
        name: null,
        price: {
          number: 0,
          currency: "تومان",
        },
        date: null,
        number: null,
        cattegory: [],
        tags: [],
        description: null,
        id: null,
      },
    });
    dispatch(resetSearchRecord({}));
  };
  const onFinish = (values) => {
    dispatch(
      addSearchRecord([
        dayjs(values.user.date[0]).valueOf(),
        dayjs(values.user.date[1]).valueOf(),
      ])
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(LOGIN());
  };
  const checkPrice = (_, value) => {
    if (value.number > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Price must be greater than zero!"));
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log(
        "From: ",
        dayjs(dates[0]).valueOf(),
        ", to: ",
        dayjs(dates[1]).valueOf()
      );
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Form
        {...layout}
        name="search-form"
        onFinish={onFinish}
        form={searchForm}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "date"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <RangePicker
            presets={[
              {
                label: <span aria-label="Today">Today</span>,
                value: () => [dayjs().startOf("day"), dayjs().endOf("day")], // 5.8.0+ support function
              },
              ...rangePresets,
            ]}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={onRangeChange}
          />
        </Form.Item>
        {/* <Form.Item name={["user", "name"]} label="Name">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "price"]} label="Price">
          <PriceInput />
        </Form.Item>
        <Form.Item
          name={["user", "number"]}
          label="Number"
          rules={[
            {
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name={["user", "cattegory"]} label="Cattegory">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            onChange={handleChange}
            options={cattsState}
          />
        </Form.Item>

        <Form.Item name={["user", "tags"]} label="Tag">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            onChange={handleChange}
            options={tagsState}
          />
        </Form.Item>

        <Form.Item name={["user", "description"]} label="description">
          <Input.TextArea />
        </Form.Item> */}
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
            span: 16,
          }}
        >
          <Button
            className="bg-btn-900"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
          <Button
            className="bg-btn-900"
            type="primary"
            htmlType="button"
            onClick={() => onReset()}
          >
            Reset
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 4,
          }}
        ></Form.Item>
      </Form>
    </>
  );
};

export default SearchForm;
