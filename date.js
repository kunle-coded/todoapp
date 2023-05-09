exports.getDate = function () {
  const currentDay = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return currentDay.toLocaleDateString("en-US", options);
};

exports.getDay = function () {
  const currentDay = new Date();
  const options = {
    weekday: "long",
  };
  return currentDay.toLocaleDateString("en-US", options);
};
