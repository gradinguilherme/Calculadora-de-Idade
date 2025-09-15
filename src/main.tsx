// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app.tsx';
import AgeCalculator from './AgeCalculator.tsx';
import BirthdayCalculator from './BirthdaryCalculator.tsx';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // O layout principal com a navegação
        children: [
            {
                index: true, // Rota padrão (/)
                element: <AgeCalculator />,
            },
            {
                path: 'proximo-aniversario',
                element: <BirthdayCalculator />,
            },

        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
