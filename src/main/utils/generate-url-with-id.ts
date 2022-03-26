export const GenerateUrlWithId = (
  id: number,
  url: string,
  customUrl: string = ""
) => {
  if (customUrl) {
    return customUrl.replace(/\$id/g, id.toString());
  }
  return `${url}/${id}`;
};
