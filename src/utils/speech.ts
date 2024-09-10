export default function speech() {
  const synth = window.speechSynthesis;
  const speech = new SpeechSynthesisUtterance();

  function playVoice(text: string, onEnd?: () => void) {
    handleSpeak(text, onEnd); // 传入需要播放的文字
  }
  function handleSpeak(text: string, onEnd?: () => void) {
    speech.text = text; // 文字内容: 如果能播放出声音 那可真是泰裤辣！
    speech.lang = 'zh-CN'; // 使用的语言:中文
    speech.volume = 1; // 声音音量：1
    speech.rate = 1; // 语速：1
    speech.pitch = 1; // 音高：1

    if (onEnd) {
      speech.onend = onEnd;
    }

    synth.speak(speech); // 播放
  }
  function handleStop(e: string) {
    speech.text = e;
    speech.lang = 'zh-CN';
    synth.cancel(speech);
  }

  return {
    handleStop,
    playVoice
  };
}
