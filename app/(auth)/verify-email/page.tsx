"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function VerificarEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"verificando" | "sucesso" | "erro">(
    "verificando"
  );

  useEffect(() => {
    async function verifyEmail() {
      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");

      if (!accessToken || !refreshToken) {
        setStatus("erro");
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        console.error("Erro ao autenticar:", error.message);
        setStatus("erro");
      } else {
        setStatus("sucesso");
        toast({
          title: "Conta confirmada!",
          description: "Seu e-mail foi verificado com sucesso.",
          className: "bg-green-500 text-white",
        });

        // Redireciona para dashboard ou login após 3s
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      }
    }

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      {status === "verificando" && (
        <div>
          <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
          <p className="mt-4 text-lg">Verificando seu e-mail...</p>
        </div>
      )}

      {status === "sucesso" && (
        <div>
          <p className="text-xl text-green-600">✅ Seu e-mail foi confirmado!</p>
          <p className="text-gray-500">Redirecionando para o painel...</p>
        </div>
      )}

      {status === "erro" && (
        <div>
          <p className="text-xl text-red-600">❌ Erro ao verificar e-mail.</p>
          <p className="text-gray-500">Tente novamente ou contate o suporte.</p>
        </div>
      )}
    </div>
  );
}
