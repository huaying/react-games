export const Strategy = {
  random: grid => {
    const avail = [];
    grid.forEach((block, i) => {
      if (block === null) avail.push(i);
    });

    if (avail.length === 0) return null;
    return avail[Math.floor(Math.random() * avail.length)];
  }
};
