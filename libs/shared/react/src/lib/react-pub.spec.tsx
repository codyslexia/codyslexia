import { render } from '@testing-library/react'

import ReactPub from './react-pub'

describe('ReactPub', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactPub />)
    expect(baseElement).toBeTruthy()
  })
})
