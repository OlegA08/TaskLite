import styled from "@emotion/styled";

type ButtonProps = {
  label: string;
};

const StyledButton = styled.button`
  padding: ${p => p.theme.spacing(1)} ${p => p.theme.spacing(2)};
  border: none;
  background-color: ${p => p.theme.colors.accent};
  border-radius: ${p => p.theme.radius.md};
  color: ${p => p.theme.colors.surface};
  font-family: ${p => p.theme.font.family};
  font-size: ${p => p.theme.font.size.md};
  font-weight: ${p => p.theme.font.weight.medium};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${p => p.theme.colors.accentHover};
  }
`;

export function Button(p: ButtonProps) {
  return <StyledButton>{p.label}</StyledButton>;
}