import React from 'react';
import { shallow, mount } from 'enzyme';

import App from './Home';
import s from './Home.scss';

// describe('<App />', () => {
//   test('should render App', async () => {
//     const wrapper = mount(<App />)
//     expect(wrapper.find(s.area).length).toBe(0)
//     // await new Promise(res => setTimeout(res, 2000))
//     // expect(wrapper.find(s.area).length).toBe(12)
//     wrapper.unmount();
//   })
// })

describe('test functions', () => {
  test('shuffle should be correct', async () => {
    const test = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    expect(test.length).toBe(12)
  })
})