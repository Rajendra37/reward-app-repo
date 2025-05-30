import pino from "pino";

const send = async function (level, logEvent, a, b) {
  const url = "https://demo.parseable.io/api/v1/logstream/pinotest";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic cGFyc2VhYmxlOnBhcnNlYWJsZQ==",
        "Content-Type": "application/json",
      },
      body: JSON.stringify([logEvent]),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Log transmission failed: ${response.status} ${response.statusText}`,
        errorText
      );
    } else {
      console.log(`Log sent successfully: ${response.status}`);
    }
  } catch (err) {
    console.error("Network or fetch error during log transmission:", err);
  }
};

const logger = pino({
  browser: {
    serialize: true,
    asObject: true,
    transmit: {
      send,
    },
  },
});

export default logger;
