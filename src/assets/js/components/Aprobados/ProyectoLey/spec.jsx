import React from 'react';
import { shallow } from 'enzyme';
import ProyectoLey from './ProyectoLey';

describe('<ProyectoLey />', () => {
  let wrapper;

  const defaultProps = {
    boletin: 'test-boletin',
    resumen: 'Test resumen',
  };

  const factory = props => <ProyectoLey {...defaultProps} {...props} />;

  it('should match snapshot', () => {
    wrapper = shallow(factory());
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {});
});
