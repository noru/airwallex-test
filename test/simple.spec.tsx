
import React from 'react'
import { Invite } from '../src/js/containers/Invite'
// import { identity } from 'noru-utils/lib'
import renderer from 'react-test-renderer'

const identity = i => i

let dispatchCallCount = 0
const dispatchMock = () => dispatchCallCount++

test('General tests', () => {
  let component = renderer.create(
    <Invite t={identity} dispatch={dispatchMock}></Invite>,
  )
  let instance = component.getInstance()
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  instance.openModal()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  instance.done()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(dispatchCallCount).toBe(1)

  instance.invite()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(dispatchCallCount).toBe(3)

})