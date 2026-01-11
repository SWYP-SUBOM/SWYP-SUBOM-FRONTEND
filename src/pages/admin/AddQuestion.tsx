import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryTabs } from '../../constants/CategoryMap';
import type { CategoryNameType } from '../../constants/Category';
import { useCreateTopic } from '../../hooks/Admin/useCreateTopic';
import left from '../../assets/Header/left.svg';

type QuestionType = 'QUESTION' | 'LOGICAL';

export const AddQuestion = () => {
  const navigate = useNavigate();
  const createTopicMutation = useCreateTopic();
  const [selectedCategory, setSelectedCategory] = useState<CategoryNameType | null>('일상');
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType | null>(null);
  const [question, setQuestion] = useState('');

  const categories: CategoryNameType[] = ['일상', '인간관계', '문화·트렌드', '가치관', '시대·사회'];
  const questionTypes: { label: string; value: QuestionType }[] = [
    { label: '논리형 질문', value: 'LOGICAL' },
    { label: '구조형 질문', value: 'QUESTION' },
  ];

  const selectedCategoryCount = selectedCategory ? 1 : 0;
  const selectedTypeCount = selectedQuestionType ? 1 : 0;

  const handleSubmit = () => {
    if (!selectedCategory || !selectedQuestionType || !question.trim()) {
      alert('카테고리, 질문 유형, 질문을 모두 입력해주세요.');
      return;
    }

    const categoryId = CategoryTabs.find(
      (tab) => tab.categoryName === selectedCategory,
    )?.categoryId;
    if (!categoryId) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    console.log('질문 추가 요청:', {
      categoryId,
      categoryName: selectedCategory,
      topicName: question.trim(),
      topicType: selectedQuestionType,
    });

    createTopicMutation.mutate(
      {
        categoryId,
        topicData: {
          topicName: question.trim(),
          topicType: selectedQuestionType,
        },
      },
      {
        onSuccess: () => {
          navigate('/admin/add-question/success');
        },
        onError: (error: any) => {
          console.error('질문 추가 실패:', error);

          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            '생성된 질문과 중복된 질문이 있어요';

          navigate('/admin/add-question/failure', {
            state: { errorMessage },
          });
        },
      },
    );
  };

  const isFormValid =
    selectedCategory && selectedQuestionType && question.trim() && !createTopicMutation.isPending;

  return (
    <div className="min-h-screen ">
      {/* 헤더 */}
      <div className="bg-white flex items-center justify-between px-4 py-4 border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <img src={left} className="w-9 h-9" alt="뒤로가기" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 B02_B text-gray-900">질문 추가하기</div>
        <div className="w-9" />
      </div>

      <div className="px-4 py-6">
        {/* 안내 문구 */}
        <div className="B02_M text-gray-900 mb-6">질문의 카테고리와 유형을 선택해주세요</div>

        {/* 카테고리 선택 */}
        <div className="mb-8">
          <div className="B02_M text-gray-900 mb-4">
            카테고리 <span className="text-b6">({selectedCategoryCount}개)</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`B02_M px-4 py-[6px] rounded-lg border transition-colors ${
                    isSelected ? 'B02_B text-white bg-b7' : 'bg-white text-gray-800 border-gray-400'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <div className="B02_M text-gray-900 mb-4">
            질문 유형 <span className="text-b6">({selectedTypeCount}개)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {questionTypes.map((type) => {
              const isSelected = selectedQuestionType === type.value;
              return (
                <button
                  key={type.value}
                  onClick={() => setSelectedQuestionType(type.value)}
                  className={`B02_M px-4 py-[6px] rounded-lg border transition-colors ${
                    isSelected ? 'B02_B text-white bg-b7' : 'bg-white text-gray-800 border-gray-400'
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 질문 입력 */}
        <div className="mb-30">
          <div className="B01_M text-gray-900 mb-4">추가할 질문을 입력해주세요</div>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="여기에 입력하기"
            className="w-full h-50 px-4 py-3 rounded-lg border border-gray-400 B03_M text-gray-900 placeholder:text-gray-700 focus:outline-none "
          />
        </div>

        <div className="pb-4">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full h-14 rounded-lg B02_B transition-colors ${
              isFormValid
                ? 'bg-b7 text-white cursor-pointer'
                : 'bg-gray-600 text-white cursor-not-allowed'
            }`}
          >
            {createTopicMutation.isPending ? '추가 중...' : '질문 추가하기'}
          </button>
        </div>
      </div>
    </div>
  );
};
