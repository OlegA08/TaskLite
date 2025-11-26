import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import type { Task } from '../entities/tasks';

type EditModalProps = {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, title: string, description: string) => void;
};

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${p => p.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${p => p.theme.spacing(1)};
`;

const ModalContent = styled.div`
  background: ${p => p.theme.colors.background};
  border-radius: ${p => p.theme.radius.lg};
  padding: ${p => p.theme.spacing(3)};
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  margin: ${p => p.theme.spacing(2)};
  max-height: 90vh;
  overflow-y: auto;
  
  @media (max-width: 480px) {
    padding: ${p => p.theme.spacing(2)};
    margin: ${p => p.theme.spacing(1)};
    width: 95%;
    max-height: 95vh;
  }
`;

const ModalTitle = styled.h2`
  font-family: ${p => p.theme.font.family};
  font-size: ${p => p.theme.font.size.lg};
  font-weight: ${p => p.theme.font.weight.bold};
  color: ${p => p.theme.colors.text};
  margin-bottom: ${p => p.theme.spacing(2)};
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: ${p => p.theme.font.size.md};
    margin-bottom: ${p => p.theme.spacing(1.5)};
  }
`;

const InputGroup = styled.div`
  margin-bottom: ${p => p.theme.spacing(2)};
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${p => p.theme.spacing(0.5)};
  font-family: ${p => p.theme.font.family};
  font-size: ${p => p.theme.font.size.sm};
  font-weight: ${p => p.theme.font.weight.medium};
  color: ${p => p.theme.colors.text};
`;

const TextareaWrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${p => p.theme.spacing(0.5)} ${p => p.theme.spacing(2)};
  padding-bottom: ${p => p.theme.spacing(1.5)};
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
  
  @media (max-width: 480px) {
    height: 44px;
    font-size: 16px;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: ${p => p.theme.spacing(1)} ${p => p.theme.spacing(2)};
  padding-bottom: ${p => p.theme.spacing(1.5)};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: ${p => p.theme.radius.md};
  font-size: ${p => p.theme.font.size.md};
  font-family: ${p => p.theme.font.family};
  background: ${p => p.theme.colors.surface};
  min-height: 100px;
  resize: vertical;
  line-height: 1.4;
  
  &:focus {
    outline: none;
    border-color: ${p => p.theme.colors.accent};
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    min-height: 80px;
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

const TextareaCounter = styled(Counter)<{ color: string }>`
  bottom: ${p => p.theme.spacing(1)};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${p => p.theme.spacing(1)};
  justify-content: flex-end;
  margin-top: ${p => p.theme.spacing(2)};
  
  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${p => p.theme.spacing(1)} ${p => p.theme.spacing(2)};
  border: none;
  border-radius: ${p => p.theme.radius.md};
  cursor: pointer;
  font-weight: ${p => p.theme.font.weight.medium};
  font-family: ${p => p.theme.font.family};
  font-size: ${p => p.theme.font.size.md};
  transition: background-color 0.2s;
  min-width: 100px;
  
  ${p => p.variant === 'primary' ? `
    background: ${p.theme.colors.accent};
    color: white;
    
    &:hover {
      background: ${p.theme.colors.accentHover};
    }
    
    &:disabled {
      background: ${p.theme.colors.border};
      cursor: not-allowed;
    }
  ` : `
    background: ${p.theme.colors.surface};
    color: ${p.theme.colors.text};
    border: 1px solid ${p.theme.colors.border};
    
    &:hover {
      background: ${p.theme.colors.background};
    }
  `}
  
  @media (max-width: 480px) {
    width: 100%;
    min-width: auto;
  }
`;

const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 150;

export function EditModal({ task, isOpen, onClose, onSave }: EditModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    function handler(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    }
  }, [task]);

  const handleSave = () => {
    if (task && title.trim() && title.length <= MAX_TITLE_LENGTH) {
      onSave(task.id, title.trim(), description.trim());
      onClose();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSave();
    }
  };

  const handleTitleChange = (value: string) => {
  if (value.length <= MAX_TITLE_LENGTH) {
    setTitle(value);
  } else {
    setTitle(value.slice(0, MAX_TITLE_LENGTH));
    }
  };

const handleDescriptionChange = (value: string) => {
  if (value.length <= MAX_DESCRIPTION_LENGTH) {
    setDescription(value);
  } else {
    setDescription(value.slice(0, MAX_DESCRIPTION_LENGTH));
    }
  };

  const getTitleCounterColor = (): string => {
  const length = title.length;
  if (length === 0) return '#757575';
  if (length <= 20) return '#757575';
  if (length <= 25) return '#d69e2e';
  if (length <= 28) return '#ed8936';
  return '#e53e3e';
  };

  const getDescriptionCounterColor = (): string => {
  const length = description.length;
  if (length === 0) return '#757575';
  if (length <= 100) return '#757575';
  if (length <= 120) return '#d69e2e';
  if (length <= 140) return '#ed8936';
  return '#e53e3e';
  };

  if (!task) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalTitle>Редактирование задачи</ModalTitle>
        
        <InputGroup>
          <Label htmlFor="task-title">Название</Label>
          <InputWrapper>
            <StyledInput
                id="task-title"
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Введите название задачи"
                autoFocus
            />
            <Counter color={getTitleCounterColor()}>
                {title.length}/{MAX_TITLE_LENGTH}
            </Counter>
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <Label htmlFor="task-description">Описание</Label>
            <TextareaWrapper>
              <StyledTextarea
                id="task-description"
                value={description}
                onChange={e => handleDescriptionChange(e.target.value)}
                placeholder="Введите описание задачи (необязательно)"
               />
              <TextareaCounter color={getDescriptionCounterColor()}>
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </TextareaCounter>
            </TextareaWrapper>
        </InputGroup>
        
        <ButtonGroup>
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave}
            disabled={!title.trim() || title.length > MAX_TITLE_LENGTH}
          >
            Сохранить
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
}