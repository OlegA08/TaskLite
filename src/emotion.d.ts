import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      background: string;
      surface: string;
      text: string;
      textMuted: string;
      border: string;
      accent: string;
      accentHover: string;
      error: string;
      success: string;
      warning: string;
    };
    spacing: (value: number) => string;
    radius: {
      sm: string;
      md: string;
      lg: string;
    };
    font: {
      family: string;
      size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
      };
      weight: {
        regular: number;
        medium: number;
        bold: number;
      };
    };
  }
}