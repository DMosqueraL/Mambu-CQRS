import { Injectable, Body, NotFoundException } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { HttpAdapter } from '../interfaces/http-adapter';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private http: AxiosInstance = axios;

  async get<T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> {
    try {
      const response = await this.http.get<T>(url, config);
      const { data } = response;
      return data;
    } catch (error) {
      throw new Error(`This is an error - Check logs.`);
    }
  }

  async post<T>(
    url: string,
    dto?: any,
    config?: AxiosRequestConfig<any>,
  ): Promise<T> {
    try {
      const { data } = await this.http.post<T>(url, dto, config);
      return data;
    } catch (error) {
      //console.log("Este es el error: ", error);
      throw new NotFoundException(
        `Entró aquí!!! ---> This is an error - Check logs.`,
      );
    }
  }
  
  async getById<T>(
    url: string,
    config?: AxiosRequestConfig<any>,
  ): Promise<T> {
    try {
      const { data } = await this.http.get<T>(url, config);
      return data;
    } catch (error) {
      return null;
    }
  }
}
