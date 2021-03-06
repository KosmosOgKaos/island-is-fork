import fetch from 'isomorphic-fetch'

import { Injectable } from '@nestjs/common'
import { uuid } from 'uuidv4'

import { User } from '@island.is/financial-aid/shared'

import { environment } from '../../../environments'

@Injectable()
export class AuthService {
  async findUser(nationalId: string): Promise<User | undefined> {
    const res = await fetch(
      `${environment.backend.url}/api/user/?nationalId=${nationalId}`,
      {
        headers: { authorization: `Bearer ${environment.auth.secretToken}` },
      },
    )

    if (!res.ok) {
      return undefined
    }

    return await res.json()
  }

  fakeUser(nationalId: string) {
    const fakeUsers: { [key: string]: User } = {
      '0000000000': {
        nationalId: '0000000000',
        name: 'Lárus Árnasson',
        phoneNumber: '9999999',
        folder: uuid(),
        service: 'osk',
      },
      '0000000001': {
        nationalId: '0000000001',
        name: 'Lára Margrétardóttir',
        phoneNumber: '9999999',
        folder: uuid(),
        service: 'osk',
      },
      '0000000002': {
        nationalId: '0000000002',
        name: 'Klára Línudóttir',
        phoneNumber: '9999999',
        folder: uuid(),
        service: 'veita',
      },
    }

    if (nationalId in fakeUsers) {
      return fakeUsers[nationalId]
    }

    return undefined
  }
}
