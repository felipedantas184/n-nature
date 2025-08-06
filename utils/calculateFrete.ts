export async function calculateFrete(cepDestino: string) {
  const response = await fetch('/api/calculateFrete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cepDestino }),
  });

  if (!response.ok) {
    throw new Error('Erro ao calcular frete');
  }

  const data = await response.json();
  return data;
}