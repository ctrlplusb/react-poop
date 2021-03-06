import assert from 'assert'
import { shallow } from 'enzyme'
import React from 'react'

import poop from './poop'

describe('poop', () => {
  const Handler = () => <div />

  describe('class', () => {
    const error = new Error('Cannot read property \'not\' of undefined')
    let NiceClass
    let EvilClass

    beforeEach(() => {
      NiceClass = React.createClass({
        render() {
          return <div>Dummy</div>
        },
      })

      EvilClass = React.createClass({
        render() {
          return <div>{this.does.not.exist}</div>
        },
      })
    })

    it('renders the component when everything is fine', () => {
      const Dummy = poop()(NiceClass)
      const wrapper = shallow(<Dummy />)

      assert(wrapper.contains('Dummy'))
    })

    it('renders the handler when something goes wrong', () => {
      const Dummy = poop(Handler)(EvilClass)
      const wrapper = shallow(<Dummy />)

      assert.equal(wrapper.first().find('Handler').length, 1)
    })

    it('passes the error object to the handler', () => {
      const Dummy = poop(Handler)(EvilClass)
      const wrapper = shallow(<Dummy />)

      assert(wrapper.first().prop('error'))
      assert.equal(wrapper.first().prop('error').message, error.message)
    })

    it('renders the poop when something goes wrong', () => {
      const Dummy = poop()(EvilClass)
      const wrapper = shallow(<Dummy />)

      assert.equal(wrapper.first().find('Poop').length, 1)
    })
  })

  describe('stateless', () => {
    const error = new Error('Cannot read property \'does\' of undefined')
    let NiceStateless
    let EvilStateless

    beforeEach(() => {
      NiceStateless = () => <div>Dummy</div>

      EvilStateless = () => <div>{this.does.not.exist}</div>
    })

    it('renders the component when everything is fine', () => {
      const Dummy = poop()(NiceStateless)
      const wrapper = shallow(<Dummy />)

      assert(wrapper.contains('Dummy'))
    })

    it('renders the handler when something goes wrong', () => {
      const Dummy = poop(Handler)(EvilStateless)
      const wrapper = shallow(<Dummy />)

      assert.equal(wrapper.first().find('Handler').length, 1)
    })

    it('passes the error object to the handler', () => {
      const Dummy = poop(Handler)(EvilStateless)
      const wrapper = shallow(<Dummy />)

      assert(wrapper.first().prop('error'))
      assert.equal(wrapper.first().prop('error').message, error.message)
    })

    it('renders the poop when something goes wrong', () => {
      const Dummy = poop()(EvilStateless)
      const wrapper = shallow(<Dummy />)

      assert.equal(wrapper.first().find('Poop').length, 1)
    })
  })
})
