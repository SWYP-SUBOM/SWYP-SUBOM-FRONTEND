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
import { useUpdateTopic } from '../../hooks/Admin/useUpdateTopicName';
import { useDeleteTopic } from '../../hooks/Admin/useDeleteTopic';
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
  const [isDeleteMode, setIsDeleteMode] = useState(false);

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
  const updateTopicMutation = useUpdateTopic();
  const deleteTopicMutation = useDeleteTopic();

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

    updateTopicMutation.mutate(
      {
        topicId: id as number,
        updateData: {
          topicName: newQuestion.trim(),
        },
      },
      {
        onSuccess: () => {
          setEditingTopicId(null);
        },
        onError: (error) => {
          console.error('질문 수정 실패:', error);
        },
      },
    );
  };

  const handleSelectTomorrow = () => {
    if (selectedTopicId === null) return;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateString = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD 형식

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
      queryClient.invalidateQueries({ queryKey: ['adminTopics'] });

      setTimeout(() => {
        refetchTopics();
      }, 10000);

      setGenerationId(null);
      alert('토픽 생성이 완료되었습니다. 잠시 후 목록이 업데이트됩니다.');
    } else if (generationStatus?.data.status === 'COMPLETED_WITH_ERRORS') {
      queryClient.invalidateQueries({ queryKey: ['adminTopics'] });

      setTimeout(() => {
        refetchTopics();
      }, 2000);

      setGenerationId(null);
      alert(
        `토픽 생성이 완료되었지만 일부 오류가 발생했습니다: ${generationStatus.data.errorMessage || ''}`,
      );
    } else if (generationStatus?.data.status === 'FAILED') {
      setGenerationId(null);
      alert(`토픽 생성에 실패했습니다: ${generationStatus.data.errorMessage || ''}`);
    }
  }, [generationStatus, queryClient, refetchTopics]);

  const topics = topicsData?.data?.topics || [];
  const isGenerating =
    startGenerationMutation.isPending ||
    (generationId !== null && generationStatus?.data.status === 'PROCESSING');

  const handleDeleteModeToggle = () => {
    setIsDeleteMode((prev) => !prev);

    if (isDeleteMode) {
      setCheckedIds(new Set());
    }
  };

  const handleDeleteClick = (id: string | number) => {
    deleteTopicMutation.mutate(id as number, {
      onSuccess: () => {
        refetchTopics();
      },
      onError: (error) => {
        console.error('질문 삭제 실패:', error);
      },
    });
  };

  return (
    <div>
      <Header
        title={isDeleteMode ? '질문 삭제' : '써봄 워크스페이스'}
        button={isDeleteMode ? '취소' : '질문 삭제'}
        onButtonClick={handleDeleteModeToggle}
        isDeleteMode={isDeleteMode}
        onBackClick={handleDeleteModeToggle}
      />

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

        <div className="mt-6 flex flex-col gap-3 pb-24">
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
                isDeleteMode={isDeleteMode}
                onDeleteClick={handleDeleteClick}
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
