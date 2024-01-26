type createResponse = {
  results?: object;
  message: string;
  resCode: string;
  status?: string;
  lang?: string;
};

type updateResponse = {
  results?: object;
  message: string;
  resCode: string;
  status?: string;
  lang?: string;
};

type listResponse = {
  results: any[];
  message: string;
  resCode: string;
  status?: string;
  lang?: string;
};

export const CreatedResponse = (params: createResponse): createResponse => {
  return {
    results: params.results,
    message: params.message,
    resCode: params.resCode,
    lang: params.lang,
  };
};

export const UpdatedResponse = (params: updateResponse): updateResponse => {
  return {
    results: params.results,
    message: params.message,
    resCode: params.resCode,
    lang: params.lang,
  };
};

export const ListFoundResponse = (params: listResponse): listResponse => {
  return {
    results: params.results,
    message: params.message,
    resCode: params.resCode,
    lang: params.lang,
  };
};

export const DetailsFoundResponse = (
  params: createResponse,
): createResponse => {
  return {
    results: params.results,
    message: params.message,
    resCode: params.resCode,
    lang: params.lang,
  };
};
