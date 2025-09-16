export default function getGeneros(content: any, generosJson: { id: number; name: string }[]) {
  if (!generosJson || !content.genre_ids) return [];

  return content.genre_ids
    .map((id: number) => {
      const genre = generosJson.find(g => g.id === id);
      return genre ? genre.name : '';
    })
    .filter(Boolean); // remove valores vazios
}
