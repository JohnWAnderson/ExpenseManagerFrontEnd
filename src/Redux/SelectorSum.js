

export default (items) => {
    return items
        .map((item) => item.cost * item.times)
        .reduce((sum, value) => sum + value, 0);
  };
  