// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from "@catppuccin/starlight";	

// https://astro.build/config
export default defineConfig({
	site: 'https://nighterdevelopment.github.io/smartspawner-docs/',
	base: '/smartspawner-docs/',
	integrations: [
		starlight({
			plugins: [
				catppuccin({
				
				}),
			],
			title: 'SmartSpawner Documentation',
			customCss: [
				'./src/styles/custom.css',
			],
			description: 'Professional spawner management plugin for Minecraft servers',
			favicon: '/favicon.svg',
			// logo: {
			// 		src: './src/assets/logo.png',
			// },
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/ptthanh02/SmartSpawner' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/zrnyG4CuuT' },
			],
			components: {
				Footer: './src/overrides/Footer.astro',
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Installation', slug: 'installation' },
						{ label: 'Features Overview', slug: 'features' },
					],
				},
				{
					label: 'User Guide',
					items: [
						{ label: 'Commands', slug: 'commands' },
						{ label: 'Permissions', slug: 'permissions' },
						{ label: 'Mob Drops', slug: 'mob-drops' },
					],
				},
				{
					label: 'Integrations',
					items: [
						{ label: 'Plugin Compatibility', slug: 'plugin-compatibility' },
						{
							label: 'Setup Guides',
							collapsed: false,
							items: [
								{ label: 'MythicMobs', slug: 'integrations/mythicmobs' },
								{ label: 'SuperiorSkyblock2', slug: 'integrations/superiorskyblock2' },
								{ label: 'BentoBox', slug: 'integrations/bentobox' },
							],
						},
					],
				},
				{
					label: 'Advanced',
					items: [
						{ label: 'Developer API', slug: 'developer-api' },
					],
				},
			],
		}),
	],
});
