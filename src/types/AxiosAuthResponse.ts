export interface AxiosAuthResponse {
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'ADMIN' | 'DWELLER';
      isActive: boolean;
      residence: string[];
    };
  };
}
