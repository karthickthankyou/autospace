import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const deleteAll = async () => {
  await prisma.review.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.valetAssignment.deleteMany()
  await prisma.bookingTimeline.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.review.deleteMany()
  await prisma.service.deleteMany()
  await prisma.address.deleteMany()
  await prisma.slot.deleteMany()
  await prisma.garage.deleteMany()
  await prisma.company.deleteMany()

  //   Users
  await prisma.customer.deleteMany()
  await prisma.manager.deleteMany()
  await prisma.valet.deleteMany()
}

const reset = async () => {
  await deleteAll()
}

const main = async () => {
  await reset()
}

main()
