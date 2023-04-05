export const getInitials = (arr) => {
  return (
    arr
      .toString()
      .split(",")
      .map((string) => string.slice(0, 1))
      .join("") || "U"
  );
};

export const stringToColour = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).slice(-2);
  }
  return colour;
};

export const dateToString = (task) => {
  return task.deadLine.slice(0, 10).concat(" ", task.deadLine.slice(11, 19));
};
