import type { SitemapOptions } from "@astrojs/sitemap";
import type { RobotsTxtOptions } from "astro-robots-txt";
import { z } from "astro/zod";

export const GhostUserConfigSchema = z.object({
	/** OPTIONAL - Either set the URL in your .env or put it here
	 * @example
	 * // https://astro.build/config
	 * export default defineConfig({
	 *   integrations: [
	 *     ghostcms({
	 *       ghostURL: "https://ghostdemo.matthiesen.xyz"
	 *     })
	 *   ],
	 * }); */
	ghostURL: z.coerce.string().url("Must be a URL").optional(),
	/** OPTIONAL - Configure the Theme Provider 
	 * @ This option allows the user to configure the Theme Provider
	 */
	ThemeProvider: z
		.object({
			/** OPTIONAL - Disable the theme provider
			 * @default false
			 */
			disableThemeProvider: z.coerce.boolean(),
			/** OPTIONAL - Set the theme you want to use
			 * @default "@matthiesenxyz/astro-ghostcms-theme-default"
			 */
			theme: z.string(),
		})
		.optional()
		.default({
			disableThemeProvider: false,
			theme: "@matthiesenxyz/astro-ghostcms-theme-default"
		}),
	/** Allows the user to disable the provided 404 page */
	disableDefault404: z.coerce.boolean().optional(),
	/** Allows the user to disable the provided RSS Feed */
	enableRSSFeed: z.coerce.boolean().optional().default(true),
	/** Allows the user to Enable or Disable the default Satori OG Image Generation
	 * @default true
	 */
	enableOGImages: z.coerce.boolean().optional().default(true),
	/** Allows the user to turn on/off Full Console Logs
	 * @default true
	 */
	verbose: z.coerce.boolean().optional(),
	/** OPTIONAL - Integrations Configuration
	 * This option allows the user to configure the included integrations
	 * Options shown are the availble options
	 */
	Integrations: z
		.object({
			/** Optional - astro-robots-txt
			 * This option allows the user to configure the included integration
			 * Options shown are the availble options
			 * @see https://www.npmjs.com/package/astro-robots-txt#configuration
			 */
			robotsTxt: z.custom<RobotsTxtOptions>().optional(),
			/** OPTIONAL - astrojs/sitemap
			 * This option allows the user to configure the included integration
			 * Options shown are the availble options
			 * @see https://docs.astro.build/en/guides/integrations-guide/sitemap
			 */
			sitemap: z.custom<SitemapOptions>().optional(),
		})
		.optional().default({}),
});

/** USER CONFIGURATION SCHEMA */
export type GhostUserConfig = z.infer<typeof GhostUserConfigSchema>;
