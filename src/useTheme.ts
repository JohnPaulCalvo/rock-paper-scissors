import {type Dispatch, type SetStateAction, useEffect} from 'react';
import {type TernaryDarkMode, useTernaryDarkMode} from 'usehooks-ts';

export type Theme = TernaryDarkMode;

export interface UseThemeReturn {
	theme: TernaryDarkMode;
	setTheme: Dispatch<SetStateAction<TernaryDarkMode>>;
	toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
	const {
		isDarkMode,
		ternaryDarkMode,
		setTernaryDarkMode,
		toggleTernaryDarkMode,
	} = useTernaryDarkMode({
		defaultValue: 'system',
		localStorageKey: 'RockPaperScissors/Theme',
		initializeWithValue: true,
	});

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	return {
		theme: ternaryDarkMode,
		setTheme: setTernaryDarkMode,
		toggleTheme: toggleTernaryDarkMode,
	};
}
