import { describe, it, expect } from 'vitest';
import { servicesData, getServiceById } from '../data/services';

describe('servicesData', () => {
  it('exports 4 services', () => {
    expect(servicesData).toHaveLength(4);
  });

  it('each service has the required fields', () => {
    for (const s of servicesData) {
      expect(s.id).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.details.longDesc).toBeTruthy();
      expect(s.details.features.length).toBeGreaterThan(0);
      expect(s.details.benefits.length).toBeGreaterThan(0);
    }
  });

  it('service ids are unique', () => {
    const ids = servicesData.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('getServiceById returns the correct service', () => {
    expect(getServiceById('01')?.title).toContain('CX');
    expect(getServiceById('02')?.title).toContain('Leads');
    expect(getServiceById('03')?.title).toContain('Autónomos');
    expect(getServiceById('04')?.title).toContain('Digital');
  });

  it('getServiceById returns undefined for unknown id', () => {
    expect(getServiceById('99')).toBeUndefined();
    expect(getServiceById('')).toBeUndefined();
  });

  it('each benefit has title and desc', () => {
    for (const s of servicesData) {
      for (const b of s.details.benefits) {
        expect(b.title).toBeTruthy();
        expect(b.desc).toBeTruthy();
      }
    }
  });

  it('service 03 has subProducts (AVA suite)', () => {
    const s = getServiceById('03');
    expect(s?.subProducts).toBeDefined();
    expect(s?.subProducts!.length).toBeGreaterThan(0);
  });
});
