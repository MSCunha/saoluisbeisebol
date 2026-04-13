"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Sidebar from "@/components/sidebar";
import Loading from "@/components/loading";
import AdminModal from "@/components/admin-modal";

type Tab = "evolucao" | "feedbacks" | "jogos";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("evolucao");
  const [history, setHistory] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!supabase) return;
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .single();
        setProfile(profileData);

        const { data: historyData } = await supabase
          .from("stats_history")
          .select("*")
          .eq("athlete_id", user.id)
          .order("created_at", { ascending: true });

        setHistory(historyData || []);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <Loading visible={true} />;

  const chartData = history.map((h) => ({
    data: new Date(h.created_at).toLocaleDateString("pt-BR"),
    Overall: h.overall,
    Frequência: h.frequencia,
    Agilidade: h.agilidade,
    Flexibilidade: h.flexibilidade,
    Força: h.forca,
    Resistência: h.resistencia,
    Velocidade: h.velocidade,
    Arremesso: h.arremesso,
    Defesa: h.defesa,
    Visão: h.visao,
    Precisão: h.precisao,
    Rebatida: h.rebatida,
    Contato: h.contato,
  }));

  return (
    <main className="min-h-screen bg-[#5dc0fd] flex font-sans relative overflow-hidden">
      <Sidebar
        isAdmin={profile?.is_admin || false}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Ajuste de margem responsiva: ml-0 no mobile, ml-14 no desktop */}
      <div className="flex-1 p-4 md:p-10 ml-0 md:ml-14 flex flex-col items-center overflow-y-auto no-scrollbar">
        <header className="w-full max-w-5xl mb-6 text-white animate-in slide-in-from-top duration-700 mt-12 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter leading-tight">
            Histórico de Performance
          </h1>
          <p className="text-[8px] md:text-[10px] font-bold opacity-70 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1">
            Unidade de Inteligência Itapiracó
          </p>
        </header>

        {/* ESTRUTURA DE FICHÁRIO */}
        <div className="w-full max-w-5xl flex-1 flex flex-col animate-in fade-in zoom-in-95 duration-500">
          {/* TAB CONTAINER: Scroll horizontal no mobile */}
          <div className="flex gap-1 items-end px-2 md:px-4 overflow-x-auto no-scrollbar scroll-smooth">
            <TabHandle
              active={activeTab === "evolucao"}
              onClick={() => setActiveTab("evolucao")}
              label="Evolução"
            />
            <TabHandle
              active={activeTab === "feedbacks"}
              onClick={() => setActiveTab("feedbacks")}
              label="Feedbacks"
            />
            <TabHandle
              active={activeTab === "jogos"}
              onClick={() => setActiveTab("jogos")}
              label="Jogos"
            />
          </div>

          <div className="bg-white rounded-2xl md:rounded-lg shadow-2xl p-5 md:p-12 flex-1 min-h-125 relative">
            {activeTab === "evolucao" && (
              <div className="space-y-8 md:space-y-12">
                <section>
                  <div className="flex justify-between items-end mb-6">
                    <h2 className="text-slate-800 font-black italic uppercase text-xs md:text-sm flex items-center gap-2">
                      <div className="w-1.5 h-4 md:w-2 md:h-5 bg-[#5dc0fd] rounded-full" />
                      Gráfico de Evolução
                    </h2>
                    <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase italic">
                      Escala 0-100
                    </span>
                  </div>

                  {/* Altura do gráfico reduzida no mobile (h-80 vs h-112) */}
                  <div className="h-80 md:h-112.5 w-full bg-slate-50/50 rounded-xl p-2 md:p-6 border border-slate-100 shadow-inner">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#e2e8f0"
                        />
                        <XAxis
                          dataKey="data"
                          fontSize={8}
                          fontWeight="900"
                          stroke="#cbd5e1"
                          tickMargin={10}
                        />
                        <YAxis
                          fontSize={8}
                          fontWeight="900"
                          stroke="#cbd5e1"
                          domain={[0, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "15px",
                            border: "none",
                            boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                            fontSize: "10px",
                          }}
                        />
                        <Legend
                          iconType="circle"
                          wrapperStyle={{
                            paddingTop: "20px",
                            fontSize: "8px",
                            fontWeight: "900",
                            textTransform: "uppercase",
                          }}
                        />

                        <Line
                          type="monotone"
                          dataKey="Overall"
                          stroke="#0f172a"
                          strokeWidth={4}
                          dot={{ r: 4, fill: "#0f172a" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Velocidade"
                          stroke="#5dc0fd"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="Força"
                          stroke="#f97316"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="Defesa"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                {/* Grid de MiniStats: 2 colunas no mobile */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                  <MiniStat
                    label="Performance"
                    value={history[history.length - 1]?.overall || 0}
                  />
                  <MiniStat
                    label="Evolução"
                    value={`${history[history.length - 1]?.overall - history[0]?.overall >= 0 ? "+" : ""}${history[history.length - 1]?.overall - history[0]?.overall || 0}%`}
                    isPositive={
                      history[history.length - 1]?.overall -
                        history[0]?.overall >=
                      0
                    }
                  />
                  <MiniStat
                    label="Pico"
                    value={Math.max(...history.map((h) => h.overall), 0)}
                  />
                  <MiniStat label="Registros" value={history.length} />
                </div>
              </div>
            )}

            {activeTab === "feedbacks" && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-slate-800 font-black italic uppercase text-sm mb-6 flex items-center gap-2">
                  <div className="w-2 h-5 bg-[#5dc0fd] rounded-full" />
                  Avaliações do Coach
                </h2>
                <div className="grid gap-4 md:gap-6">
                  {history
                    .filter((h) => h.notas_tecnicas)
                    .reverse()
                    .map((h, i) => (
                      <div
                        key={i}
                        className="bg-slate-50 border-l-4 md:border-l-12 border-[#5dc0fd] p-5 md:p-8 rounded-r-2xl md:rounded-r-4xl relative group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[8px] md:text-[10px] font-black text-[#5dc0fd] uppercase tracking-widest bg-[#5dc0fd]/10 px-2 py-1 rounded-md">
                            {new Date(h.created_at).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs md:text-sm font-bold leading-relaxed italic">
                          "{h.notas_tecnicas}"
                        </p>
                      </div>
                    ))}
                  {history.filter((h) => h.notas_tecnicas).length === 0 && (
                    <div className="text-center py-20 opacity-20 font-black uppercase italic">
                      Sem feedbacks registrados
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </main>
  );
}

// --- SUBCOMPONENTES AJUSTADOS ---

function TabHandle({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 md:px-8 py-3 md:py-4 rounded-t-2xl md:rounded-t-3xl text-[9px] md:text-[10px] font-black uppercase italic whitespace-nowrap transition-all duration-500 
      ${active ? "bg-white text-slate-800 shadow-md h-12 md:h-14" : "bg-white/20 text-white/50 h-10 md:h-11"}`}
    >
      {label}
    </button>
  );
}

function MiniStat({
  label,
  value,
  isPositive,
}: {
  label: string;
  value: any;
  isPositive?: boolean;
}) {
  return (
    <div className="bg-slate-50 p-4 md:p-6 rounded-2xl md:rounded-4xl border border-slate-100 shadow-sm">
      <p className="text-[7px] md:text-[9px] font-black text-slate-400 uppercase mb-1 md:mb-2 tracking-widest">
        {label}
      </p>
      <p
        className={`text-xl md:text-3xl font-black italic tracking-tighter ${isPositive ? "text-[#10b981]" : "text-slate-800"}`}
      >
        {value}
      </p>
    </div>
  );
}
