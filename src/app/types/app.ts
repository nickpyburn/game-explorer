export interface GameQuery {
  discoverMode: "Home" | "NewReleases" | "BestOfYear";
  genres: string[];
  parentPlatforms: number[];
  sortOrder: string;
  searchText: string;
  page: number;
}