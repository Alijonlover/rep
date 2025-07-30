
export interface Journalist {
  id: number;
  name: string;
  imageUrl: string;
  votes: number;
}

export interface User {
  email: string;
  role: 'user' | 'admin';
}

export interface AdminCredentials {
  email: string;
  pass: string;
}

export interface GuestUserCredentials {
  email: string;
  pass: string;
}
