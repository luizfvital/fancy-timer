export default class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onPause = callbacks.onPause;
      this.onTick = callbacks.onTick;
      this.onFinished = callbacks.onFinished;
    }

    this.startButton.addEventListener('click', this.start.bind(this));
    this.pauseButton.addEventListener('click', this.pause.bind(this));
  }

  start() {
    if (!this.timeRemaining) return;

    this.startButton.setAttribute('disabled', '');
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  pause() {
    this.startButton.removeAttribute('disabled');
    clearInterval(this.interval);
  }

  tick() {
    if (this.timeRemaining === 0) {
      this.pause();
    } else {
      const timeRemaining = this.timeRemaining - 1;
      this.timeRemaining = timeRemaining;
    }
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time;
  }
}