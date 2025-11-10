import {useCallback, useEffect, useMemo, useState} from 'react';
import {BRAND_LOCALSTORAGE_KEY} from './constants';
import type {Brand, BrandId} from './types';

export type UseBrandReturn = [get: Brand, set: (id: BrandId) => void];

export function useBrand(): UseBrandReturn {
	const [brandId, setBrandId] = useState<BrandId>(() => {
		if (typeof window === 'undefined') return 'OPEXA_DARK';

		const theme = window.localStorage
			.getItem(BRAND_LOCALSTORAGE_KEY)
			?.toLowerCase()
			.trim();

		if (!theme) return 'OPEXA_DARK';

		return THEME_BRAND_MAP[theme] ?? 'OPEXA_DARK';
	});

	const brand = useMemo(() => BRAND_MAP[brandId], [brandId]);

	const setBrand = useCallback((id: BrandId) => {
		const cleanup = disableTransition();
		setBrandId(id);
		document.documentElement.dataset.theme = BRAND_THEME_MAP[id];
		document.documentElement.style.colorScheme = BRAND_COLORSCHEME_MAP[id];
		window.localStorage.setItem(BRAND_LOCALSTORAGE_KEY, BRAND_THEME_MAP[id]);
		window.setTimeout(cleanup, 1);
	}, []);

	useEffect(() => {
		const theme = window.localStorage
			.getItem(BRAND_LOCALSTORAGE_KEY)
			?.toLowerCase()
			.trim();

		if (!theme) return setBrandId('OPEXA_DARK');

		setBrandId(THEME_BRAND_MAP[theme] ?? 'OPEXA_DARK');
	}, []);

	useEffect(() => {
		const handler = (e: StorageEvent) => {
			if (e.key === BRAND_LOCALSTORAGE_KEY && e.newValue) {
				const id = THEME_BRAND_MAP[e.newValue];

				if (id) {
					setBrand(id);
				}
			}
		};

		window.addEventListener('storage', handler);

		return () => {
			window.removeEventListener('storage', handler);
		};
	}, [setBrand]);

	return [brand, setBrand];
}

function disableTransition() {
	const rule =
		'.transition-off *,.transition-off *::before,.transition-off *::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;transition:none!important;}';

	const node = document.createTextNode(rule);
	const style = document.createElement('style').appendChild(node);

	document.head.appendChild(style);
	document.documentElement.classList.add('transition-off');

	return () => {
		document.documentElement.classList.remove('transition-off');
		document.head.removeChild(style);
	};
}

const OPEXA_DARK_BRAND: Brand = {
	id: 'OPEXA_DARK',
	name: 'Opexa',
	logo: {
		src: '/opexa-logo-white.png',
		width: 0,
		height: 0,
	},
};

const OPEXA_LIGHT_BRAND: Brand = {
	id: 'OPEXA_LIGHT',
	name: 'Opexa',
	logo: {
		src: '/opexa-logo-black.png',
		width: 0,
		height: 0,
	},
};

const INPLAY_BRAND: Brand = {
	id: 'INPLAY',
	name: 'InPlay',
	logo: {
		src: '/inplay-logo.png',
		width: 0,
		height: 0,
	},
};

const BRAND_MAP: Record<BrandId, Brand> = {
	OPEXA_DARK: OPEXA_DARK_BRAND,
	OPEXA_LIGHT: OPEXA_LIGHT_BRAND,
	INPLAY: INPLAY_BRAND,
};

const BRAND_THEME_MAP: Record<BrandId, string> = {
	OPEXA_DARK: 'dark',
	OPEXA_LIGHT: 'light',
	INPLAY: 'inplay',
};

const THEME_BRAND_MAP: Record<string, BrandId> = {
	dark: 'OPEXA_DARK',
	light: 'OPEXA_LIGHT',
	inplay: 'INPLAY',
};

const BRAND_COLORSCHEME_MAP: Record<BrandId, 'dark' | 'light'> = {
	OPEXA_DARK: 'dark',
	OPEXA_LIGHT: 'light',
	INPLAY: 'dark',
};
