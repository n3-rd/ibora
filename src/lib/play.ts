import { Howl } from 'howler';
import { sounds } from './sounds';

export function play(id: string) {
	const sound = sounds.find((sound) => sound.id === id);
	if (!sound) {
		console.error('Sound not found:', id);
		return;
	}
	if (!sound.howl) {
		sound.howl = new Howl({
			src: [sound.src],
			loop: true,
			html5: true,
			volume: sound.volume
		});
	}
	if (sound.howl) {
		(sound.howl as Howl).play();
	}
}
export function stop(id: string) {
	const sound = sounds.find((sound) => sound.id === id);
	if (!sound) {
		console.error('Sound not found:', id);
		return;
	}
	if (sound.howl) {
		(sound.howl as Howl).stop(); // Add type assertion to access the 'stop' method
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
