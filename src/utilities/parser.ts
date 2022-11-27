import { XMLParser } from 'fast-xml-parser';

const defaultResponseEntity = { hi: 'Servus!' };

const plainTextParser = (data: string): Object => {
  try {
    return { hi: data };
  } catch {
    return defaultResponseEntity;
  }
};

const xmlParser = (data: string): Object => {
  try {
    const domParser = new XMLParser();
    return domParser.parse(data);
  } catch {
    return defaultResponseEntity;
  }
};

const jsonParser = (data: string): Object => {
  try {
    return JSON.parse(data);
  } catch {
    return defaultResponseEntity;
  }
};

export { plainTextParser, xmlParser, jsonParser };
