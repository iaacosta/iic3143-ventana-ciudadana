import React from 'react';
import { shallow } from 'enzyme';
import Aprobados from './Aprobados';

describe('<Aprobados />', () => {
  let wrapper;

  const defaultProps = {};
  const factory = props => <Aprobados {...defaultProps} {...props} />;

  it('should match snapshot', () => {
    wrapper = shallow(factory());
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {});
});
