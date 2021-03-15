import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import './Button.scss'

/**
 * NOTE: Should wrap `<span />` to children in case of showing loading animation.
 */
const Button = forwardRef((props, ref) => (
  <button {...props} ref={ref} className={clsx('btn', props.className)} />
))

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'primary',
    'small-primary',
    'landing',
    'small-landing',
    'info',
    'secondary',
    'exception',
    'dismiss',
    'text',
    'Button_1'
  ]),
  disabled: PropTypes.bool,
  loading: PropTypes.oneOf(['true', 'false']),
  size: PropTypes.oneOf(['28', '36', '48']),
  radius: PropTypes.oneOf(['6', '12', '24'])
}

Button.defaultProps = {
  type: 'primary',
  loading: 'false'
  // size: '36',
  // radius: '12'
}

export default Button
