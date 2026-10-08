export const getSchedule = async (startDate, endDate) => {
  try {
    const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${startDate}&endDate=${endDate}&hydrate=team,linescore,venue`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al conectar con la API de MLB');
    const data = await response.json();
    return data.dates || [];
  } catch (error) {
    console.error('Error en MLB API:', error);
    return [];
  }
};