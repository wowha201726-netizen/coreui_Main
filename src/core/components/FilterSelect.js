/* eslint-disable no-unused-vars */
import React  from 'react';
import { Select } from 'antd';

export function FilterSelect({id, value, onChange, values}) {
  return (
    <Select
      id={id}
      value={value}
      onChange={onChange}
    >
      {values.map(({value, label}, idx) => <Select.Option key={idx} value={value} >{label}</Select.Option>)}
    </Select>
  );
}
