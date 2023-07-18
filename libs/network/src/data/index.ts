import { BookingStatus, BookingsQuery, SlotType } from '../generated'

export const garages = {
  garages: [
    {
      id: 1,
      displayName: 'Garage 1',
      description: 'Description for Garage 1',
      images: ['https://placehold.co/400', 'https://placehold.co/300'],
      verification: {
        verified: true,
      },
      address: {
        address: '123 Street',
        lat: 12.34,
        lng: 56.78,
      },
      slotCounts: [
        {
          type: SlotType.Bicycle,
          count: 400,
        },
        {
          type: SlotType.Bike,
          count: 200,
        },
        {
          type: SlotType.Car,
          count: 40,
        },
        {
          type: SlotType.Heavy,
          count: 10,
        },
      ],
    },
  ],
  garagesCount: {
    count: 10,
  },
}

export const searchGarages = {
  searchGarages: [
    {
      id: 1,
      address: {
        lat: 12.34,
        lng: 56.78,
        address: '123 Street',
      },
      services: [
        {
          id: 1,
          name: 'Service 1',
          description: 'Description for Service 1',
          price: 100,
          duration: 60,
        },
      ],
      images: ['https://placehold.co/400', 'https://placehold.co/300'],
      displayName: 'Garage 1',
      availableSlots: [
        {
          type: SlotType.Bicycle,
          count: 5,
          pricePerHour: 10,
        },
      ],
    },
  ],
  searchGaragesCount: {
    count: 5,
  },
}

export const bookings: BookingsQuery = {
  bookings: [
    {
      id: 1,
      pricePerHour: 10,
      endTime: '2023-07-19T12:00:00.000Z',
      startTime: '2023-07-19T10:00:00.000Z',
      vehicleNumber: 'ABC123',
      passcode: '1234',
      status: BookingStatus.Booked,
      valetAssignment: {
        pickupValet: {
          image: 'https://placehold.co/400',
          uid: '1',
          displayName: 'Valet 1',
        },
        returnValet: {
          image: 'https://placehold.co/300',
          uid: '2',
          displayName: 'Valet 2',
        },
      },
      slot: {
        displayName: 'Slot 1',
        garage: {
          images: ['https://placehold.co/400', 'https://placehold.co/300'],
          address: {
            address: '123 Street',
            lat: 12.34,
            lng: 56.78,
          },
        },
      },
    },
  ],
  bookingsCount: {
    count: 5,
  },
}

export const myCompany = {
  myCompany: {
    id: '1',
    createdAt: '2023-07-18T12:00:00.000Z',
    displayName: 'Company 1',
    description: 'Description for Company 1',
    garages: [
      {
        images: ['https://placehold.co/400', 'https://placehold.co/300'],
        id: '1',
        description: 'Description for Garage 1',
        displayName: 'Garage 1',
        address: {
          lat: '12.34',
          lng: '56.78',
          address: '123 Street',
        },
      },
    ],
  },
  garagesCount: {
    count: 5,
  },
}

export const valets = {
  valets: [
    {
      updatedAt: '2023-07-18T12:00:00.000Z',
      uid: '1',
      displayName: 'Valet 1',
      createdAt: '2023-07-18T12:00:00.000Z',
      companyId: 1,
      image: 'https://placehold.co/300',
    },
  ],
}
