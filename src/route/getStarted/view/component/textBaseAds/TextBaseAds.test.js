import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // ref: https://github.com/testing-library/jest-dom
import TextBaseAds from './TextBaseAds'

describe('TextBaseAds', () => {
  it('should render in harmony', () => {
    expect(() => {
      render(<TextBaseAds />)
    }).not.toThrow()
  })
})
