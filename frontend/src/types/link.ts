export interface linkRequest {
  url: string;
}

export interface LinkResponse {
  links: Link[];
  stats: LinkStats;
}

export interface Link {
  id: number;
  shortCode: string;
  shortLink: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
}

export interface LinkStats {
  totalLinks: number;
  totalClicks: number;
}
