export interface SubscriptionData {
    id: number;
    tier: string;
    cost: number;
    startTime: string;
    endTime: string | null;
    benefits: {
      benefit: string;
      description: string;
    }[];
    active: boolean;
  }