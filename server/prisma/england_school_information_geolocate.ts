import fetch from 'node-fetch';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const processFile = async () => {
  console.log('tart');
  const schools = await prisma.school.findMany({
    // take: 30,
    // skip: 30,
    select: {
      URN: true,
      COORDINATES: true,
      STREET: true,
      LOCALITY: true,
      ADDRESS3: true,
      TOWN: true,
      POSTCODE: true,
    },
    where: {
      COORDINATES: {
        equals: null,
      }
    }
  });
  console.log('schools to geocode', schools.length);
  for await (const school of schools) {
    const location = `${school.STREET},${school.LOCALITY},${school.ADDRESS3},${school.TOWN},${school.POSTCODE}`;
    const shortLocation = `${school.STREET},${school.TOWN},${school.POSTCODE}`;
    const townLocation = `${school.TOWN},${school.POSTCODE}`;

    let res = await lookup(school, location);
    if (!res) {
      res = await lookup(school, shortLocation);
      if (!res) {
        res = await lookup(school, townLocation);
      }
    }
  }
};

const lookup = async (school: any, address: string) => {
  console.log(school, lookup);
  const geo = await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=6grLGEUyd8e9LS0s1LhuQnlebHaw69CJ&location=${encodeURIComponent(address)}`);
  const result = (await (geo.json() as any)).results[0].locations[0];
  if (['ADDRESS', 'POINT', 'INTERSECTION', 'STREET', 'NEIGHBORHOOD'].includes(result.geocodeQuality)) {
    console.log(result);

    const updated = await prisma.school.update({
      where: { URN: school.URN },
      data: {
        COORDINATES: JSON.stringify(result.latLng)
      }
    })
    console.log('updated', updated);
    return true;
  }
  return false;
}

(async () => {
  const records = await processFile();
})();
