import styled from '@emotion/styled';
import { useState } from 'react';
import { TasksList } from '../components/tasks-list';
import { EditModal } from '../components/edit-modal';
import type { Task } from '../entities/tasks';
import { saveToLocalStorage, loadFromLocalStorage } from '../entities/storage';

const Wrapper = styled.div`
  padding: ${p => p.theme.spacing(2)};
  max-width: 600px;
  margin: 0 auto;
  background: ${p => p.theme.colors.background};
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const Header = styled.h1`
  font-family: ${p => p.theme.font.family};
  font-size: ${p => p.theme.font.size.lg};
  font-weight: ${p => p.theme.font.weight.bold};
  color: ${p => p.theme.colors.text};
  text-align: center;
  margin-bottom: ${p => p.theme.spacing(2)};
`;

const InputContainer = styled.div`
  display: flex;
  gap: ${p => p.theme.spacing(1)};
  margin-bottom: ${p => p.theme.spacing(2)};
  position: relative;
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${p => p.theme.spacing(1)} ${p => p.theme.spacing(2)};
  padding-bottom: ${p => p.theme.spacing(2.9)};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radius.md};
  font-size: ${p => p.theme.font.size.md};
  font-family: ${p => p.theme.font.family};
  background: ${p => p.theme.colors.surface};
  height: 46px;
  line-height: 1.4;
  
  &:focus {
    outline: none;
    border-color: ${p => p.theme.colors.accent};
  }
  
  &::placeholder {
    color: ${p => p.theme.colors.textMuted};
  }
`;

const Counter = styled.span<{ color: string }>`
  position: absolute;
  right: ${p => p.theme.spacing(1)};
  bottom: ${p => p.theme.spacing(0.5)};
  font-size: ${p => p.theme.font.size.xs};
  font-family: ${p => p.theme.font.family};
  color: ${p => p.color};
  background: ${p => p.theme.colors.surface};
  padding: 1px 4px;
  border-radius: 2px;
  font-weight: ${p => p.theme.font.weight.medium};
