import { Howl } from 'howler';
import { sounds } from './sounds';
import { platform } from '@tauri-apps/api/os';
import { isPlaying } from './stores/play-store';

export async function play(id: string) {
	const sound = sounds.find((sound) => sound.id === id);
	if (!sound) {
		console.error('Sound not found:', id);
		return;
	}
	if (!sound.howl) {
		const platformName = await platform();
		let musicUrl;
		if (platformName === 'linux') {
			const soundFile = sound.src;
			// convert soundfile to blob
			const response = await fetch(soundFile);
			const blob = await response.blob();
			const blobUrl = URL.createObjectURL(blob);

			musicUrl = blobUrl;
		} else {
			musicUrl = sound.src;
		}
		sound.howl = new Howl({
			src: [musicUrl],
			loop: true,
			html5: true,
			volume: sound.volume,
			type: 'audio/ogg'
		});
	}
	if (sound.howl) {
		(sound.howl as Howl).play();
	} else {
		(sound.howl as Howl).stop();
	}
}
export function stop(id: string) {
	const sound = sounds.find((sound) => sound.id === id);
	if (!sound) {
		console.error('Sound not found:', id);
		return;
	}
	if (sound.howl) {
		(sound.howl as Howl).stop(); // Stop the sound
		(sound.howl as Howl).unload(); // Unload the sound
		sound.howl = null; // Nullify the Howl object
		console.log('stopping');
	}
}

export function setVolume(id: string, volume: number) {
	const sound = sounds.find((sound) => sound.id === id);
	if (!sound) {
		console.error('Sound not found:', id);
		return;
	}
	if (sound.howl) {
		(sound.howl as Howl).volume(volume); // Add type assertion to access the 'volume' method
	}
}

export function pauseAllSounds() {
	for (const sound of sounds) {
		if (sound.howl) {
			(sound.howl as Howl).pause();
		}
	}
}

export function resumeAllSounds() {
	for (const sound of sounds) {
		if (sound.howl) {
			(sound.howl as Howl).play();
		}
	}
}

export function isAnySoundPlaying(): boolean {
	for (const sound of sounds) {
		if (sound.howl && (sound.howl as Howl).playing()) {
			isPlaying.set(true);
			return true;
		}
	}
	isPlaying.set(false);
	return false;
}

setInterval(() => {
	isAnySoundPlaying();
}, 500);
