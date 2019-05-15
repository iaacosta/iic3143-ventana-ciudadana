import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import Aprobados, { mapProyectoDeLey } from './Aprobados';

describe('<Aprobados />', () => {
  let wrapper;

  const defaultProps = {};
  const factory = props => <Aprobados {...defaultProps} {...props} />;

  const fakeProyectos = {
    aprobado: [
      {
        id: 'testId0',
        boletin: 'test-boletin-0',
        resumen: 'Test resumen 0',
        estado: 'aprobado',
      },
    ],
    rechazado: [
      {
        id: 'testId1',
        boletin: 'test-boletin-1',
        resumen: 'Test resumen 1',
        estado: 'rechazado',
      },
    ],
    tramitacion: [
      {
        id: 'testId2',
        boletin: 'test-boletin-2',
        resumen: 'Test resumen 2',
        estado: 'tramitacion',
      },
    ],
    suspendido: [
      {
        id: 'testId3',
        boletin: 'test-boletin-3',
        resumen: 'Test resumen 3',
        estado: 'suspendido',
      },
    ],
  };

  const fakeCifras = { aprobado: 1, rechazado: 1, tramitacion: 1, suspendido: 1 };

  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('/proyectos-ley/cifras', {
      status: 200,
      response: { cifras: fakeCifras },
    });
    moxios.stubRequest('/proyectos-ley/proyectos?estado=aprobado', {
      status: 200,
      response: { proyectos: fakeProyectos.aprobado },
    });
    moxios.stubRequest('/proyectos-ley/proyectos?estado=rechazado', {
      status: 200,
      response: { proyectos: fakeProyectos.rechazado },
    });
    moxios.stubRequest('/proyectos-ley/proyectos?estado=tramitacion', {
      status: 200,
      response: { proyectos: fakeProyectos.tramitacion },
    });
    moxios.stubRequest('/proyectos-ley/proyectos?estado=suspendido', {
      status: 200,
      response: { proyectos: fakeProyectos.suspendido },
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

    expect(wrapper.state('proyectos')).toMatchObject({
      aprobado: [...fakeProyectos.aprobado],
      rechazado: [...fakeProyectos.rechazado],
      tramitacion: [...fakeProyectos.tramitacion],
      suspendido: [...fakeProyectos.suspendido],
    });

    expect(wrapper.state('cifras')).toMatchObject({
      aprobado: fakeProyectos.aprobado.length,
      rechazado: fakeProyectos.rechazado.length,
      tramitacion: fakeProyectos.tramitacion.length,
      suspendido: fakeProyectos.suspendido.length,
    });
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

    expect(aprobados.prop('items')).toStrictEqual([...fakeProyectos.aprobado]);
    expect(aprobados.prop('mapFn')).toBe(mapProyectoDeLey);

    expect(tramitacion.prop('items')).toStrictEqual([...fakeProyectos.tramitacion]);
    expect(tramitacion.prop('mapFn')).toBe(mapProyectoDeLey);

    expect(suspendido.prop('items')).toStrictEqual([...fakeProyectos.suspendido]);
    expect(suspendido.prop('mapFn')).toBe(mapProyectoDeLey);

    expect(rechazado.prop('items')).toStrictEqual([...fakeProyectos.rechazado]);
    expect(rechazado.prop('mapFn')).toBe(mapProyectoDeLey);
  });

  test('mapProyectoDeLey debe retornar un ProyectoLey con props', () => {
    const returnedWrapper = shallow(
      <div>{mapProyectoDeLey(fakeProyectos.aprobado)}</div>,
    );

    expect(returnedWrapper.find('ProyectoLey').exists()).toBe(true);

    expect(returnedWrapper.find('ProyectoLey').prop('boletin')).toBe(
      fakeProyectos.aprobado.boletin,
    );

    expect(returnedWrapper.find('ProyectoLey').prop('resumen')).toBe(
      fakeProyectos.aprobado.resumen,
    );

    expect(returnedWrapper.find('ProyectoLey').prop('url')).toBe(
      `/proyectos-ley/${fakeProyectos.aprobado.id}`,
    );
  });
});
