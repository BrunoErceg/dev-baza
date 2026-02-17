export const formatRelativeDate = (date: Date) => {
  const ageInHours = Math.floor(
    (new Date().getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (ageInHours === 0) return "Upravo";
  if (ageInHours < 5) return `Prije ${ageInHours} sata`;
  if (ageInHours < 12) return `Prije ${ageInHours} sati`;
  if (ageInHours < 24) return `Danas`;
  if (ageInHours < 48) return `Jučer`;
  const ageInDays = Math.floor(ageInHours / 24);

  return `Prije ` + Math.abs(ageInDays) + ` dana`;
};
