import React from 'react';
import { shallow } from 'enzyme';
import CifrasBox from './CifrasBox';

describe('<CifrasBox />', () => {
  let wrapper;

  const defaultProps = {};
  const factory = props => <CifrasBox {...defaultProps} {...props} />;

  it('should match snapshot', () => {
    wrapper = shallow(factory());
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {});
});
