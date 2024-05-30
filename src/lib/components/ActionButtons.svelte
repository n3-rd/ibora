<script>
	import { Button } from '$lib/components/ui/button';
	import { toggleMode } from 'mode-watcher';
	import { Moon, Sun, Github, Play, Pause } from 'lucide-svelte';
	import { openLink } from '$lib/utils';
	import { isAnySoundPlaying, pauseAllSounds, resumeAllSounds } from '$lib/play';
	import { isPlaying } from '$lib/stores/play-store';

	let playing;

	$: {
		playing = $isPlaying;
	}
</script>

<div class=" fixed bottom-4 left-4">
	<Button on:click={toggleMode} variant="outline" size="icon">
		<Sun
			class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Moon
			class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
</div>

<div class=" fixed bottom-4 right-4">
	<Button on:click={() => openLink('https://github.com/n3-rd/ibora')} variant="outline" size="icon">
		<Github class="h-[1.2rem] w-[1.2rem]" />
	</Button>
</div>

<div class="fixed bottom-4 left-1/2 -translate-x-1/2 transform">
	{#if $isPlaying}
		<Button
			variant="outline"
			size="icon"
			class="bg-[#3584e4] text-white"
			on:click={() => pauseAllSounds()}
		>
			<Pause class="h-[1.2rem] w-[1.2rem]" />
			<span class="sr-only">Toggle theme</span>
		</Button>
	{:else}
		<Button
			variant="outline"
			size="icon"
			class="bg-[#3584e4] text-white"
			on:click={() => resumeAllSounds()}
		>
			<Play class="h-[1.2rem] w-[1.2rem]" />
			<span class="sr-only">Toggle theme</span>
		</Button>
	{/if}
</div>
