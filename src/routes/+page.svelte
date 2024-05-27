<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { sounds } from '$lib/sounds';
	import { Toggle } from '$lib/components/ui/toggle/index.js';
	import { play, setVolume, stop } from '$lib/play';
	import { Slider } from '$lib/components/ui/slider';
	import { toggleMode } from 'mode-watcher';
	import {
		CloudRain,
		Bird,
		Coffee,
		MoonStar,
		AudioLines,
		Sailboat,
		FlameKindling,
		Zap,
		TramFront,
		Wind,
		Building,
		AudioWaveform,
		Droplets,
		Waves,
		Moon,
		Sun
	} from 'lucide-svelte';
	const iconComponents = {
		CloudRain,
		Bird,
		Coffee,
		MoonStar,
		AudioLines,
		Sailboat,
		FlameKindling,
		Zap,
		TramFront,
		Wind,
		Building,
		AudioWaveform,
		Droplets,
		Waves
	};
	let isDragging = false;

	$: {
		console.log('isDragging', isDragging);
	}
</script>

<div class="grid min-h-full min-w-full grid-cols-4 gap-3 p-4">
	{#each sounds as sound}
		<Toggle
			aria-label="toggle bold"
			class={`flex min-h-36 min-w-36 flex-col items-center gap-3 border capitalize data-[state=on]:text-[#31b9ce]
				${isDragging ? 'pointer-events-none' : ''}
			`}
			disabled={isDragging}
			onPressedChange={(e) => {
				console.log(e);
				if (e == true) {
					play(sound.id);
				} else {
					stop(sound.id);
				}
			}}
		>
			<svelte:component this={iconComponents[sound.icon]} size="30" />
			<div>
				{sound.id}
			</div>

			<input
				type="range"
				min={0}
				value={sound.volume * 100}
				max={100}
				class="z-50"
				on:input={(e) => {
					isDragging = true;
					setVolume(sound.id, e.target.value / 100);
				}}
				on:change={(e) => {
					isDragging = false;
					console.log(sound.volume);
					console.log(sounds);
				}}
			/>
		</Toggle>
	{/each}

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
</div>
