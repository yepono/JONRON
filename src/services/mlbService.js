export const getSchedule = async (startDate, endDate, { signal } = {}) => {
  const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${startDate}&endDate=${endDate}&hydrate=team,linescore,venue`;
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error('No se pudo consultar el calendario de MLB. Intenta de nuevo.');

  const data = await response.json();
  if (!Array.isArray(data.dates)) {
    throw new Error('La respuesta del calendario no tiene el formato esperado.');
  }

  return data.dates;
};