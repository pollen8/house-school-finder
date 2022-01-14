import { parse } from 'csv-parse';
import fs from 'fs';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const processFile = async () => {
  const records = [];
  const parser = fs
    .createReadStream(`./prisma/csv/la_and_region_codes_meta.csv`)
    .pipe(parse({
      skipRecordsWithError: true,
      from_line: 2,
      // CSV options if any
    }));
  for await (const record of parser) {
    // Work with each record
    await prisma.localAuthorities.create({
      data: {
        LEA: parseInt(record[0]),
        LANAME: record[1],
        REGION: parseInt(record[2]),
        REGIONNAME: record[3]
      },
    })
    records.push(record);
  }
  return records;
};

(async () => {
  const records = await processFile();
  console.info(records);
})();
