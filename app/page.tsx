"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Obtém a parte do fragmento após #
      const hashParams = new URLSearchParams(window.location.hash.substring(1));

      setError(hashParams.get("error"));
      setErrorCode(hashParams.get("error_code"));
      setErrorDescription(hashParams.get("error_description"));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Página Inicial</h1>

      {error && (
        <div className="mt-4 p-4 border border-red-500 bg-red-100 text-red-700 rounded">
          <p className="font-semibold">Erro: {error}</p>
          {errorCode && <p className="text-sm">Código: {errorCode}</p>}
          {errorDescription && (
            <p className="text-sm">
              Descrição: {decodeURIComponent(errorDescription)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
