import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from './response.dto';

interface ApiResponseOptions<T> {
  status?: 'success' | 'error';
  message?: string;
  resCode?: string;
  results?: T;
  errors?: object;
}

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  constructor(private readonly options?: ApiResponseOptions<T>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        resCode: this.options?.resCode || 'LSF_200',
        message: this.options?.message || 'Successfully Found!',
        status: this.options?.status || 'success',
        results: this.options?.results || data,
      })),
    );
  }
}
