import React, { useState } from "react";

import "./mainForm.styles.css";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, addNewSpent } from "../../../redux/user_redux/userAction";

const { Option } = Select;
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}
const PriceInput = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState("rmb");

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
    triggerChange({ currency: newCurrency });
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
        <Option value="rial">ریال</Option>
        <Option value="toman">تومان</Option>
        <Option value="dollar">دلار</Option>
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

const MainTable = () => {
  const dispatch = useDispatch();
  const spentState = useSelector((state) => state.user.spent);
  const tagsState = useSelector((state) => state.user.tags);
  const cattsState = useSelector((state) => state.user.catts);

  const onFinish = (values) => {
    console.log(values["user"]);
    dispatch(addNewSpent([...spentState, values["user"]]));
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

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        onSubmit={onFinish}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
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
          name={["user", "price"]}
          label="Price"
          rules={[
            {
              validator: checkPrice,
            },
          ]}
        >
          <PriceInput />
        </Form.Item>
        <Form.Item
          name={["user", "date"]}
          label="DatePicker[showTime]"
          {...config}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name={["user", "number"]}
          label="Number"
          rules={[
            {
              type: "number",
              min: 0,
              max: 99,
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
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default MainTable;
