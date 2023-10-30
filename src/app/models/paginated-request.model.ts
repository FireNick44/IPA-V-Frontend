export class PaginatedRequest {
  minId?: number | null;
  maxId?: number | null;
  requestedResults: number;

  constructor(requestedResults: number, minId?: number | null, maxId?: number | null) {
    this.minId = minId;
    this.maxId = maxId;
    this.requestedResults = requestedResults;
  }
}
