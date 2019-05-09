import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import Aprobados, { mapProyectoDeLey } from './Aprobados';

describe('<Aprobados />', () => {
  let wrapper;

  const defaultProps = {};
  const factory = props => <Aprobados {...defaultProps} {...props} />;

  const fakeResponse = {
    proyectos: [
      {
        id: 'testId0',
        boletin: 'test-boletin-0',
        resumen: 'Test resumen 0',
        estado: 'aprobado',
      },
      {
        id: 'testId1',
        boletin: 'test-boletin-1',
        resumen: 'Test resumen 1',
        estado: 'rechazado',
      },
      {
        id: 'testId2',
        boletin: 'test-boletin-2',
        resumen: 'Test resumen 2',
        estado: 'tramitacion',
      },
      {
        id: 'testId3',
        boletin: 'test-boletin-3',
        resumen: 'Test resumen 3',
        estado: 'suspendido',
      },
    ],
  };

  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('/proyectos-ley/aprobados', {
      status: 200,
      response: fakeResponse,
    });
    wrapper = shallow(factory());
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('debe mantener snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe renderear correctamente', () => {
    expect(wrapper.find('CifrasBox').length).toBe(4);
    expect(wrapper.find('ScrollList').length).toBe(4);
  });

  test('debe consultar la api por los proyectos y setear estado', async () => {
    await wrapper.instance().busy;
    expect(wrapper.state('proyectos')).toBe(fakeResponse.proyectos);
  });

  test('debe renderear las cifras correctamente', async () => {
    await wrapper.instance().busy;
    const aprobados = wrapper.find('CifrasBox').at(0);
    const tramitacion = wrapper.find('CifrasBox').at(1);
    const suspendido = wrapper.find('CifrasBox').at(2);
    const rechazado = wrapper.find('CifrasBox').at(3);

    expect(aprobados.prop('cifra')).toBe(1);
    expect(aprobados.prop('label')).toBe('Proyectos aprobados');
    expect(aprobados.prop('estado')).toBe('aprobado');

    expect(tramitacion.prop('cifra')).toBe(1);
    expect(tramitacion.prop('label')).toBe('Proyectos en tramitación');
    expect(tramitacion.prop('estado')).toBe('tramitacion');

    expect(suspendido.prop('cifra')).toBe(1);
    expect(suspendido.prop('label')).toBe('Proyectos suspendidos');
    expect(suspendido.prop('estado')).toBe('suspendido');

    expect(rechazado.prop('cifra')).toBe(1);
    expect(rechazado.prop('label')).toBe('Proyectos rechazados');
    expect(rechazado.prop('estado')).toBe('rechazado');
  });

  test('debe renderear las scroll lists correctamente', async () => {
    await wrapper.instance().busy;

    const aprobados = wrapper.find('ScrollList').at(0);
    const tramitacion = wrapper.find('ScrollList').at(1);
    const suspendido = wrapper.find('ScrollList').at(2);
    const rechazado = wrapper.find('ScrollList').at(3);

    expect(aprobados.prop('items')).toStrictEqual([fakeResponse.proyectos[0]]);
    expect(aprobados.prop('mapFn')).toBe(mapProyectoDeLey);

    expect(tramitacion.prop('items')).toStrictEqual([fakeResponse.proyectos[2]]);
    expect(tramitacion.prop('mapFn')).toBe(mapProyectoDeLey);

    expect(suspendido.prop('items')).toStrictEqual([fakeResponse.proyectos[3]]);
    expect(suspendido.prop('mapFn')).toBe(mapProyectoDeLey);

    expect(rechazado.prop('items')).toStrictEqual([fakeResponse.proyectos[1]]);
    expect(rechazado.prop('mapFn')).toBe(mapProyectoDeLey);
  });

  test('mapProyectoDeLey debe retornar un ProyectoLey con props', () => {
    const returnedWrapper = shallow(
      <div>{mapProyectoDeLey(fakeResponse.proyectos[0])}</div>,
    );

    expect(returnedWrapper.find('ProyectoLey').exists()).toBe(true);
    expect(returnedWrapper.find('ProyectoLey').prop('boletin')).toBe(
      fakeResponse.proyectos[0].boletin,
    );
    expect(returnedWrapper.find('ProyectoLey').prop('resumen')).toBe(
      fakeResponse.proyectos[0].resumen,
    );
    expect(returnedWrapper.find('ProyectoLey').prop('url')).toBe(
      `/proyectos-ley/${fakeResponse.proyectos[0].id}`,
    );
  });
});
