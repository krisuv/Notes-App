import { MAX_CONNECTION_TIMEOUT_MS } from '@consts/api.consts';
import { HttpMethod, StatusCode } from '@frontend-types/api.types';

type MockApiCallResponse<T> = {
  data: T | null;
  statusCode: StatusCode;
};

export async function mockFetch<T>(
  _endpoint: string,
  method: HttpMethod = 'GET',
  returnData?: T
): Promise<MockApiCallResponse<T>> {
  return await new Promise(resolve => {
    setTimeout(() => {
      const statusCode = method === 'POST' ? 201 : 200;
      resolve({
        data: returnData || null,
        statusCode
      });
    }, MAX_CONNECTION_TIMEOUT_MS * Math.random());
  });
}
