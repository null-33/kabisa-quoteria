export type Quote = {
  id: number;
  author: string;
  quote: string;
  permalink: string;
};

export type QuoteWithStats = {
  quote: Quote;
  stats: QuoteStats;
};

export type Like = {
  user: string;
  timestamp: number;
};

export type QuoteStats = {
  likes: Like[];
};

export type Nullable<T> = T | null;
