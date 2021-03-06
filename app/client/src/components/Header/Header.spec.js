/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Header from './Header'

describe('(Component) <Header />', () => {
  it('should render the correct title', () => {
    const wrapper = shallow(
      <Header
        isAuthenticated={false}
        onLoginClick={() => {}}
        onLogoutClick={() => {}}
      />
    )
    expect(wrapper.find('h1').text()).to.equal('Timed')
  })
})
