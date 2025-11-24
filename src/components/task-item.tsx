import styled from '@emotion/styled';
import type { Task } from '../entities/tasks';
import PencilIcon from '../assets/pencil.svg';
import CrossIcon from '../assets/xmark.svg';
import ThreeDotsLine from '../assets/three-dots-line.svg'
import { useState } from 'react';

type TaskItemProps = {
  task: Task;
  onRemove: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleComplete: (id: string) => void;
};

const TaskContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${p => p.theme.spacing(1.5)} ${p => p.theme.spacing(2)};
  border-bottom: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.surface};
  transition: background-color 0.2s;
  min-height: 48px;
  gap: ${p => p.theme.spacing(1)};
  cursor: pointer;
  
  &:hover {
    background: ${p => p.theme.colors.background};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TaskContent = styled.div`
  flex: 1;
  min-width: 0;
  text-align: left;
`;

const TaskTitle = styled.h3<{ complete: boolean }>`
  margin: 0 0 ${p => p.theme.spacing(0.5)} 0;
  font-size: ${p => p.theme.font.size.md};
  font-weight: ${p => p.theme.font.weight.medium};
  color: ${p => p.complete ? p.theme.colors.textMuted : p.theme.colors.text};
  font-family: ${p => p.theme.font.family};
  line-height: 1.2;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  text-decoration: ${p => p.complete ? 'line-through' : 'none'};
`;

const TaskDescription = styled.p<{ complete: boolean; showDescription: boolean }>`
  margin: 0 0 ${p => p.theme.spacing(0.5)} 0;
  font-size: ${p => p.theme.font.size.sm};
  color: ${p => p.complete ? p.theme.colors.textMuted : p.theme.colors.textMuted};
  font-family: ${p => p.theme.font.family};
  line-height: 1.3;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  text-decoration: ${p => p.complete ? 'line-through' : 'none'};
  display: ${p => p.showDescription ? 'block' : 'none'};
`;

const TaskDate = styled.p`
  margin: 0;
  font-size: ${p => p.theme.font.size.sm};
  color: ${p => p.theme.colors.textMuted};
  font-family: ${p => p.theme.font.family};
  line-height: 1.2;
  text-align: left;
`;

const TaskActions = styled.div`
  display: flex;
  gap: ${p => p.theme.spacing(0.5)};
  align-items: flex-start;
  flex-shrink: 0;
  min-width: max-content;
`;

const ActionButton = styled.button`
  width: 18px;
  height: 18px;
  border-radius: ${p => p.theme.radius.sm};
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
  border: none;
  
  && {
    width: 18px;
    height: 18px;
  }
`;

const EditButton = styled(ActionButton)`
  color: ${p => p.theme.colors.textMuted};
  
  &:hover {
    color: ${p => p.theme.colors.accent};
  }
`;

const RemoveButton = styled(ActionButton)`
  color: ${p => p.theme.colors.error};
  
  &:hover {
    color: ${p => p.theme.colors.error};
    background: ${p => p.theme.colors.error};
    color: white;
  }
`;

const ExpandButton = styled(ActionButton)<{ showDescription: boolean }>`
  color: ${p => p.showDescription ? p.theme.colors.accent : p.theme.colors.textMuted};
  font-weight: ${p => p.theme.font.weight.bold};
  font-size: ${p => p.theme.font.size.sm};
  
  &:hover {
    color: ${p => p.theme.colors.accent};
  }
`;

const Icon = styled.img`
  width: 10px;
  height: 10px;
`;

function formatDate(date: Date): string {
  const now = new Date();
  const taskDate = new Date(date);
  
  const isToday = taskDate.toDateString() === now.toDateString();
  const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === taskDate.toDateString();
  
  if (isToday) {
    return `Сегодня, ${taskDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (isYesterday) {
    return `Вчера, ${taskDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return taskDate.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

export function TaskItem(props: TaskItemProps) {
  const { task, onRemove, onEdit, onToggleComplete } = props;
  const [showDescription, setShowDescription] = useState(false);

  const handleTaskClick = () => {
    onToggleComplete(task.id);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(task.id);
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDescription(!showDescription);
  };

  return (
    <TaskContainer onClick={handleTaskClick}>
      <TaskContent>
        <TaskTitle complete={task.complete}>{task.title}</TaskTitle>
        {task.description && (
          <TaskDescription 
            complete={task.complete} 
            showDescription={showDescription}
          >
            {task.description}
          </TaskDescription>
        )}
        <TaskDate>{formatDate(task.created)}</TaskDate>
      </TaskContent>
      <TaskActions>
        {task.description && (
          <ExpandButton 
            onClick={handleExpandClick}
            showDescription={showDescription}
            title={showDescription ? "Скрыть описание" : "Показать описание"}
          >
            <Icon src={ThreeDotsLine} alt="Описание" />
          </ExpandButton>
        )}
        <EditButton onClick={handleEditClick}>
          <Icon src={PencilIcon} alt="Редактировать" />
        </EditButton>
        <RemoveButton onClick={handleRemoveClick}>
          <Icon src={CrossIcon} alt="Удалить" />
        </RemoveButton>
      </TaskActions>
    </TaskContainer>
  );
}