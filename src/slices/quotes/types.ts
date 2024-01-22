export interface Quote {
  id: string;
  account: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  text: string;
  description: string | null;
  author: string | null;
  public: boolean;
  tags: string[];
}
