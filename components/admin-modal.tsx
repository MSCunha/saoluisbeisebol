"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

type Tab = "requests" | "athletes" | "tutorials" | "news";

export default function AdminModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("requests");

  if (!isOpen) return null;

  return (
    /* BACKDROP */
    <div
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-0 md:p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* MODAL CONTAINER - flex-col no mobile, flex-row no desktop */}
      <div
        className="bg-white w-full h-full md:max-w-6xl md:h-[90vh] md:rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 md:border-4 border-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* NAVEGAÇÃO RESPONSIVA */}
        <nav className="w-full md:w-72 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 p-4 md:p-8 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible no-scrollbar shrink-0 items-center md:items-stretch">
          {/* Logo e Título - Escondidos no mobile para priorizar as abas */}
          <div className="hidden md:flex items-center gap-3 mb-12 px-2">
            <Image
              src="/logoslzbeisebol.png"
              alt="logo"
              width={35}
              height={35}
            />
            <div>
              <h2 className="font-black italic uppercase text-[#5dc0fd] text-xs leading-none">
                Painel de Controle
              </h2>
            </div>
          </div>

          <TabBtn
            active={activeTab === "requests"}
            label="Solicitações"
            onClick={() => setActiveTab("requests")}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            }
          />

          <TabBtn
            active={activeTab === "athletes"}
            label="Roster"
            onClick={() => setActiveTab("athletes")}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 22l-4.8-4.8M19.5 10.5a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM13.05 6.28a2.55 2.55 0 1 1-5.1 0 2.55 2.55 0 0 1 5.1 0ZM5.4 15.88a5.1 5.1 0 0 1 10.2 0A12.19 12.19 0 0 1 10.5 16.99c-1.82 0-3.55-.4-5.1-1.11Z"
              />
            }
          />

          <TabBtn
            active={activeTab === "tutorials"}
            label="Tutoriais"
            onClick={() => setActiveTab("tutorials")}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
              />
            }
          />

          <TabBtn
            active={activeTab === "news"}
            label="Notícias"
            onClick={() => setActiveTab("news")}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
              />
            }
          />

          <button
            onClick={onClose}
            className="md:mt-auto text-slate-800 font-black italic uppercase text-[9px] md:text-[10px] p-3 md:p-5 hover:text-red-600 transition-all cursor-pointer whitespace-nowrap"
          >
            Sair
          </button>
        </nav>

        {/* CONTEÚDO DINÂMICO - Ajuste de padding no mobile */}
        <section className="flex-1 p-5 md:p-10 overflow-y-auto bg-white text-gray-900">
          {activeTab === "requests" && <RequestsView />}
          {activeTab === "athletes" && <AthletesView />}
          {activeTab === "tutorials" && <TutorialsView />}
          {activeTab === "news" && <NewsView />}
        </section>
      </div>
    </div>
  );
}

// --- VIEWS ---

function RequestsView() {
  const [items, setItems] = useState<any[]>([]);
  const load = async () => {
    const { data } = await supabase!
      .from("profiles")
      .select("*")
      .eq("status", "pending");
    setItems(data || []);
  };
  useEffect(() => {
    load();
  }, []);

  const handleAction = async (id: string, status: string) => {
    await supabase!.from("profiles").update({ status }).eq("id", id);
    load();
  };

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-6 md:mb-8 border-b-4 border-slate-800 pb-4">
        <h3 className="text-xl md:text-2xl font-black italic uppercase text-slate-800 leading-tight">
          Solicitações
        </h3>
        <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase">
          Aprovar atletas
        </p>
      </header>
      <div className="grid gap-3">
        {items.map((req) => (
          <div
            key={req.id}
            className="bg-slate-50 rounded-lg p-4 md:p-6 border-l-4 md:border-l-8 border-slate-800 flex flex-col md:flex-row justify-between md:items-center gap-4 shadow-sm"
          >
            <div>
              <p className="font-black text-[#5dc0fd] italic uppercase text-md md:text-lg leading-tight">
                {req.full_name}
              </p>
              <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Camisa #{req.jersey_number}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(req.id, "approved")}
                className="flex-1 md:flex-none bg-green-500 text-white text-[9px] font-black px-4 md:px-6 py-3 rounded-lg uppercase"
              >
                Aprovar
              </button>
              <button
                onClick={() => handleAction(req.id, "rejected")}
                className="flex-1 md:flex-none bg-red-500 text-white text-[9px] font-black px-4 md:px-6 py-3 rounded-lg uppercase"
              >
                Recusar
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-center py-10 md:py-20 text-slate-300 italic font-bold text-sm">
            Vazio por aqui.
          </p>
        )}
      </div>
    </div>
  );
}

