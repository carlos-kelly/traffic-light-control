const { Gpio } = require("onoff");
const redPin = new Gpio(26, "out");
const yellowPin = new Gpio(20, "out");
const greenPin = new Gpio(21, "out");

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const reset = () => Promise.all([
  greenPin.write(1),
  yellowPin.write(1),
  redPin.write(1),
]);

const main = async () => {
  try {
    await reset();
    await greenPin.write(0);
    await delay(3000);
    await greenPin.write(1);
    await yellowPin.write(0);
    await delay(2000);
    await yellowPin.write(1);
    await redPin.write(0);
    await delay(3000);
    await redPin.write(1);
  } catch (e) {
    console.error(e);
  }
};

process.on("SIGINT", () => {
  redPin.unexport();
  yellowPin.unexport();
  greenPin.unexport();
});

main();
