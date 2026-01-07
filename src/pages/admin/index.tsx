import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Header } from '../../components/admin/common/Header';
import { Category } from '../../components/admin/Category';
import { QuestionCard } from '../../components/admin/QuestionCard';
import { CategorySelectBottomSheet } from '../../components/admin/CategorySelectBottomSheet';
import { AdminBottomActions } from '../../components/admin/common/AdminBottomActions';
import { QuestionUploadDateModal } from '../../components/admin/QuestionUploadDateModal';
import { useGetTopics } from '../../hooks/Admin/useGetTopics';
import { useStartTopicGeneration } from '../../hooks/Admin/useStartTopicGeneration';
import { useGetTopicGenerationStatus } from '../../hooks/Admin/useGetTopicGenerationStatus';
import { useUpdateTopicReservation } from '../../hooks/Admin/useUpdateTopicReservation';
import { useUpdateTopicName } from '../../hooks/Admin/useUpdateTopicName';
import { getTopics } from '../../api/services/adminService';
import { CategoryTabs } from '../../constants/CategoryMap';
import type { TopicMode } from '../../api/services/adminService';
import type { CategoryNameType } from '../../constants/Category';

import arrowdown from '../../assets/admin/arrowdown.svg';

const month = new Date().getMonth() + 1;
const day = new Date().getDate();
const week = ['일', '월', '화', '수', '목', '금', '토'][new Date().getDay()];

