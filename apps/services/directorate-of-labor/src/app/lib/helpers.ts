import { NotFoundException } from '@nestjs/common'

export const assertExists = <T>(resource: T): void => {
  if (!resource) {
    throw new NotFoundException("This resource doesn't exist")
  }
}
