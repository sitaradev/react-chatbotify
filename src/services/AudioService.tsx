import { Message } from "../types/Message";
import { Options } from "../types/Options";

/**
 * Handles reading out of messages sent by the bot.
 * 
 * @param message message to read out
 * @param language language to listen for
 * @param voiceName voice name to use
 * @param rate speech rate
 */
const speak = (message: string, language: string, voiceName: string, rate: number) => {
	const utterance = new SpeechSynthesisUtterance();
	utterance.text = message;
	utterance.lang = language;
	utterance.rate = rate;
	const voice = window.speechSynthesis.getVoices().find(
		voice => voice.name === voiceName
	);
	if (voice) {
		utterance.voice = voice;
	}

	window.speechSynthesis.speak(utterance);
}

/**
 * Handles logic for whether a bot message should be read out.
 * 
 * @param botOptions options provide to the bot
 * @param voiceToggledOn boolean indicating if voice is toggled on
 * @param message message to read out
 */
export const processAudio = (botOptions: Options, voiceToggledOn: boolean, message: Message) => {
	if (botOptions.audio?.disabled || message.isUser || typeof message.content !== "string"
		|| !botOptions?.isOpen || !voiceToggledOn) {
		return;
	}

	speak(message.content, botOptions.audio?.language as string, botOptions.audio?.voiceName as string,
		botOptions.audio?.rate as number);
}