const { Gpio } = require("onoff");
const redPin = new Gpio(26, "out");
const yellowPin = new Gpio(20, "out");
const greenPin = new Gpio(21, "out");

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const resetPins = async () =>
  await Promise.all([
    redPin.write(Gpio.LOW),
    yellowPin.write(Gpio.LOW),
    greenPin.write(Gpio.LOW),
  ]);

const performSequence = async () => {
  await greenPin.write(Gpio.HIGH);
  await delay(7000);
  await greenPin.write(Gpio.LOW);
  await yellowPin.write(Gpio.HIGH);
  await delay(2000);
  await yellowPin.write(Gpio.LOW);
  await redPin.write(Gpio.HIGH);
  await delay(7000);
  await redPin.write(Gpio.LOW);
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
