export class FetcherException<T> extends Error {
  data: T;
  status: number;

  constructor(status: number, data: T) {
    super('error while handling fetch');
    this.name = 'FetcherException';
    this.status = status;
    this.data = data;
  }

  isFetcherException() {
    return true;
  }
}

export interface FetcherResponse<T> extends Response {
  data: T;
}

export const fetcher = <T, FetchError = Error>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) =>
  fetch(input, init).then(async (res) => {
    const data = await res.json();

    if (res.ok) return { ...res, data: data as T } as FetcherResponse<T>;

    throw new FetcherException(res.status, data as FetchError);
  });
