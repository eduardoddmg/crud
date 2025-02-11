import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [loading, setLoading] = useState(false); // Estado para o loading

  useEffect(() => {
    if (
      (!value && debouncedValue) ||
      (value && !debouncedValue) ||
      (value && debouncedValue)
    )
      setLoading(true); // Inicia o loading
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false); // Finaliza o loading quando o debounce termina
    }, delay);

    return () => {
      clearTimeout(handler); // Limpa o timeout anterior
    };
  }, [value, delay]);

  return { debouncedValue, loading }; // Retorna o valor debounced e o estado de loading
};
