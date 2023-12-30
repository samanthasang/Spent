import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./mainForm.styles.css";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN,
  addNewSpent,
  repeatrecordSpent,
} from "../../../redux/user_redux/userAction";

import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/en_GB";

import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(customParseFormat);
dayjs.extend(localeData);
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
        <Option value="ریال">ریال</Option>
        <Option value="تومان">تومان</Option>
        <Option value="دلار">دلار</Option>
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
  const [form] = Form.useForm();
  const spentState = useSelector((state) => state.user.spent);
  const tagsState = useSelector((state) => state.user.tags);
  const cattsState = useSelector((state) => state.user.catts);
  const repeat = useSelector((state) => state.user.repeat);
  const edit = useSelector((state) => state.user.edit);

  const onFinish = (values) => {
    let user = values["user"];
    console.log(values["user"]);
    user = {
      ...user,
      date: dayjs(values["user"].date).valueOf(),
      id: edit ? edit : uuidv4(),
    };
    dispatch(addNewSpent(user));
    form.setFieldsValue({
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
  };
  const onFill = () => {
    // let user = repeat;
    // user = { ...user, date: "", id: uuidv4() };
    // dispatch(addNewSpent([...spentState, user]));
    console.log(edit);
    console.log(repeat);
    console.log(dayjs(repeat.date).format());
    let newRecord = {
      user: {
        name: repeat.name,
        price: {
          number: repeat.price.number,
          currency: repeat.price.currency,
        },
        date: !edit ? null : dayjs(repeat.date),
        number: repeat.number,
        cattegory: repeat.cattegory,
        tags: repeat.tags,
        description: repeat.description,
      },
    };
    form.setFieldsValue(newRecord);
    // dispatch(repeatrecordSpent({ spent: null, edit: true }));
    console.log(repeat);
  };

  const onReset = () => {
    console.log(repeat);
    // let user = repeat;
    // user = { ...user, date: "", id: uuidv4() };
    // dispatch(addNewSpent([...spentState, user]));
    form.setFieldsValue({
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
    dispatch(repeatrecordSpent({ spent: null, edit: false }));
  };
  useEffect(() => {
    console.log(repeat);
    console.log(edit);
    repeat && repeat.name && onFill();
  }, [repeat]);

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
        name="main-form"
        onFinish={onFinish}
        onSubmit={onFinish}
        form={form}
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
              type: "number",
              min: 0,
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
          <DatePicker locale={locale} showTime format="YYYY-MM-DD HH:mm:ss" />
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
        </Form.Item>
        {!edit ? (
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
        ) : (
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Edit
            </Button>
          </Form.Item>
        )}

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="button" onClick={() => onReset()}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default MainTable;
