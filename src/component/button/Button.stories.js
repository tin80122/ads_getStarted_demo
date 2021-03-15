import React from 'react'
import Button from './Button'

export default {
  title: 'component/Button',
  component: Button,
  argTypes: {
    children: {
      control: 'none'
    },
    className: {
      control: 'none'
    }
  }
}

const Template = args => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <span>Default</span>
}

export const AllTypes = () => (
  <div style={{ display: 'flex' }}>
    <Button type='primary'>Primary</Button>
    <Button type='small-primary'>Small Primary</Button>
    <Button type='landing'>Landing</Button>
    <Button type='small-landing'>Small Landing</Button>
    <Button type='info'>Info</Button>
    <Button type='secondary'>Secondary</Button>
    <Button type='exception'>Exception</Button>
    <Button type='dismiss'>Dismiss</Button>
    <Button type='text'>Text</Button>
  </div>
)

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
  children: <span>Primary</span>
}

export const SmallPrimary = Template.bind({})
SmallPrimary.args = {
  type: 'small-primary',
  children: <span>Small Primary</span>
}

export const Landing = Template.bind({})
Landing.args = {
  type: 'landing',
  children: <span>Landing</span>
}

export const SmallLanding = Template.bind({})
SmallLanding.args = {
  type: 'small-landing',
  children: <span>Small Landing</span>
}

export const Info = Template.bind({})
Info.args = {
  type: 'info',
  children: <span>Info</span>
}

export const Secondary = Template.bind({})
Secondary.args = {
  type: 'secondary',
  children: <span>Secondary</span>
}

export const Exception = Template.bind({})
Exception.args = {
  type: 'exception',
  children: <span>Exception</span>
}

export const Dismiss = Template.bind({})
Dismiss.args = {
  type: 'dismiss',
  children: <span>Dismiss</span>
}

export const Text = Template.bind({})
Text.args = {
  type: 'text',
  children: <span>Text</span>
}
