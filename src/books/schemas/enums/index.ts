import { registerEnumType } from 'type-graphql';

export enum BooksSortType {
  LatestChapterPublished = 'latestChapterPublished',
  ViewsCount = 'viewsCount',
}

registerEnumType(BooksSortType, {
  name: 'BooksSortType',
});
