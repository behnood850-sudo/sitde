export interface ConfigData {
  id: string;
  name: string;
  serviceCode: string;
  remainingVolume: string;
  remainingDays: number;
  purchaseDate: string;
  expiryDate: string;
  status: 'active' | 'inactive';
  protocol: string;
  connectionLink: string;
}

export interface RenewalPlan {
  id: string;
  name: string;
  duration: string;
  price: string;
  volume: string;
}
