import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './button';
import '../../styles/index.scss'
import PropTypes from 'prop-types';

export default {
  title: 'Example/Button Component',
  component: Button,
  argTypes: { 
    disabled: {
      description: '可否点击',
      control: 'boolean',
      table: {
        category: 'Type',
        defaultValue: {
          summary: 'false'
        }
      },
    },
    btnType: {
      options: ['primary', 'default', 'danger', 'link'],
      control: 'radio',
      table: {
        category: 'Type',
      },
    },
    // Assigns the argType to the Events category
    onClick: {
      table: {
        category: 'Events',
      },
    },
    // Assigns the argType to the Sizes category
    size: {
      options: ['lg', 'sm', 'none'],
      control: 'select',
      table: {
        category: 'Sizes',
      },
    },
    href: {
      control: 'text',
      table: {
        category: 'Text',
      },
    }
  },
  decorators: [
    (Story) => (
      <div style={{ marginLeft: '35%' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>defaultButton</Button>;
const sizeTemplate: ComponentStory<typeof Button> = () => (
  <>
    <Button size="lg">large button</Button>
    <Button size="sm">small button</Button>
  </>
);
const typeTemplate: ComponentStory<typeof Button> = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://google.com"> link button </Button>
  </>
);

export const defaultButton = Template.bind({});
defaultButton.args = {
};

export const buttonWithSize = sizeTemplate.bind({});
buttonWithSize.storyName = '不同尺寸的 Button';
export const buttonWithType = typeTemplate.bind({});
buttonWithType.storyName = '不同类型的 Button'