const formatDate = (dateString: string | null): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [checkedIds, setCheckedIds] = useState<Set<string | number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedMode, setSelectedMode] = useState<TopicMode>('ALL');
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [generationId, setGenerationId] = useState<number | null>(null);
  const [uploadDateModalOpen, setUploadDateModalOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | number | null>(null);
  const [editingTopicId, setEditingTopicId] = useState<string | number | null>(null);

  // 카테고리 ID 변환
  const categoryId = useMemo(() => {
    if (selectedCategory === '전체') return 'ALL';
    const category = CategoryTabs.find((tab) => tab.categoryName === selectedCategory);
    return category ? category.categoryId : 'ALL';
  }, [selectedCategory]);

  // 쿼리 파라미터 메모이제이션
  const queryParams = useMemo(
    () => ({
      mode: selectedMode,
      categoryId: categoryId === 'ALL' ? undefined : (categoryId as number),
    }),
    [selectedMode, categoryId],
  );

  const {
    data: topicsData,
    isLoading,
    isError,
    error,
    isFetching,
    refetch: refetchTopics,
  } = useGetTopics(queryParams);
  const startGenerationMutation = useStartTopicGeneration();
  const { data: generationStatus } = useGetTopicGenerationStatus(generationId);
  const updateReservationMutation = useUpdateTopicReservation();
  const updateTopicNameMutation = useUpdateTopicName();

  const handleCheckChange = (id: string | number, checked: boolean) => {
    if (checked) {
      const topic = topics.find((t) => t.topicId === id);

      if (topic && !topic.usedAt) {
        setSelectedTopicId(id);
        setUploadDateModalOpen(true);
        return;
      }
    }

    setCheckedIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleModeSelect = (mode: TopicMode) => {
    setSelectedMode(mode);
  };

  const handleCalendarClick = (id: string | number) => {
    setSelectedTopicId(id);
    setUploadDateModalOpen(true);
  };

  const handleEditClick = (id: string | number) => {
    setEditingTopicId(id);
  };

  const handleSaveEdit = (id: string | number, newQuestion: string) => {
    if (!newQuestion.trim()) {
      alert('질문을 입력해주세요.');
      return;
    }

    updateTopicNameMutation.mutate(
      {
        topicId: id as number,
        topicName: newQuestion.trim(),
      },
      {
        onSuccess: () => {
          setEditingTopicId(null);
          alert('질문이 수정되었습니다.');
        },
        onError: (error) => {
          console.error('질문 수정 실패:', error);
          alert('질문 수정에 실패했습니다.');
        },
      },
    );
  };

  // 내일 업로드하기 선택
  const handleSelectTomorrow = () => {
    if (selectedTopicId === null) return;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateString = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD 형식

    console.log('내일 업로드하기 선택:', { topicId: selectedTopicId, date: tomorrowDateString });

    updateReservationMutation.mutate(
      {
        topicId: selectedTopicId as number,
        usedAt: tomorrowDateString,
      },
      {
        onSuccess: () => {
          setCheckedIds((prev) => {
            const newSet = new Set(prev);
            newSet.add(selectedTopicId);
            return newSet;
          });
        },
        onError: (error) => {
          console.error('예약 업데이트 실패:', error);
        },
      },
    );
  };

  const handleSelectRandom = () => {
    if (selectedTopicId === null) return;

    const today = new Date();
    const randomDays = Math.floor(Math.random() * 30) + 1;
    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() + randomDays);
    const randomDateString = randomDate.toISOString().split('T')[0];

    console.log('랜덤 업로드하기 선택:', { topicId: selectedTopicId, date: randomDateString });

    updateReservationMutation.mutate(
      {
        topicId: selectedTopicId as number,
        usedAt: randomDateString,
      },
      {
        onSuccess: () => {
          setCheckedIds((prev) => {
            const newSet = new Set(prev);
            newSet.add(selectedTopicId);
            return newSet;
          });
        },
        onError: (error) => {
          console.error('예약 업데이트 실패:', error);
        },
      },
    );
  };

  const handleCreateQuestion = () => {
    startGenerationMutation.mutate(undefined, {
      onSuccess: (data) => {
        setGenerationId(data.data.generationId);
      },
      onError: (error) => {
        console.error('토픽 생성 시작 실패:', error);
      },
    });
  };

  useEffect(() => {
    if (generationStatus?.data.status === 'COMPLETED') {
      console.log('토픽 생성 완료 - 상태:', generationStatus.data);

      queryClient.invalidateQueries({ queryKey: ['adminTopics'] });

      setTimeout(() => {
        console.log('토픽 생성 완료 후 refetch 시작');
        refetchTopics().then((result) => {
          console.log('refetch 결과:', result);
          console.log('refetch 후 topics 개수:', result.data?.data?.topics?.length || 0);
          if (result.data?.data?.topics?.length === 0) {
            console.warn(
              '⚠️ 토픽 생성 완료 후에도 데이터가 없습니다. 서버에서 실제로 저장되었는지 확인이 필요합니다.',
            );
            console.warn('🔍 문제 진단:');
            console.warn('1. 서버 로그에서 토픽이 실제로 DB에 저장되었는지 확인');
            console.warn('2. 생성된 토픽의 status가 현재 필터와 일치하는지 확인');
            console.warn('3. 생성된 토픽의 categoryId가 현재 필터와 일치하는지 확인');
          }
        });
      }, 10000);

      setGenerationId(null);

      console.log('토픽 생성 완료 - 현재 필터:', {
        mode: selectedMode,
        categoryId: categoryId === 'ALL' ? 'ALL' : categoryId,
        queryParams,
      });

      alert('토픽 생성이 완료되었습니다. 잠시 후 목록이 업데이트됩니다.');
    } else if (generationStatus?.data.status === 'COMPLETED_WITH_ERRORS') {
      console.log('토픽 생성 완료 (일부 오류) - 상태:', generationStatus.data);

      queryClient.invalidateQueries({ queryKey: ['adminTopics'] });

      setTimeout(() => {
        refetchTopics();
      }, 2000);

      setGenerationId(null);
      alert(
        `토픽 생성이 완료되었지만 일부 오류가 발생했습니다: ${generationStatus.data.errorMessage || ''}`,
      );
    } else if (generationStatus?.data.status === 'FAILED') {
      console.log('토픽 생성 실패 - 상태:', generationStatus.data);
      setGenerationId(null);
      alert(`토픽 생성에 실패했습니다: ${generationStatus.data.errorMessage || ''}`);
    }
  }, [generationStatus, queryClient, refetchTopics, selectedMode, categoryId, queryParams]);

  const topics = topicsData?.data?.topics || [];
  const isGenerating =
    startGenerationMutation.isPending ||
    (generationId !== null && generationStatus?.data.status === 'PROCESSING');

  useEffect(() => {
    const testFilters = async () => {
      console.log('🧪 필터 테스트 시작...');

      try {
        const pendingResult = await getTopics({ mode: 'PENDING' });
        console.log('✅ mode=PENDING 결과:', {
          totalCount: pendingResult.data?.totalCount,
          topicsCount: pendingResult.data?.topics?.length,
          topics: pendingResult.data?.topics,
        });
      } catch (error) {
        console.error('❌ mode=PENDING 실패:', error);
      }

      try {
        const category1Result = await getTopics({ mode: 'ALL', categoryId: 1 });
        console.log('✅ mode=ALL&categoryId=1 결과:', {
          totalCount: category1Result.data?.totalCount,
          topicsCount: category1Result.data?.topics?.length,
          topics: category1Result.data?.topics,
        });
      } catch (error) {
        console.error('❌ mode=ALL&categoryId=1 실패:', error);
      }

      // 테스트 3: mode=APPROVED
      try {
        const approvedResult = await getTopics({ mode: 'APPROVED' });
        console.log('✅ mode=APPROVED 결과:', {
          totalCount: approvedResult.data?.totalCount,
          topicsCount: approvedResult.data?.topics?.length,
          topics: approvedResult.data?.topics,
        });
      } catch (error) {
        console.error('❌ mode=APPROVED 실패:', error);
      }

      // 테스트 4: mode=ALL (현재 필터)
      try {
        const allResult = await getTopics({ mode: 'ALL' });
        console.log('✅ mode=ALL 결과:', {
          totalCount: allResult.data?.totalCount,
          topicsCount: allResult.data?.topics?.length,
          topics: allResult.data?.topics,
        });
      } catch (error) {
        console.error('❌ mode=ALL 실패:', error);
      }

      console.log('🧪 필터 테스트 완료');
    };

    // 컴포넌트 마운트 시 한 번만 실행
    testFilters();
  }, []); // 빈 배열로 마운트 시 한 번만 실행

  // 디버깅: API 응답 확인
  useEffect(() => {
    if (topicsData) {
      console.log('Topics API 응답:', {
        totalCount: topicsData.data?.totalCount,
        topicsCount: topicsData.data?.topics?.length,
        topics: topicsData.data?.topics,
        currentFilter: {
          mode: selectedMode,
          categoryId: categoryId === 'ALL' ? 'ALL' : categoryId,
        },
      });
    }
  }, [topicsData, selectedMode, categoryId]);

  return (
    <div>
      <Header title="써봄 워크스페이스" button="질문 삭제" />

      <div className="w-full flex flex-col px-4 pt-10 ">
        <div className="B01_M text-gray-900">
          {month}월 {day}일 ({week})
        </div>

        <Category onModeSelect={handleModeSelect} selectedMode={selectedMode} />

        {/* 카테고리 선택 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsCategorySheetOpen(true)}
            className="w-[110px] mt-4  flex items-center  px-[10px] gap-2 justify-center border border-gray-500 rounded-lg  py-2 cursor-pointer"
          >
            <span className="B02_M text-gray-800">카테고리</span>
            <img src={arrowdown} alt="arrowdown" />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {isLoading || isFetching ? (
            <div className="text-center py-4 text-gray-400">불러오는 중...</div>
          ) : isError ? (
            <div className="text-center py-4 text-red-500">
              에러가 발생했습니다: {error instanceof Error ? error.message : '알 수 없는 에러'}
            </div>
          ) : topics.length === 0 ? (
            <div className="text-center py-4 text-gray-400">질문이 없습니다.</div>
          ) : (
            topics.map((topic) => (
              <QuestionCard
                key={topic.topicId}
                id={topic.topicId}
                category={topic.categoryName as CategoryNameType}
                question={topic.topicName}
                date={formatDate(topic.usedAt)}
                isChecked={checkedIds.has(topic.topicId)}
                onCheckChange={handleCheckChange}
                onCalendarClick={handleCalendarClick}
                onEditClick={handleEditClick}
                onSaveEdit={handleSaveEdit}
                isEditing={editingTopicId === topic.topicId}
              />
            ))
          )}
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <AdminBottomActions
        onCreateQuestion={handleCreateQuestion}
        isGenerating={isGenerating}
        onChatClick={() => {
          navigate('/admin/add-question');
        }}
      />

      {/* 카테고리 선택 바텀시트 */}
      {isCategorySheetOpen && (
        <CategorySelectBottomSheet
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
          onClose={() => setIsCategorySheetOpen(false)}
        />
      )}

      {/* 질문 업로드일 선택 모달 */}
      <QuestionUploadDateModal
        isOpen={uploadDateModalOpen}
        onClose={() => {
          setUploadDateModalOpen(false);
          setSelectedTopicId(null);
        }}
        onSelectTomorrow={handleSelectTomorrow}
        onSelectRandom={handleSelectRandom}
      />
    </div>
  );
};
