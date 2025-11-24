import styled from '@emotion/styled';
import type { Task } from '../entities/tasks';
import { TaskItem } from './task-item';

type TasksListProps = {
  tasks: Task[];
  onRemove: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleComplete: (id: string) => void;
};

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radius.lg};
  overflow: hidden;
  background: ${p => p.theme.colors.surface};
  width: 100%;
`;

const EmptyState = styled.li`
  padding: ${p => p.theme.spacing(6)};
  text-align: center;
  color: ${p => p.theme.colors.textMuted};
  font-style: italic;
  font-family: ${p => p.theme.font.family};
  font-size: ${p => p.theme.font.size.md};
`;

export function TasksList(props: TasksListProps) {
  const { tasks, onRemove, onEdit, onToggleComplete } = props;

  if (tasks.length === 0) {
    return (
      <ListContainer>
        <EmptyState>Список пуст</EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {tasks.map(task => (
        <TaskItem 
          task={task} 
          key={task.id} 
          onRemove={onRemove}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ListContainer>
  );
}