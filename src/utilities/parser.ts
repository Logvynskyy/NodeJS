import { XMLParser } from 'fast-xml-parser';

const plainTextParser = (data: string, fallback: Object): Object => {
  try {
    return { name: data };
  } catch {
    return fallback;
  }
};

const xmlParser = (data: string, fallback: Object): Object => {
  try {
    const domParser = new XMLParser();
    return domParser.parse(data);
  } catch {
    return fallback;
  }
};

const jsonParser = (data: string, fallback: Object): Object => {
  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
};

export { plainTextParser, xmlParser, jsonParser };
