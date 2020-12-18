import { createButton } from './Button';

import { resolve, schemaKeysFactory, schemaFieldFactory, getSchemaFromKeyPath, getSubSchemas } from "../../esm";

export default {
  title: 'Example/Button',
  argTypes: {
    label: { control: 'text' },
    primary: { control: 'boolean' },
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    onClick: { action: 'onClick' },
  },
};

const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  // return `<div>${label}</div>`;
  return createButton({ label, ...args });
};

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

const schema  = {
  type: "object",
  $id: "design",
  required: ["name", "dsModelIds"],
  properties: {
    name: {
      type: "string",
      title: "面板名称"
    },
    description: {
      type: "string",
      title: "面板详情"
    },
    appType: {
      type: "string",
      title: "应用类型"
    },
    dsModelIds: {
      type: "array",
      items: {
        type: "number"
      }
    },
    dsModelData: {
      type: "object",
      properties: {
        data: {
          type: "object"
        },
        ids: {
          type: "object"
        }
      }
    },
    infoOptions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: {
            type: "string"
          },
          data: {
            type: "object"
          },
          infoOptions: {
            $ref: "design#/properties/infoOptions"
          }
        }
      }
    }
  }
};

resolve(schema);

console.log("design: ", getSchemaFromKeyPath("design"));
console.log("design/dsModelIds/-: ", getSchemaFromKeyPath("design/dsModelIds/-"));


console.log("design: ", getSubSchemas("design"));