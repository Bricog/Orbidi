export function getStyleName(divideName: string) {
  const countBar = [...divideName].reduce((p, n) => (n === "/" ? p + 1 : p), 0);

  if (countBar === 1) {
    const [group, name] = divideName.split("/");
    return { group, name };
  } else if (countBar === 2) {
    const [group, subgroup, name] = divideName.split("/");
    return { group, subgroup, name };
  }

  return {
    group: undefined,
    name: divideName,
  };
}
