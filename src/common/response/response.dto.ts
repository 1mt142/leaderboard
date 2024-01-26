export class ApiResponse<T> {
  resCode?: string = 'SF_200';
  message?: string = 'Success';
  status: 'success' | 'error' = 'success';
  results: T;
}
