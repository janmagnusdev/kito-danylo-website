/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import type { SUPPORTED_LANGUAGES } from "@lib/constants.ts";

interface ImportMetaEnv {
  readonly CONTENTFUL_SPACE_ID: string;
  readonly CONTENTFUL_DELIVERY_TOKEN: string;
  readonly CONTENTFUL_PREVIEW_TOKEN: string;
}

declare namespace App {
  export interface Locals {
    locale: SUPPORTED_LANGUAGES;
  }
}
