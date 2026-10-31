import { existsSync } from 'node:fs';
import { sites } from '@openai/sites-vite-plugin';
import vinext from 'vinext';
import { defineConfig } from 'vite';

export default defineConfig(async () => {
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';
  const { cloudflare } = await import('@cloudflare/vite-plugin');

  return {
    plugins: [
      vinext(),
      ...(existsSync(new URL('./.openai/hosting.json', import.meta.url)) ? [sites()] : []),
      cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        config: {
          main: './worker/index.ts',
          compatibility_flags: ['nodejs_compat'],
        },
      }),
    ],
  };
});