function AthletesView() {
  const [athletes, setAthletes] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const load = async () => {
    const { data } = await supabase!
      .from("profiles")
      .select("*, player_stats(*)")
      .eq("status", "approved")
      .order("jersey_number");
    const normalized = (data || []).map((a) => ({
      ...a,
      player_stats:
        Array.isArray(a.player_stats) && a.player_stats.length > 0
          ? a.player_stats[0]
          : {
              frequencia: 0,
              agilidade: 0,
              flexibilidade: 0,
              forca: 0,
              resistencia: 0,
              velocidade: 0,
              arremesso: 0,
              defesa: 0,
              visao: 0,
              precisao: 0,
              rebatida: 0,
              contato: 0,
              notas_tecnicas: "",
              historico_texto: "",
            },
    }));
    setAthletes(normalized);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e: any) => {
    e.preventDefault();
    const { error: profileError } = await supabase!
      .from("profiles")
      .update({
        full_name: selected.full_name,
        jersey_number: selected.jersey_number,
        position: selected.position,
        jersey_name:
          selected.jersey_name ||
          selected.full_name.split(" ")[0].toUpperCase(),
        preferred_positions: selected.preferred_positions,
      })
      .eq("id", selected.id);

    const statsPayload = {
      athlete_id: selected.id,
      frequencia: selected.player_stats?.frequencia || 0,
      agilidade: selected.player_stats?.agilidade || 0,
      flexibilidade: selected.player_stats?.flexibilidade || 0,
      forca: selected.player_stats?.forca || 0,
      resistencia: selected.player_stats?.resistencia || 0,
      velocidade: selected.player_stats?.velocidade || 0,
      arremesso: selected.player_stats?.arremesso || 0,
      defesa: selected.player_stats?.defesa || 0,
      visao: selected.player_stats?.visao || 0,
      precisao: selected.player_stats?.precisao || 0,
      rebatida: selected.player_stats?.rebatida || 0,
      contato: selected.player_stats?.contato || 0,
      notas_tecnicas: selected.player_stats?.notas_tecnicas || "",
      historico_texto: selected.player_stats?.historico_texto || "",
    };

    const upsertPayload = selected.player_stats?.id
      ? { ...statsPayload, id: selected.player_stats.id }
      : statsPayload;
    const { error: statsError } = await supabase!
      .from("player_stats")
      .upsert(upsertPayload);

    if (!profileError && !statsError) {
      alert(`Atualizado!`);
      setSelected(null);
      load();
    }
  };

  const deletePlayer = async (id: string) => {
    if (confirm("⚠️ Excluir permanentemente?")) {
      await supabase!.from("profiles").delete().eq("id", id);
      load();
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      {!selected ? (
        <>
          <header className="mb-6 md:mb-8 border-b-4 border-[#5dc0fd] pb-4">
            <h3 className="text-xl md:text-2xl font-black italic uppercase text-slate-800">
              Roster
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
              Gestão técnica
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {athletes.map((a) => (
              <div
                key={a.id}
                className="bg-slate-100 p-4 md:p-6 rounded-lg flex justify-between items-center group hover:bg-[#5dc0fd]/10 transition-all border border-transparent hover:border-[#5dc0fd]/20"
              >
                <div>
                  <span className="text-[#5dc0fd] font-black italic mr-2 text-lg">
                    #{a.jersey_number}
                  </span>
                  <span className="font-black uppercase text-slate-700 text-xs md:text-sm">
                    {a.full_name}
                  </span>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setSelected(a)}
                    className="bg-slate-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-bold uppercase text-[9px]"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletePlayer(a.id)}
                    className="bg-slate-200 text-slate-400 p-2 md:p-3 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                  >
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <form
          onSubmit={save}
          className="bg-slate-50 p-6 md:p-10 rounded-2xl md:rounded-[40px] border-2 border-slate-100 animate-in zoom-in-95 duration-300"
        >
          <div className="flex justify-between items-start mb-8 md:mb-10">
            <h3 className="text-xl md:text-3xl font-black italic uppercase text-slate-800">
              {selected.full_name}
            </h3>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-slate-300 hover:text-slate-800 p-2"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-8 md:mb-10 pb-8 md:pb-10 border-b-2 border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <InputItem
                label="Nome Completo"
                val={selected.full_name}
                set={(v) => setSelected({ ...selected, full_name: v })}
              />
              <InputItem
                label="Nome na Camisa"
                val={selected.jersey_name || ""}
                set={(v) => setSelected({ ...selected, jersey_name: v })}
              />
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-black text-slate-400 uppercase ml-1">
                  Número
                </label>
                <input
                  type="number"
                  className="bg-white border-2 border-slate-200 rounded-xl p-3 font-black text-slate-700 outline-none focus:border-[#5dc0fd]"
                  value={selected.jersey_number}
                  onChange={(e) =>
                    setSelected({ ...selected, jersey_number: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h5 className="text-[10px] font-black uppercase text-slate-400 mb-6 italic">
              Performance 0-100
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Object.keys(selected.player_stats)
                .filter(
                  (k) =>
                    ![
                      "id",
                      "athlete_id",
                      "notas_tecnicas",
                      "historico_texto",
                      "created_at",
                    ].includes(k),
                )
                .map((attr) => (
                  <div key={attr} className="flex flex-col gap-1">
                    <label className="text-[8px] font-black text-slate-400 uppercase ml-1">
                      {attr}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="bg-white border-2 border-slate-200 rounded-xl p-2 md:p-3 font-black text-slate-700 text-xs outline-none focus:border-[#5dc0fd]"
                      value={selected.player_stats?.[attr] || 0}
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          player_stats: {
                            ...selected.player_stats,
                            [attr]: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <textarea
              className="bg-white border-2 border-slate-200 rounded-2xl p-4 md:p-6 text-xs font-bold h-32 md:h-40 outline-none focus:border-[#5dc0fd]"
              placeholder="Histórico..."
              value={selected.player_stats?.historico_texto || ""}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  player_stats: {
                    ...selected.player_stats,
                    historico_texto: e.target.value,
                  },
                })
              }
            />
            <textarea
              className="bg-white border-2 border-slate-200 rounded-2xl p-4 md:p-6 text-xs font-bold h-32 md:h-40 outline-none focus:border-[#5dc0fd]"
              placeholder="Notas..."
              value={selected.player_stats?.notas_tecnicas || ""}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  player_stats: {
                    ...selected.player_stats,
                    notas_tecnicas: e.target.value,
                  },
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-1/2 bg-[#5dc0fd] text-white font-black italic uppercase p-4 md:p-5 rounded-2xl shadow-xl active:scale-95 transition-all text-xs"
          >
            Salvar Alterações
          </button>
        </form>
      )}
    </div>
  );
}

function TutorialsView() {
  const [form, setForm] = useState({
    title: "",
    type: "video",
    content: "",
    description: "",
  });
  const save = async (e: any) => {
    e.preventDefault();
    await supabase!.from("tutorials").insert([form]);
    alert("Publicado!");
    setForm({ title: "", type: "video", content: "", description: "" });
  };

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-6 border-b-4 border-slate-800 pb-4">
        <h3 className="text-xl font-black italic uppercase text-slate-800">
          Novo Guia
        </h3>
      </header>
      <form
        onSubmit={save}
        className="bg-slate-50 p-6 md:p-8 rounded-2xl flex flex-col gap-4"
      >
        <InputItem
          label="Título"
          val={form.title}
          set={(v) => setForm({ ...form, title: v })}
        />
        <select
          className="bg-white border-2 border-slate-200 p-4 rounded-xl font-black text-slate-600 italic text-xs outline-none focus:border-[#5dc0fd]"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          value={form.type}
        >
          <option value="video">Vídeo</option>
          <option value="pdf">PDF</option>
        </select>
        <textarea
          className="bg-white border-2 border-slate-200 p-4 rounded-xl text-[10px] h-20 outline-none focus:border-[#5dc0fd]"
          placeholder="Link..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button
          type="submit"
          className="bg-slate-800 text-white font-black uppercase italic p-4 rounded-xl"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}

function NewsView() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image_url: "",
  });
  const [newsList, setNewsList] = useState<any[]>([]);
  const load = async () => {
    const { data } = await supabase!
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    setNewsList(data || []);
  };
  useEffect(() => {
    load();
  }, []);

  const save = async (e: any) => {
    e.preventDefault();
    await supabase!.from("news").insert([form]);
    alert("📢 Notícia!");
    setForm({ title: "", description: "", content: "", image_url: "" });
    load();
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <form
        onSubmit={save}
        className="bg-slate-50 p-6 rounded-2xl flex flex-col gap-4"
      >
        <InputItem
          label="Manchete"
          val={form.title}
          set={(v) => setForm({ ...form, title: v })}
        />
        <textarea
          required
          className="bg-white border-2 border-slate-200 rounded-xl p-4 text-xs h-32 outline-none focus:border-[#5dc0fd]"
          placeholder="Conteúdo..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button
          type="submit"
          className="bg-[#5dc0fd] text-white font-black uppercase italic p-4 rounded-xl"
        >
          Postar
        </button>
      </form>
      <div className="grid gap-2">
        {newsList.map((n) => (
          <div
            key={n.id}
            className="bg-white border-2 border-slate-50 p-3 rounded-xl flex justify-between items-center"
          >
            <p className="font-black text-slate-700 uppercase italic text-[10px] truncate pr-4">
              {n.title}
            </p>
            <button
              onClick={async () => {
                if (confirm("Apagar?")) {
                  await supabase!.from("news").delete().eq("id", n.id);
                  load();
                }
              }}
              className="text-slate-300 hover:text-red-500 font-black text-[10px] uppercase shrink-0"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- UI COMPONENTS ---

function TabBtn({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: any;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 md:w-full text-left p-3 md:p-5 rounded-xl md:rounded-3xl font-black italic uppercase text-[9px] md:text-[10px] transition-all flex items-center gap-2 md:gap-4 ${
        active
          ? "bg-[#5dc0fd] text-white shadow-lg md:shadow-xl"
          : "text-slate-400 hover:bg-slate-100"
      }`}
    >
      <svg
        className="w-4 h-4 md:w-5 md:h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        {icon}
      </svg>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function InputItem({
  label,
  val,
  set,
}: {
  label: string;
  val: string;
  set: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[9px] font-black text-slate-400 uppercase ml-2">
        {label}
      </label>
      <input
        required
        value={val}
        onChange={(e) => set(e.target.value)}
        className="bg-white border-2 border-slate-200 rounded-xl p-3 md:p-4 font-black text-slate-700 text-xs md:text-sm outline-none focus:border-[#5dc0fd] transition-all"
      />
    </div>
  );
}
