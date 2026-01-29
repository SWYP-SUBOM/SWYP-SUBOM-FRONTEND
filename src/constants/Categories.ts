import culture from '../assets/CategoryBox/culture.png';
import daily from '../assets/CategoryBox/daily.png';
import hobby from '../assets/CategoryBox/hobby.png';
import relationship from '../assets/CategoryBox/relationship.png';
import value from '../assets/CategoryBox/value.png';
import blue from '../assets/Home/blue.png';
import green from '../assets/Home/green.png';
import pink from '../assets/Home/pink.png';
import purple from '../assets/Home/purple.png';
import yellow from '../assets/Home/yellow.png';

export interface Category {
  categoryId: number;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon: string;
  illustration: string;
}

export const CATEGORIES: readonly Category[] = [
  {
    categoryId: 1,
    name: '일상',
    color: '#2C3F7C',
    bgColor: 'bg-[#E6EFFF]',
    textColor: 'text-[#2C3F7C]',
    icon: daily,
    illustration: blue,
  },
  {
    categoryId: 2,
    name: '인간관계',
    color: '#5C4C66',
    bgColor: 'bg-[#F2E6FF]',
    textColor: 'text-[#5C4C66]',
    icon: relationship,
    illustration: purple,
  },
  {
    categoryId: 3,
    name: '문화·트렌드',
    color: '#2A3737',
    bgColor: 'bg-[#DDFFF3]',
    textColor: 'text-[#2A3737]',
    icon: culture,
    illustration: green,
  },
  {
    categoryId: 4,
    name: '가치관',
    color: '#6F431F',
    bgColor: 'bg-[#FFF3DA]',
    textColor: 'text-[#6F431F]',
    icon: value,
    illustration: yellow,
  },
  {
    categoryId: 5,
    name: '시대·사회',
    color: '#693333',
    bgColor: 'bg-[#FFE9E9]',
    textColor: 'text-[#693333]',
    icon: hobby,
    illustration: pink,
  },
] as const;

export const CATEGORY_COLOR_MAP = Object.fromEntries(
  CATEGORIES.map((category) => [category.name, category.bgColor]),
) as Record<string, string>;

export const CATEGORY_TABS = CATEGORIES.map((category) => ({
  categoryName: category.name,
  categoryId: category.categoryId,
}));
