 import { getFutureBookingDate } from '../utils/dateUtils';
 //const bookingDate = getFutureBookingDate(3);
 
 export const bookingData = {
 LionDance: {
    title: 'LOLO Monthly Show 2026 LOLO',
    bookingDate : '5 Sep 2026',
    time: '6:00 PM',
    category: 'PS2',
    ticketPrice: 692,
    ticketQty: 1,
    payment: {
      method: 'GrabPay',
    },
    showTimes: [
    '3:00 PM',
    '8:00 PM',
    ],
    
  },
    hahaLive2: {
    title: 'HEHE Live Concert 2026 HEHE',
    bookingDate : '31 Oct 2026',
    time: '6:00 PM',
    category: 'PS4',
    ticketPrice: 292,
    ticketQty: 2,
    payment: {
      method: 'GrabPay',
    },
    calendar: [
    {
    month: 'Jul 2026',
    dates: ['31'],
    },
    {
    month: 'Oct 2026',
    dates: ['25','30','31'],
    },
     {
    month: 'Nov 2026',
    dates: ['27'],
    },
    {
    month: 'Dec 2026',
    dates: ['26'],
    },
]
  },
    hahaLive3: {
    title: '- Lion Dance 2026 - 1DayPassD1',
    bookingDate : '1 Aug 2026',
    time: '10:00 AM',
    category: 'PS1',
    ticketPrice: 592,
    ticketQty: 3,
    payment: {
      method: 'GrabPay',
    },
  },
hahaLiveMixedCategory: {
    title: '2573 - ROSE Live Show 2026 -',
    bookingDate : '31 Jul 2026',
    time: '3:00 PM',
    categories: [
      {
        category: 'VIP',
        ticketPrice: 692,
        ticketQty: 2,
        requiresSeatSelection: true,
      },
      {
        category: 'PS3',
        ticketPrice: 392,
        ticketQty: 1,
        requiresSeatSelection: true,
      },
    ],
    payment: {
      method: 'GrabPay',
    },
  },
   LoloMixMember: {
    title: 'LOLO Monthly Show 2026 LOLO',
    bookingDate : '5 Sep 2026',
    time: '6:00 PM',
    category: 'PS1',
    ticketPrice: 533.50,
    ticketQty: 2,
    payment: {
      method: 'GrabPay',
    },
  },
  LoloMix: {
    title: 'LOLO Monthly Show 2026 LOLO',
    bookingDate : '5 Sep 2026',
    time: '6:00 PM',
    categories: [
      {
        category: 'VIP',
        ticketPrice: 694,
        ticketQty: 1,
      },
            {
        category: 'PS4',
        ticketPrice: 292,
        ticketQty: 1,
      },
    ],
    payment: {
      method: 'GrabPay',
    },
     calendar: [
    {
    month: 'Sep 2026',
    dates: ['5'],
    }
  ]
  },
  LionMixMember: {
    title: 'Day 1 - 21st National Lion',
    bookingDate : '31 Oct 2026',
    time: '10:00 AM',
    categories: [
      {
        category: 'PS1',
        ticketPrice: 592,
        ticketQty: 2,
      },
            {
        category: 'PS2',
        ticketPrice: 492,
        ticketQty: 2,
      },
    ],
    payment: {
      method: 'GrabPay',
    },
     calendar: [
    {
    month: 'Sep 2026',
    dates: ['5'],
    }
  ]
  },

  hahamaxpurchase: {
    title: 'LOLO Monthly Show 2026 LOLO',
    bookingDate : '5 Sep 2026',
    time: '6:00 PM',
    categories: [
      {
        category: 'PS4',
        ticketPrice: 292,
        ticketQty: 20,
      },
      {
        category: 'VIP',
        ticketPrice: 692,
        ticketQty: 20,
      },
    ],
    payment: {
      method: 'GrabPay',
    },
  },
    hahaLiveMember: {
    title: '2523 - HAHA Live in Genting [',
    bookingDate : '31 Jul 2026',
    time: '7:30 PM',
    category: 'PS3',
    ticketPrice: 150,
    ticketQty: 1,
    payment: {
      method: 'GrabPay',
      uncheckMarketing: true,
    },
  },
    LisaLive2: {
    title: '2572 - LISA Live Show 2026 -',
    bookingDate : '24 Jul 2026',
    time: '6:00 PM',
    category: 'VIP',
    ticketPrice: 692,
    ticketQty: 2,
    payment: {
      method: 'GrabPay',
    },
    calendar: [
    {
    month: 'Jul 2026',
    dates: ['24', '25'],
    },
]
    },
    HEHELive3: {
        title: 'HEHE Live Concert',
        bookingDate : '17 Jul 2026',
        time: '6:00 PM',
        category: 'VIP',
        ticketPrice: 692,
        ticketQty: 3,
        payment: {
          method: 'GrabPay',
        },
        calendar: [
        {
        month: 'Jul 2026',
        dates: ['17'],
        },
]
  },
};


export const personalInfoData = {
  malaysia: {
    title: 'MRS',
    firstName: 'Nurul',
    lastName: 'Dinda',
    nricPassport: 'A1234567',
    phoneCountrySearch: 'mal',
    phoneCountryOption: 'Malaysia (+60)',
    phoneNumber: '123456789',
    email: 'nurul.test@gmail.com',
    confirmationEmail: 'nurul.test@gmail.com',
    countrySearch: 'mal',
    countryOption: 'MALAYSIA',
    stateOption: 'Kedah',
  },

  indonesia: {
    title: 'MRS',
    firstName: 'Nurul',
    lastName: 'Dinda',
    nricPassport: 'A1234567',
    phoneCountrySearch: 'indo',
    phoneCountryOption: 'Indonesia (+62)',
    phoneNumber: '81234567890',
    email: 'nurul.test@gmail.com',
    confirmationEmail: 'nurul.test@gmail.com',
    countrySearch: 'indo',
    countryOption: 'INDONESIA',
  },

  singapore: {
    title: 'MRS',
    firstName: 'Nurul',
    lastName: 'Dinda',
    nricPassport: 'A1234567',
    phoneCountrySearch: 'sing',
    phoneCountryOption: 'Singapore (+65)',
    phoneNumber: '81234567',
    email: 'nurul.test@gmail.com',
    confirmationEmail: 'nurul.test@gmail.com',
    countrySearch: 'sing',
    countryOption: 'SINGAPORE',
  },

  philippines: {
    title: 'MRS',
    firstName: 'Nurul',
    lastName: 'Dinda',
    nricPassport: 'A1234567',
    phoneCountrySearch: 'ph',
    phoneCountryOption: 'Philippines (+63)',
    phoneNumber: '912345678',
    email: 'nurul.test@gmail.com',
    confirmationEmail: 'nurul.test@gmail.com',
    countrySearch: 'phi',
    countryOption: 'PHILIPPINES',
  },
};

export const currencyData = {
  currencies: ['SGD', 'USD', 'CNY'],
};

export const memberData = {
  classicMember: {
    membershipId: '182126',
    password: 'Test@123',
  },
};