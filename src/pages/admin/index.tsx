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
import { useUpdateTopicStatus } from '../../hooks/Admin/useUpdateTopicStatus';
import { CategoryTabs } from '../../constants/CategoryMap';
import type { TopicMode } from '../../api/services/adminService';
import type { CategoryNameType } from '../../constants/Category';
import { useScroll } from '../../hooks/useScroll';
import arrowdown from '../../assets/admin/arrowdown.svg';
import scrollToTop from '../../assets/admin/Scroll.svg';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedMode, setSelectedMode] = useState<TopicMode>('ALL');
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [generationId, setGenerationId] = useState<number | null>(null);
  const [uploadDateModalOpen, setUploadDateModalOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | number | null>(null);
  const [editingTopicId, setEditingTopicId] = useState<string | number | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const updateAllTopicsCache = (updater: (old: any) => any) => {
    queryClient.setQueriesData({ queryKey: ['adminTopics'] }, updater);
  };

  const categoryId = useMemo(() => {
    if (selectedCategory === '전체') return 'ALL';
    const category = CategoryTabs.find((tab) => tab.categoryName === selectedCategory);
    return category ? category.categoryId : 'ALL';
  }, [selectedCategory]);

  const {
    data: allTopicsData,
    isLoading,
    isError,
    error,
    isFetching,
    refetch: refetchTopics,
  } = useGetTopics({ mode: 'ALL' });

  const topics = useMemo(() => {
    const allTopics = allTopicsData?.data?.topics || [];
    let filtered = [...allTopics];

    if (selectedMode === 'APPROVED') {
      filtered = filtered.filter((topic) => topic.topicStatus === 'APPROVED');
    } else if (selectedMode === 'PENDING') {
      filtered = filtered.filter((topic) => topic.topicStatus === 'PENDING');
    } else if (selectedMode === 'QUESTION') {
      filtered = filtered.filter((topic) => topic.topicType === 'QUESTION');
    } else if (selectedMode === 'LOGICAL') {
      filtered = filtered.filter((topic) => topic.topicType === 'LOGICAL');
    }

    // 카테고리 필터링
    if (categoryId !== 'ALL') {
      filtered = filtered.filter((topic) => topic.categoryId === categoryId);
    }

    return filtered;
  }, [allTopicsData, selectedMode, categoryId]);

  const startGenerationMutation = useStartTopicGeneration();
  const { data: generationStatus } = useGetTopicGenerationStatus(generationId);
  const updateReservationMutation = useUpdateTopicReservation();
  const updateTopicMutation = useUpdateTopic();
  const deleteTopicMutation = useDeleteTopic();
  const updateTopicStatusMutation = useUpdateTopicStatus();

  const handleCheckChange = (id: string | number, checked: boolean) => {
    const status = checked ? 'APPROVED' : 'PENDING';

    updateTopicStatusMutation.mutate(
      {
        topicId: id as number,
        status,
      },
      {
        onSuccess: () => {
          updateAllTopicsCache((old: any) => {
            if (!old?.data?.topics) return old;
            return {
              ...old,
              data: {
                ...old.data,
                topics: old.data.topics.map((topic: any) =>
                  topic.topicId === id ? { ...topic, topicStatus: status } : topic,
                ),
              },
            };
          });
        },
        onError: (error) => {
          console.error('질문 상태 변경 실패:', error);
          alert('질문 상태 변경에 실패했습니다.');
        },
      },
    );
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

  const fixQuestionEnding = (question: string): string => {
    const endings = [
      /나요\?$/,
      /인가요\?$/,
      /일까요\?$/,
      /을까요\?$/,
      /를까요\?$/,
      /까요\?$/,
      /나요$/,
      /인가요$/,
      /일까요$/,
      /을까요$/,
      /를까요$/,
      /까요$/,
    ];

    if (question.trim().endsWith('까요?')) {
      return question;
    }

    for (const pattern of endings) {
      if (pattern.test(question.trim())) {
        return question.replace(pattern, '까요?');
      }
    }

    return question.trim() + '까요?';
  };

  const handleEditClick = (id: string | number) => {
    const topic = topics.find((t) => t.topicId === id);
    if (!topic) return;

    const fixedQuestion = fixQuestionEnding(topic.topicName);

    if (fixedQuestion === topic.topicName) {
      alert('이미 올바른 어미로 끝나는 질문입니다.');
      return;
    }

    updateTopicMutation.mutate(
      {
        topicId: id as number,
        updateData: {
          topicName: fixedQuestion,
        },
      },
      {
        onSuccess: () => {
          // 모든 adminTopics 쿼리 캐시 업데이트
          updateAllTopicsCache((old: any) => {
            if (!old?.data?.topics) return old;
            return {
              ...old,
              data: {
                ...old.data,
                topics: old.data.topics.map((topic: any) =>
                  topic.topicId === id ? { ...topic, topicName: fixedQuestion } : topic,
                ),
              },
            };
          });
        },
        onError: (error) => {
          console.error('질문 어미 수정 실패:', error);
          alert('질문 어미 수정에 실패했습니다.');
        },
      },
    );
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
          // 모든 adminTopics 쿼리 캐시 업데이트
          updateAllTopicsCache((old: any) => {
            if (!old?.data?.topics) return old;
            return {
              ...old,
              data: {
                ...old.data,
                topics: old.data.topics.map((topic: any) =>
                  topic.topicId === id ? { ...topic, topicName: newQuestion.trim() } : topic,
                ),
              },
            };
          });
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
    const tomorrowDateString = tomorrow.toISOString().split('T')[0];

    updateReservationMutation.mutate(
      {
        topicId: selectedTopicId as number,
        usedAt: tomorrowDateString,
      },
      {
        onSuccess: (_, variables) => {
          // 모든 adminTopics 쿼리 캐시 업데이트
          updateAllTopicsCache((old: any) => {
            if (!old?.data?.topics) return old;
            return {
              ...old,
              data: {
                ...old.data,
                topics: old.data.topics.map((topic: any) =>
                  topic.topicId === variables.topicId
                    ? { ...topic, usedAt: variables.usedAt || null }
                    : topic,
                ),
              },
            };
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

  const isGenerating =
    startGenerationMutation.isPending ||
    (generationId !== null && generationStatus?.data.status === 'PROCESSING');

  const handleDeleteModeToggle = () => {
    setIsDeleteMode((prev) => !prev);
  };

  const handleDeleteClick = (id: string | number) => {
    deleteTopicMutation.mutate(id as number, {
      onSuccess: () => {
        // 모든 adminTopics 쿼리 캐시에서 제거
        updateAllTopicsCache((old: any) => {
          if (!old?.data?.topics) return old;
          return {
            ...old,
            data: {
              ...old.data,
              topics: old.data.topics.filter((topic: any) => topic.topicId !== id),
              totalCount: old.data.totalCount - 1,
            },
          };
        });
      },
      onError: (error) => {
        console.error('질문 삭제 실패:', error);
      },
    });
  };

  const isScrolled = useScroll();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                isChecked={topic.topicStatus === 'APPROVED'}
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

          {isScrolled && (
            <button
              onClick={handleScrollToTop}
              className="fixed bottom-16 right-[40%] translate-x-1/2  flex items-center justify-center cursor-pointer"
            >
              <img src={scrollToTop} alt="scrollToTop" />
            </button>
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
      />
    </div>
  );
};
