import { Request, Response } from 'express';
import { container } from 'tsyringe';

import listProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderdayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listPrlistProviderDayAvailability = container.resolve(
      listProviderDayAvailabilityService,
    );

    const availability = await listPrlistProviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
