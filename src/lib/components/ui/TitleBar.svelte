<script>
	import { windowMaximized } from '$lib/stores/window-store';

	import { appWindow } from '@tauri-apps/api/window';
	import { Maximize2, Minimize2, Minus, X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	export let title = 'Ibora';

	const minimizeWindow = async () => {
		await appWindow.minimize();
	};

	const maximizeWindow = async () => {
		await appWindow.toggleMaximize();
		windowMaximized.update((value) => !value);
	};

	const closeWindow = async () => {
		await appWindow.close();
	};
</script>

<div
	data-tauri-drag-region
	class="z-100 fixed flex w-screen select-none justify-between rounded-t-xl bg-background p-2"
>
	<div class="app-title cursor-default p-2 font-semibold" data-tauri-drag-region>
		{title}
	</div>

	<ul class="flex items-center gap-3">
		<Button variant="secondary" class=" cursor-pointer" size="icon" on:click={minimizeWindow}>
			<Minus size="15" />
		</Button>
		<Button variant="secondary" class="  cursor-pointer" size="icon" on:click={maximizeWindow}>
			{#if $windowMaximized}
				<Minimize2 size="15" />
			{:else}
				<Maximize2 size="15" />
			{/if}
		</Button>
		<Button variant="secondary" class="  cursor-pointer" size="icon" on:click={closeWindow}>
			<X size="15" />
		</Button>
	</ul>
</div>
