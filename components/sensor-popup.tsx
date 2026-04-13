"use client";
import { useState, useEffect } from "react";
import { useSensor } from "@/context/SensorContext";

export default function SensorPopup() {
  const { permissionStatus, requestPermission, setIsEnabled } = useSensor();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta se é mobile (Android, iPhone, iPad, etc)
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    };

    setIsMobile(checkMobile());
  }, []);

  // Só mostra se for a primeira vez
  if (!isMobile || permissionStatus !== "default") return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[30px] p-8 max-w-sm w-full shadow-2xl border-4 border-[#5dc0fd] text-center">
        <p className="text-slate-500 text-sm mt-3 font-bold">
          Este aplicativo pode utilizar o giroscópio do celular para melhorar a experiência, deseja permitir o uso dos sensores de movimento do aparelho?
        </p>
        
        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={() => requestPermission()}
            className="w-full bg-[#5dc0fd] text-white py-4 rounded-full font-black italic uppercase text-xs shadow-lg active:scale-95 transition-all"
          >
            Permitir e Ativar
          </button>
          <button
            onClick={() => {
              // Salva como negado apenas para não mostrar o popup de novo
              localStorage.setItem("slz_gyro_permission", "denied");
              window.location.reload(); // Recarrega para aplicar
            }}
            className="w-full bg-slate-100 text-slate-400 py-4 rounded-full font-black italic uppercase text-xs hover:bg-slate-200 transition-all"
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
}