import React from 'react';
import { shallow } from 'enzyme';
import ScrollList from './ScrollList';

describe('<ScrollList />', () => {
  let wrapper;

  const defaultProps = {
    items: [{ id: 'testId0', content: 'Test content 0' }],
    mapFn: jest.fn(),
  };

  const factory = props => <ScrollList {...defaultProps} {...props} />;

  test('debe mantener snapshot', () => {
    wrapper = shallow(factory());
    expect(wrapper).toMatchSnapshot();
  });

  test('debe renderear correctamente', () => {
    wrapper = shallow(factory());

    expect(wrapper.find('ul').exists()).toBe(true);
    expect(wrapper.find('ul').length).toBe(1);

    expect(wrapper.find('ul').prop('style')).toMatchObject({
      height: '2rem',
    });
  });

  test('debe ejecutar tres veces mapFn', () => {
    wrapper = shallow(factory());
    expect(defaultProps.mapFn).toHaveBeenCalledTimes(3);
  });

  test('debe setear la height si se le pasa argumento', () => {
    wrapper = shallow(factory({ height: '3rem' }));
    expect(wrapper.find('ul').prop('style')).toMatchObject({
      height: '3rem',
    });
  });
});
