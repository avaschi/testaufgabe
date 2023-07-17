import { Injectable } from '@nestjs/common';
import * as addresses from '../../data/telefonbuch633bf1.json';

@Injectable()
export class AddressService {
  async getByPartialName(partialName: string) {
    return addresses.filter((address) =>
      address.name.toLowerCase().includes(partialName.toLowerCase()),
    );
  }
}
