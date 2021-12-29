import { parse } from 'csv-parse';
import fs from 'fs';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const processFile = async () => {
  const records = [];
  const parser = fs
    .createReadStream(`./prisma/england_school_information.csv`)
    .pipe(parse({
      skipRecordsWithError: true,
      from_line: 2,
      // CSV options if any
    }));
  for await (const record of parser) {
    // Work with each record
    await prisma.school.create({
      data: {
        URN: record[0],
        LANAME: record[1],
        LA: parseInt(record[2]),
        ESTAB: parseInt(record[3]),
        LAESTAB: parseInt(record[4]),
        SCHNAME: record[5],
        STREET: record[6],
        LOCALITY: record[7],
        ADDRESS3: record[8],
        TOWN: record[9],
        POSTCODE: record[10],
        SCHSTATUS: record[11],
        OPENDATE: new Date(record[12]) ?? null,
        CLOSEDATE: new Date(record[13]) ?? null,
        MINORGROUP: record[14],
        SCHOOLTYPE: record[15],
        ISPRIMARY: parseInt(record[16]),
        ISSECONDARY: parseInt(record[17]),
        ISPOST16: parseInt(record[18]),
        AGELOW: parseInt(record[19]),
        AGEHIGH: parseInt(record[20]),
        GENDER: record[21],
        RELCHAR: record[22],
        ADMPOL: record[23],
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
