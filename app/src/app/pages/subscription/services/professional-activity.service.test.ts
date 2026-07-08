import { PROFESSIONAL_ACTIVITIES } from '@data/professional-activities.data';
import { injectService } from '@testing/render';
import { ProfessionalActivityService } from './professional-activity.service';

// I know this isn't very useful while the service just returns a mock.
describe('src/app/pages/subscription/services/professional-activity.service', () => {
  it('When getActivities is called then returns the activities list', () => {
    const service = injectService(ProfessionalActivityService);
    let result: unknown;

    service.getActivities().subscribe((activities) => {
      result = activities;
    });

    expect(result).toEqual(PROFESSIONAL_ACTIVITIES);
  });
});
