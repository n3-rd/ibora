<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { sounds } from '$lib/sounds';
	import { Toggle } from '$lib/components/ui/toggle/index.js';
	import { play, stop } from '$lib/play';
</script>

{#each sounds as sound}
	<Toggle
		aria-label="toggle bold"
		onPressedChange={(e) => {
			console.log(e);
			if (e == true) {
				play(sound.id);
			} else {
				stop(sound.id);
			}
		}}
	>
		{sound.id}
	</Toggle>
{/each}