`;

const AddButton = styled.button`
  padding: ${p => p.theme.spacing(1)} ${p => p.theme.spacing(2)};
  background: ${p => p.theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${p => p.theme.radius.md};
  cursor: pointer;
  font-weight: ${p => p.theme.font.weight.medium};
  font-family: ${p => p.theme.font.family};
  font-size: ${p => p.theme.font.size.md};
  height: 46px;
  
  &:hover {
    background: ${p => p.theme.colors.accentHover};
  }
  
  &:disabled {
    background: ${p => p.theme.colors.border};
    cursor: not-allowed;
  }
`;

// Стили для фильтров
const FiltersContainer = styled.div`
  display: flex;
  gap: ${p => p.theme.spacing(1)};
  margin-bottom: ${p => p.theme.spacing(2)};
  justify-content: center;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${p => p.theme.spacing(1)} ${p => p.theme.spacing(2)};
  background: ${p => p.active ? p.theme.colors.accent : 'transparent'};
  color: ${p => p.active ? 'white' : p.theme.colors.text};
  border: 1px solid ${p => p.active ? p.theme.colors.accent : p.theme.colors.border};
  border-radius: ${p => p.theme.radius.md};
  cursor: pointer;
  font-weight: ${p => p.theme.font.weight.medium};
  font-family: ${p => p.theme.font.family};
  font-size: ${p => p.theme.font.size.md};
  height: 46px;
  transition: all 0.2s ease;
  border-width: 1px;

  &:hover {
    background: ${p => p.active ? p.theme.colors.accentHover : p.theme.colors.surface};
    border-color: ${p => p.active ? p.theme.colors.accentHover : p.theme.colors.accent};
  }
`;

// Стили для прогресс-бара
const ProgressContainer = styled.div`
  margin-bottom: ${p => p.theme.spacing(3)};
`;

const ProgressText = styled.p`
  font-family: ${p => p.theme.font.family};
  font-size: ${p => p.theme.font.size.sm};
  color: ${p => p.theme.colors.textMuted};
  text-align: center;
  margin: ${p => p.theme.spacing(1)} 0;
  margin-top: ${p => p.theme.spacing(0.5)};
`;

const BGProgress = styled.div`
  background: rgb(229, 229, 229);
  border-radius: ${p => p.theme.radius.lg};
  height: 10px;
  overflow: hidden;
  position: relative;
`;

const FillProgress = styled.div<{ active: number }>`
  background: linear-gradient(90deg, rgb(155, 121, 207), rgb(103, 76, 140));
  width: ${p => p.active}%;
  height: 100%;
  border-radius: ${p => p.theme.radius.lg};
  transition: width 0.6s ease;
`;

// Стили для статистики
const StatsText = styled.p`
  font-family: ${p => p.theme.font.family};
  font-size: ${p => p.theme.font.size.sm};
  color: ${p => p.theme.colors.textMuted};
  margin: ${p => p.theme.spacing(1)} 0;
  line-height: 1.4;
  text-align: left;
`;

function makeTask(title: string, description: string = ''): Task {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title,
    description: description || undefined,
    created: new Date(),
    complete: false
  };
}

const MAX_TITLE_LENGTH = 30;

type FilterType = 'all' | 'active' | 'completed';

export function TasksPage() {
  const [task, setTask] = useState(''); 
  const [tasks, setTasks] = useState<Task[]>(() => loadFromLocalStorage());
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
    
  saveToLocalStorage(tasks);

  // Фильтрация задач
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.complete;
    if (filter === 'completed') return task.complete;
    return true; // 'all' - показываем все задачи
  });

  // Расчет прогресса
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.complete).length;
  const activeTasks = totalTasks - completedTasks;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  function handleRemoveItem(idTarget: string) {
    setTasks(tasks.filter(t => t.id !== idTarget));
  }

  function handleAddItem(title: string) {
    if (!title.trim() || title.length > MAX_TITLE_LENGTH) return;
    
    const newTask = makeTask(title);
    setTasks([newTask, ...tasks]);
    setTask('');
  }

  function handleEditItem(taskToEdit: Task) {
    setEditingTask(taskToEdit);
    setIsModalOpen(true);
  }

  function handleSaveItem(id: string, title: string, description: string) {
    setTasks(tasks.map(t => 
      t.id === id 
        ? { ...t, title, description: description || undefined }
        : t
    ));
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && task.length <= MAX_TITLE_LENGTH) {
      handleAddItem(task);
    }
  }

  function handleInputChange(value: string) {
    if (value.length <= MAX_TITLE_LENGTH) {
      setTask(value);
    }
  }

  // Функция для переключения статуса выполнения задачи
  function handleToggleComplete(id: string) {
    setTasks(tasks.map(t => 
      t.id === id 
        ? { ...t, complete: !t.complete }
        : t
    ));
  }

  const getCounterColor = (): string => {
    const length = task.length;
    if (length === 0) return '#757575';
    if (length <= 20) return '#757575';
    if (length <= 25) return '#d69e2e';
    if (length <= 28) return '#ed8936';
    return '#e53e3e';
  };

  const isOverLimit = task.length > MAX_TITLE_LENGTH;

  return (
    <Wrapper>
      <Header>TaskLite</Header>

      <InputContainer>
        <InputWrapper>
          <StyledInput
            value={task}
            onChange={event => handleInputChange(event.target.value)}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Введите задачу"
          />
          <Counter color={getCounterColor()}>
            {task.length}/{MAX_TITLE_LENGTH}
          </Counter>
        </InputWrapper>
        <AddButton 
          onClick={() => handleAddItem(task)}
          disabled={!task.trim() || isOverLimit}
        >
          Добавить
        </AddButton>
      </InputContainer>

      <FiltersContainer>
        <FilterButton 
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          Все
        </FilterButton>
        <FilterButton 
          active={filter === 'active'}
          onClick={() => setFilter('active')}
        >
          Активные
        </FilterButton>
        <FilterButton 
          active={filter === 'completed'}
          onClick={() => setFilter('completed')}
        >
          Выполненные
        </FilterButton>
      </FiltersContainer>

      <ProgressContainer>
        <BGProgress>
          <FillProgress active={progressPercentage} />
        </BGProgress>
        <ProgressText>
          Завершено: {progressPercentage}%
        </ProgressText>
      </ProgressContainer>
      
      <TasksList 
        tasks={filteredTasks} 
        onRemove={handleRemoveItem}
        onEdit={handleEditItem}
        onToggleComplete={handleToggleComplete}
      />

      <StatsText>
        Всего: {totalTasks} | Активных: {activeTasks} | Выполнено: {completedTasks}
      </StatsText>
      
      <EditModal
        task={editingTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveItem}
      />
    </Wrapper>
  );
}