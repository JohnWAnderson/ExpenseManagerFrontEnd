

export default (items) => {
    return items
        .map((item) => item.cost * item.qTimes)
        .reduce((sum, value) => sum + value, 0);
  };
  