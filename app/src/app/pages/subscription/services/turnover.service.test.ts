import { TURNOVERS } from '@data/turnovers.data';
import { injectService } from '@testing/render';
import { TurnoverService } from './turnover.service';

// I know this isn't very useful while the service just returns a mock.
describe('src/app/pages/subscription/services/turnover.service', () => {
  it('When getTurnovers is called then returns the turnovers list', () => {
    const service = injectService(TurnoverService);
    let result: unknown;

    service.getTurnovers().subscribe((turnovers) => {
      result = turnovers;
    });

    expect(result).toEqual(TURNOVERS);
  });
});
