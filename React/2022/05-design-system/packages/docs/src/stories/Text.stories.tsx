import { Meta, StoryObj } from '@storybook/react'
import { Text, TextProps } from '@vl-ignite-ui/react'

export default {
  title: 'Typography/Text',
  component: Text,

  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto reprehenderit accusantium voluptas qui consequatur accusamus, corporis obcaecati iusto neque ipsa incidunt ducimus, facere amet rem repudiandae et enim, deserunt rerum?,',
  },
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}

export const CustomTag: StoryObj<TextProps> = {
  args: {
    children: 'Strong text',
    as: 'strong',
  },
}
