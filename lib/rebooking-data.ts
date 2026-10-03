export type Reservation = {
  id: string
  title: string
  neighborhood: string
  city: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  nightlyRate: number
  total: number
  paymentMethod: string
  image: string
}

export type Listing = {
  id: string
  title: string
  type: string
  neighborhood: string
  distanceMiles: number
  rating: number
  reviews: number
  isSuperhost: boolean
  instantBook: boolean
  acceptsRebookingCoupon: boolean
  nightlyRate: number
  total: number
  hostName: string
  highlights: string[]
  image: string
}

export const REBOOKING_COUPON = 150

export const originalReservation: Reservation = {
  id: '41127',
  title: 'Industrial loft near SAP Center',
  neighborhood: 'Downtown',
  city: 'San Jose, CA',
  checkIn: 'Sat, Oct 3',
  checkOut: 'Tue, Oct 6',
  nights: 3,
  guests: 2,
  nightlyRate: 189,
  total: 642,
  paymentMethod: 'Visa •••• 4242',
  image: '/listings/original-loft.png',
}

export const alternativeListings: Listing[] = [
  {
    id: 'sj-sofa-studio',
    title: 'Sunlit studio in SoFA District',
    type: 'Entire studio',
    neighborhood: 'SoFA District',
    distanceMiles: 0.6,
    rating: 4.92,
    reviews: 318,
    isSuperhost: true,
    instantBook: true,
    acceptsRebookingCoupon: true,
    nightlyRate: 172,
    total: 589,
    hostName: 'Maya',
    highlights: ['Self check-in', 'Free parking'],
    image: '/listings/sofa-studio.png',
  },
  {
    id: 'sj-san-pedro-1br',
    title: 'Modern 1BR by San Pedro Square',
    type: 'Entire apartment',
    neighborhood: 'San Pedro Square',
    distanceMiles: 0.9,
    rating: 4.88,
    reviews: 204,
    isSuperhost: true,
    instantBook: true,
    acceptsRebookingCoupon: true,
    nightlyRate: 185,
    total: 631,
    hostName: 'Daniel',
    highlights: ['City views', 'Fast Wi‑Fi'],
    image: '/listings/san-pedro-1br.png',
  },
  {
    id: 'sj-japantown-suite',
    title: 'Craftsman guest suite in Japantown',
    type: 'Entire guest suite',
    neighborhood: 'Japantown',
    distanceMiles: 1.7,
    rating: 4.96,
    reviews: 527,
    isSuperhost: true,
    instantBook: true,
    acceptsRebookingCoupon: true,
    nightlyRate: 214,
    total: 718,
    hostName: 'Ken & Aiko',
    highlights: ['Private entrance', 'Garden patio'],
    image: '/listings/japantown-suite.png',
  },
]

export function eligibleListings(listings: Listing[], budget: number) {
  return listings
    .filter(
      (l) =>
        l.instantBook &&
        (l.isSuperhost || l.rating >= 4.8) &&
        (l.total <= budget || l.acceptsRebookingCoupon),
    )
    .sort((a, b) => a.distanceMiles - b.distanceMiles)
    .slice(0, 3)
}

export function formatUSD(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
