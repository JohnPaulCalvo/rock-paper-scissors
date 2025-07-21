import {createContext, type ReactNode, useContext} from 'react';
import invariant from 'tiny-invariant';
import type {UseRockPaperScissorsReturn} from './useRockPaperScissors';

const RockPaperScissorsContext =
	createContext<UseRockPaperScissorsReturn | null>(null);

export interface RockPaperScissorsProviderProps {
	value: UseRockPaperScissorsReturn;
	children: ReactNode;
}

export function RockPaperScissorsProvider(
	props: RockPaperScissorsProviderProps,
) {
	return (
		<RockPaperScissorsContext value={props.value}>
			{props.children}
		</RockPaperScissorsContext>
	);
}

export function useRockPaperScissorsContext() {
	const context = useContext(RockPaperScissorsContext);
	invariant(context);
	return context;
}
