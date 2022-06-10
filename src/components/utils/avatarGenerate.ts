export const generateAvatar = (avatar: number) => {
  let colorValue: string = "";

  switch (avatar) {
    case 0:
      colorValue = "linear-gradient(180deg, #31C48D 0%, #84E1BC 100%)";
      break;

    case 1:
      colorValue = "#66B2FF";
      break;

    case 2:
      colorValue = "#FFB266";
      break;

    case 3:
      colorValue = "#FF66B2";
      break;

    case 4:
      colorValue = "#FFFF66";
      break;
  }

  return colorValue;
};
