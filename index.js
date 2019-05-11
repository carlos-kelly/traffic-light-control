const { Gpio } = require("onoff");
const redPin = new Gpio(26, "out");
const yellowPin = new Gpio(20, "out");
const greenPin = new Gpio(21, "out");

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const resetPins = async () =>
  await Promise.all([
    redPin.write(Gpio.HIGH),
    yellowPin.write(Gpio.HIGH),
    greenPin.write(Gpio.HIGH),
  ]);

const performSequence = async () => {
  await greenPin.write(Gpio.LOW);
  await delay(7000);
  await greenPin.write(Gpio.HIGH);
  await yellowPin.write(Gpio.LOW);
  await delay(2000);
  await yellowPin.write(Gpio.HIGH);
  await redPin.write(Gpio.LOW);
  await delay(7000);
  await redPin.write(Gpio.HIGH);
};

const loop = () => performSequence().then(loop);

const main = async () => {
  try {
    await resetPins();
    loop();
  } catch (err) {
    console.error(err);
  }
};

process.on("SIGINT", () => {
  redPin.unexport();
  yellowPin.unexport();
  greenPin.unexport();
});

main();
