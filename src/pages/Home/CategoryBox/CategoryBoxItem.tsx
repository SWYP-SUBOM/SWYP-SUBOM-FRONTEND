import culture from '../../../assets/CategoryBox/culture.svg';
import daily from '../../../assets/CategoryBox/daily.svg';
import hobby from '../../../assets/CategoryBox/hobby.svg';
import relationship from '../../../assets/CategoryBox/relationship.svg';
import values from '../../../assets/CategoryBox/values.svg';
import type { CategoryBoxItemType } from './CategoryBox.types';

export const CategoryBoxItem: Record<string, CategoryBoxItemType> = {
  일상: {
    categoryId: 1,
    title: '일상',
    titleColor: '#2C3F7C',
    size: 'small',
    icon: daily,
    column: 2,
  },
  인간관계: {
    categoryId: 2,
    title: '인간관계',
    titleColor: '#5C4C66',
    size: 'small',
    icon: relationship,
    column: 2,
  },
  '문화·트렌드': {
    categoryId: 3,
    title: '문화·트렌드',
    titleColor: '#2A3737',
    size: 'large',
    icon: culture,
    column: 1,
  },
  가치관: {
    categoryId: 4,
    title: '가치관',
    titleColor: '#6F431F',
    size: 'small',
    icon: values,
    column: 2,
  },
  '취미·취향': {
    categoryId: 5,
    title: '취미·취향',
    titleColor: '#693333',
    size: 'large',
    icon: hobby,
    column: 1,
  },
};
