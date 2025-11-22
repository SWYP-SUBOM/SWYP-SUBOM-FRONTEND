import { z } from 'zod';

export const NAME_MAX_LENGTH = 10;
export const NAME_PLACEHOLDER = '여기에 이름 입력하기';

export const nameSchema = z
  .string()
  .min(1, '이름을 입력해주세요.')
  .max(NAME_MAX_LENGTH, `이름은 최대 ${NAME_MAX_LENGTH}자까지 입력 가능합니다.`)
  .regex(/^[가-힣a-zA-Z\s]+$/, '숫자·특수문자는 포함할 수 없습니다.');
