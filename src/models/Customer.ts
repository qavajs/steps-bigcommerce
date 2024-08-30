export interface Customer {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  authentication: {
    new_password: string;
    force_password_reset: boolean;
  };
}
