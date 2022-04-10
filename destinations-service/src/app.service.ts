import { Injectable } from '@nestjs/common';

import fetch from 'node-fetch';
// this is for DB
const apiUrl = 'http://localhost:3000';

@Injectable()
export class AppService {
  getDestinations(): object {
    // this is a pretend DB GET
    return fetch(`${apiUrl}/destinations`).then((res) => res.json());
  }

  getDestination(id): object {
    // this is a pretend DB GET
    return fetch(`${apiUrl}/destinations/${id}`).then((res) => res.json());
  }
}
