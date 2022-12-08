// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { TextDecoder, TextEncoder } from "util";

import counterpart from "counterpart";

import { defaultLocales } from "./src/api/params";

// Set counterpart
defaultLocales.forEach(({ type, json }) =>
  counterpart.registerTranslations(type, json)
);

// Text encoder
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
