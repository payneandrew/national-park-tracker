interface Activity {
  id: string;
  name: string;
}

interface Address {
  line1: string;
  line2: string;
  line3: string;
  city: string;
  stateCode: string;
  countryCode: string;
  provinceTerritoryCode: string;
  postalCode: string;
  type: string;
}

interface PhoneNumber {
  phoneNumber: string;
  description: string;
  extension: string;
  type: string;
}

interface EmailAddress {
  emailAddress: string;
  description: string;
}

interface Contact {
  phoneNumbers: PhoneNumber[];
  emailAddresses: EmailAddress[];
}

interface Image {
  credit: string;
  altText: string;
  title: string;
  id: number;
  caption: string;
  url: string;
}

interface Hours {
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
}

interface Exception {
  name: string;
  startDate: string;
  endDate: string;
  exceptionHours: Hours[];
}

interface OperatingHour {
  name: string;
  description: string;
  standardHours: Hours;
  exceptions: Exception[];
}

interface EntrancePass {
  cost: number;
  description: string;
  title: string;
}

export interface ParkData {
  activities: Activity[];
  addresses: Address[];
  contacts: Contact[];
  description: string;
  designation: string;
  directionsInfo: string;
  directionsUrl: string;
  entranceFees: EntrancePass[];
  entrancePasses: EntrancePass[];
  fullName: string;
  id: string;
  images: Image[];
  latLong: string;
  name: string;
  operatingHours: OperatingHour[];
  parkCode: string;
  states: string;
  topics: Activity[];
  url: string;
  weatherInfo: string;
}

export interface ParkResponse {
  total: string;
  data: any[];
  limit: string;
  start: string;
}
