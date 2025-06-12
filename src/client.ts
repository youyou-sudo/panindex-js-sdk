import axios, { AxiosInstance } from 'axios';

export class PanIndexClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  getClient() {
    return this.client;
  }
}
