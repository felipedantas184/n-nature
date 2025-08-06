import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { cepDestino } = req.body;
  const token = process.env.NEXT_PUBLIC_SUPER_FRETE_TOKEN;

  if (!token) {
    return res.status(500).json({ message: 'Token da API não configurado' });
  }

  try {
    const response = await fetch('https://sandbox.superfrete.com/api/v0/calculator', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'User-Agent': 'customStore (contato@seudominio.com)', // opcional, mas recomendado
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        from: { postal_code: '64091250' }, // origem fixa
        to: { postal_code: cepDestino },
        services: '1,2,17',
        options: {
          own_hand: false,
          receipt: false,
          insurance_value: 0,
          use_insurance_value: false
        },
        package: {
          height: 10,
          width: 10,
          length: 10,
          weight: 1
        }
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    res.status(500).json({ message: 'Erro ao calcular frete' });
  }
}
