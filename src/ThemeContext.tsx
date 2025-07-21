import {createContext, type ReactNode, useContext} from 'react';
import invariant from 'tiny-invariant';
import type {UseThemeReturn} from './useTheme';

const ThemeContext = createContext<UseThemeReturn | null>(null);

export interface ThemeProviderProps {
	value: UseThemeReturn;
	children: ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
	return <ThemeContext value={props.value}>{props.children}</ThemeContext>;
}

export function useThemeContext() {
	const context = useContext(ThemeContext);
	invariant(context);
	return context;
}
