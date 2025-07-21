import '@fontsource/fira-code/400.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import './globals.css';

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import invariant from 'tiny-invariant';
import {App} from './App';

const root = document.getElementById('root');

invariant(root);

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
