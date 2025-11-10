import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';
import { BRAND_LOCALSTORAGE_KEY } from './constants';
import type { UseBrandReturn } from './useBrand';
import { useBrand } from './useBrand';

export const BrandContext = createContext<UseBrandReturn | null>(null);

export function useBrandContext() {
	const context = useContext(BrandContext);

	if (!context) {
		const error = new Error();
		error.name = 'BrandContextError';
		error.message = "'useBrandContext' must be used within 'BrandProvider'";
		throw error;
	}

	return context;
}

export function BrandProvider(props: PropsWithChildren) {
	const context = useBrand();

	return (
		<BrandContext.Provider value={context}>
			<style
				dangerouslySetInnerHTML={{
					__html: style,
				}}
			/>

			<script
				dangerouslySetInnerHTML={{
					__html: script,
				}}
			/>

			{props.children}
		</BrandContext.Provider>
	);
}

const style = `.transition-off *,.transition-off *::before,.transition-off *::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;transition:none!important;}`;

const script = `((
	localStorageKey,
	adminDomains,
	inplayAffiliateConsoleDomains,
	inplayPlatforms,
) => {
	const root = document.documentElement;
	const hostname = window.location.hostname;

	if (adminDomains.some((domain) => hostname.includes(domain))) {
		const theme = window.localStorage
			.getItem(localStorageKey)
			?.toLowerCase()
			.trim();

		if (theme === 'light') {
			root.dataset.theme = 'light';
			root.style.colorScheme = 'light';
			window.localStorage.setItem(localStorageKey, 'light');
			return;
		}

		root.dataset.theme = 'dark';
		root.style.colorScheme = 'dark';
		window.localStorage.setItem(localStorageKey, 'dark');
		return;
	}

	/* 
	 * Affiliate Console
	 */

	const segments = hostname.split(/\\./g);
	const platform = segments.at(0)?.toUpperCase() ?? '';

	if (
		inplayAffilicateConsoleDomains.some((domain) => hostname.includes(domain)) ||
		inplayPlatforms.includes(platform)
	) {
		root.dataset.theme = 'inplay';
		root.style.colorScheme = 'dark';
		window.localStorage.setItem(localStorageKey, 'inplay');
		return;
	}

	root.dataset.theme = 'dark';
	root.style.colorScheme = 'dark';
	window.localStorage.setItem(localStorageKey, 'dark');
})(
	'${BRAND_LOCALSTORAGE_KEY}',
	${JSON.stringify([])},
	${JSON.stringify([])},
	${JSON.stringify([])},
);`;
