<script>
	import TitleBar from '$lib/components/ui/TitleBar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<TitleBar title="Ibora" />
<slot></slot>

<style></style>
