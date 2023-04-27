import { Meta, StoryObj } from '@storybook/react'
import { Box, BoxProps, Text } from '@vl-ignite-ui/react'
import React from 'react'

export default {
  title: 'Surfaces/Box',
  component: Box,

  args: {
    children: <Text>Testando elemento box</Text>,
  },
  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
  },
} as Meta<BoxProps>

export const Primary: StoryObj<BoxProps> = {}
