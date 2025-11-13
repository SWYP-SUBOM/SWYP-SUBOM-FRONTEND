export type CategoryBoxItemType = {
  categoryId: number;
  title: string;
  titleColor: string;
  icon: string;
  size: 'large' | 'small';
  column: number;
};

export type QuestiondataType = {
  categoryName: string;
  topicName: string;
};

export type CategoryBoxPropsType = Omit<CategoryBoxItemType, 'column'>;
