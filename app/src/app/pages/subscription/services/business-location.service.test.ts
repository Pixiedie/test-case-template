import { BUSINESS_LOCATIONS } from '@data/business-locations.data';
import { injectService } from '@testing/render';
import { BusinessLocationService } from './business-location.service';

// I know this isn't very useful while the service just returns a mock.
describe('src/app/pages/subscription/services/business-location.service', () => {
  it('When getBusinessLocations is called then returns the business locations list', () => {
    const service = injectService(BusinessLocationService);
    let result: unknown;

    service.getBusinessLocations().subscribe((locations) => {
      result = locations;
    });

    expect(result).toEqual(BUSINESS_LOCATIONS);
  });
});
