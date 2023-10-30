export interface Transaction {
  id: number;
  timestamp: Date;
  amount: number;
  senderServerLocation: string;
  receiverServerLocation: string;
  memoryUsage: number;
  processingTime: number;
  senderAccountNumber: string;
  receiverAccountNumber: string;
}
