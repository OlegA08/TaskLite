import { Global, css } from '@emotion/react';

export const GlobalStyles = () => (
    <Global
        styles={css`
            /* Reset and base styles */
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            
            html {
                line-height: 1.15;
                -webkit-text-size-adjust: 100%;
                -webkit-tap-highlight-color: transparent;
                font-size: 100%;
            }
            
            body {
                margin: 0;
                font-family: 'Inter', system-ui, sans-serif;
                font-size: 16px;
                color: rgb(26, 26, 26);
                min-height: 100vh;
                position: relative;
                overflow-x: hidden;
                width: 100%;
                max-width: 100vw;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                line-height: 1.5;
            }
            
            #root {
                width: 100%;
                min-height: 100vh;
                font-size: 1rem;
            }

            h1 {
                font-size: 2.5rem;
                margin: 0.67em 0;
            }
            
            h2 {
                font-size: 2rem;
            }
            
            h3 {
                font-size: 1.5rem;
            }

            input, button, textarea {
                font-size: 1rem;
            }

            * {
                transform: none !important;
            }

            @media (max-width: 320px) {
                body {
                    font-size: 14px;
                }
            }

            main {
                display: block;
            }
            
            hr {
                box-sizing: content-box;
                height: 0;
                overflow: visible;
            }
            
            pre {
                font-family: monospace, monospace;
                font-size: 1em;
            }
            
            a {
                background-color: transparent;
                text-decoration: none;
                font-size: inherit;
                color: inherit;
            }
            
            b,
            strong {
                font-weight: bolder;
            }
            
            code,
            kbd,
            samp {
                font-family: monospace, monospace;
                font-size: 1em;
            }
            
            small {
                font-size: 80%;
            }
            
            sub,
            sup {
                font-size: 75%;
                line-height: 0;
                position: relative;
                vertical-align: baseline;
            }
            
            sub {
                bottom: -0.25em;
            }
            
            sup {
                top: -0.5em;
            }
            
            img {
                border-style: none;
            }
            
            button,
            input,
            optgroup,
            select,
            textarea {
                font-family: inherit;
                line-height: 1.15;
                margin: 0;
            }
            
            button,
            input {
                overflow: visible;
            }
            
            button,
            select {
                text-transform: none;
            }
            
            button,
            [type="button"],
            [type="reset"],
            [type="submit"] {
                -webkit-appearance: button;
            }
            
            button::-moz-focus-inner,
            [type="button"]::-moz-focus-inner,
            [type="reset"]::-moz-focus-inner,
            [type="submit"]::-moz-focus-inner {
                border-style: none;
                padding: 0;
            }
            
            progress {
                vertical-align: baseline;
            }
            
            textarea {
                overflow: auto;
            }
            
            [type="checkbox"],
            [type="radio"] {
                box-sizing: border-box;
                padding: 0;
            }
            
            [type="number"]::-webkit-inner-spin-button,
            [type="number"]::-webkit-outer-spin-button {
                height: auto;
            }
            
            [type="search"] {
                -webkit-appearance: textfield;
                outline-offset: -2px;
            }
            
            [type="search"]::-webkit-search-decoration {
                -webkit-appearance: none;
            }
            
            ::-webkit-file-upload-button {
                -webkit-appearance: button;
                font: inherit;
            }
            
            details {
                display: block;
            }
            
            summary {
                display: list-item;
            }
            
            template {
                display: none;
            }
            
            [hidden] {
                display: none;
            }

            body::before {
                content: '';
                position: fixed;
                inset: 0;
                z-index: -1;
                background: radial-gradient(
                        circle at 20% 30%,
                        rgba(123, 94, 167, 0.25),
                        transparent 60%
                    ),
                    radial-gradient(
                        circle at 80% 20%,
                        rgba(255, 200, 150, 0.25),
                        transparent 60%
                    ),
                    radial-gradient(
                        circle at 50% 80%,
                        rgba(150, 220, 200, 0.25),
                        transparent 60%
                    );
                filter: blur(90px);
            }
            
            button {
                border: none;
                outline: none;
                font-size: inherit;
                color: inherit;
                background: none;
                cursor: pointer;
            }
            
            ul, ol {
                list-style: none;
            }
        `}
    />
);