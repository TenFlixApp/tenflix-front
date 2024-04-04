/// <reference types="vite/client" />
import { ImportMetaEnv as BaseImportMetaEnv } from 'vite'

interface ImportMetaEnv extends BaseImportMetaEnv {
  readonly AUTH_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}