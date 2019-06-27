enum BooksSortType {
  latestChapterPublished,
  viewsCount,
  updated,
  created,
  trending,
  popular,
  popular7Days,
  popular30Days,
}

export class GetBooksDto {
  readonly userId: string;
  readonly categoryIds: string[];
  readonly completed: boolean;
  readonly beforeCursor: string;
  readonly limit: number;
  readonly bundlePriceTier: number;
  readonly sortBy: BooksSortType;
  readonly contentRatingIds: string[];
}
