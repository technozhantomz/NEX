import { TextDecoder, TextEncoder } from "util";

import { loadEnvConfig } from "@next/env";
import "@testing-library/jest-dom/extend-expect";
import counterpart from "counterpart";

import { defaultLocales } from "./src/api/params";

// Set counterpart
defaultLocales.forEach(({ type, json }) =>
  counterpart.registerTranslations(type, json)
);

// Text encoder
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// local env
loadEnvConfig(process.cwd());
