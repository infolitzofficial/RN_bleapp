import '@react-navigation/native';

// Override the theme in react native navigation to accept our custom theme props.
type ExtendedColors = {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  white: string;
  black: string;
  text1: string;
  text2: string;
  text3: string;
  inputBorder: string;
  card2: string;
};

declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    dark: boolean;
    colors: ExtendedColors;
  };
  export function useTheme(): ExtendedTheme;
}
