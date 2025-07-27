import { PickType } from '@nestjs/swagger';

import { Offer } from '../entities/offer.entity';

export class BaseOfferDto extends PickType(Offer, ['amount', 'hidden']) {}
