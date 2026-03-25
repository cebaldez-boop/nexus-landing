'use client';

import React, { useState } from 'react';

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_NEXUS_FORM_ENDPOINT || '';

const Section = ({
  children,
  className = '',
  id = '',
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section
    id={id}
    className={`py-24 px-6 md:px-12 lg:px-24 w-full flex justify-center ${className}`}
  >
    <div className="max-w-7xl w-full">{children}</div>
  </section>
);

const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-16 max-w-3xl">
    <h2 className="text-3xl md:text-4xl font-semibold text-nexus-text-primary tracking-tight mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-nexus-text-secondary leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

const KpiHighlight = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col p-6 bg-nexus-surface-base border border-nexus-border-subtle rounded-lg shadow-elevation-1">
    <span className="text-4xl font-bold text-nexus-accent-primary mb-2">
      {value}
    </span>
    <span className="text-nexus-text-secondary text-sm font-medium leading-snug">
      {label}
    </span>
  </div>
);

const ModuleCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="p-6 bg-nexus-surface-base border border-nexus-border-subtle rounded-lg">
    <h4 className="text-lg font-semibold text-nexus-text-primary mb-2 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-nexus-accent-primary"></span>
      {title}
    </h4>
    <p className="text-nexus-text-secondary text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const TestimonialCard = ({ quote }: { quote: string }) => (
  <div className="p-8 bg-nexus-surface-elevated border border-nexus-border-subtle rounded-lg relative">
    <span className="text-4xl text-nexus-border-subtle absolute top-4 left-4 font-serif">
      &ldquo;
    </span>
    <p className="text-nexus-text-primary relative z-10 italic leading-relaxed">
      &ldquo;{quote}&rdquo;
    </p>
  </div>
);

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <details className="group border-b border-nexus-border-subtle pb-4">
    <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-nexus-text-primary text-lg hover:text-nexus-accent-primary transition-colors">
      <span>{question}</span>
      <span className="transition group-open:rotate-180">
        <svg
          fill="none"
          height="24"
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </span>
    </summary>
    <p className="text-nexus-text-secondary mt-4 leading-relaxed">{answer}</p>
  </details>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start text-nexus-text-secondary">
        <svg
          className="w-5 h-5 text-nexus-accent-primary mr-3 mt-0.5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default function NexusLandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const scrollToForm = () => {
    document
      .getElementById('diagnóstico-form')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    const formData = new FormData(e.currentTarget);
    const payload = {
      timestamp: new Date().toISOString(),
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      role: formData.get('role'),
      volume: formData.get('volume'),
      description: formData.get('description'),
    };
    if (!FORM_ENDPOINT) {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      }, 1500);
      return;
    }
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setErrorMessage('Não foi possível enviar agora. Tente novamente.');
      }
    } catch (_error) {
      setErrorMessage('Não foi possível enviar agora. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-nexus-bg font-sans text-nexus-text-primary">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24 w-full flex justify-center border-b border-nexus-border-subtle overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-nexus-accent-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
              Assuma o controle da sua infraestrutura de{' '}
              <span className="text-nexus-accent-primary">IA</span> em produção.
            </h1>
            <p className="text-lg md:text-xl text-nexus-text-secondary leading-relaxed mb-10 max-w-xl">
              NEXUS é a camada de orquestração que unifica agentes, canais e
              sistemas corporativos em uma arquitetura escalável, observável e
              estável.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-nexus-accent-primary text-[#0A0C10] font-semibold rounded-md hover:bg-[#00CCCC] transition-colors text-center"
              >
                Agendar diagnóstico com especialista
              </button>
              <button className="px-8 py-4 bg-transparent border border-nexus-border-subtle text-nexus-text-primary font-medium rounded-md hover:bg-nexus-surface-base transition-colors text-center">
                Ver arquitetura em 3 minutos
              </button>
            </div>
            <div className="flex items-center gap-4 border-t border-nexus-border-subtle pt-6 w-full max-w-md">
              <p className="text-sm text-nexus-text-secondary">
                Utilizado por operações de alta complexidade que não podem
                parar.
              </p>
            </div>
          </div>
          <div className="w-full h-full min-h-[400px] bg-nexus-surface-base border border-nexus-border-subtle rounded-xl shadow-elevation-1 p-6 flex flex-col gap-6 hidden lg:flex">
            <div className="flex items-center justify-between border-b border-nexus-border-subtle pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-nexus-status-error"></div>
                <div className="w-3 h-3 rounded-full bg-nexus-status-warning"></div>
                <div className="w-3 h-3 rounded-full bg-nexus-status-success"></div>
              </div>
              <div className="h-4 w-24 bg-nexus-surface-elevated rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-nexus-surface-elevated rounded-md border border-nexus-border-subtle p-3 flex flex-col justify-between">
                <div className="h-2 w-16 bg-nexus-border-subtle rounded"></div>
                <div className="h-6 w-20 bg-nexus-text-primary rounded"></div>
              </div>
              <div className="h-20 bg-nexus-surface-elevated rounded-md border border-nexus-border-subtle p-3 flex flex-col justify-between">
                <div className="h-2 w-16 bg-nexus-border-subtle rounded"></div>
                <div className="h-6 w-20 bg-nexus-accent-primary rounded"></div>
              </div>
            </div>
            <div className="flex-1 bg-nexus-surface-elevated rounded-md border border-nexus-border-subtle p-4 flex flex-col gap-3">
              <div className="h-3 w-32 bg-nexus-border-subtle rounded mb-2"></div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-24 bg-nexus-surface-base rounded border border-nexus-accent-primary"></div>
                <div className="flex-1 h-[1px] bg-nexus-border-subtle"></div>
                <div className="h-10 w-24 bg-nexus-surface-base rounded border border-nexus-border-subtle"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema */}
      <Section className="bg-nexus-bg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <SectionTitle
              title="O problema hoje"
              subtitle="A promessa da IA esbarra na realidade da infraestrutura quebrada."
            />
          </div>
          <div className="pt-2 md:pt-4">
            <BulletList
              items={[
                'Múltiplas ferramentas fragmentadas criando silos de dados inoperáveis.',
                'Fluxos quebrando em produção sem alerta claro nem rastreio.',
                'Zero visibilidade sobre interações, latência e custo por requisição.',
                'Engenharia gastando tempo apagando incêndio em integração instável.',
              ]}
            />
          </div>
        </div>
      </Section>

      {/* Solucao */}
      <Section className="bg-nexus-surface-base border-y border-nexus-border-subtle">
        <SectionTitle
          title="O que NEXUS faz"
          subtitle="A fundação invisível para operações maduras de IA."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <BulletList
            items={[
              'Orquestra agentes de IA em múltiplos canais a partir de um único núcleo de controle.',
              'Centraliza monitoramento com métricas de performance e saúde em tempo real.',
              'Dá visão visual de fluxos complexos com fallback automático e roteamento inteligente.',
              'Garante governança com logs consolidados e controle de acesso granular.',
            ]}
          />
          <div className="grid gap-4">
            <ModuleCard
              title="NEXUS Voice"
              description="Voz neural plugada direto em fluxos críticos de atendimento e transação."
            />
            <ModuleCard
              title="NEXUS Chat"
              description="Conversas transacionais assíncronas com contexto persistente em escala."
            />
            <ModuleCard
              title="NEXUS Connect"
              description="Barramento que liga seus modelos de IA aos sistemas legados sem gambiarra."
            />
          </div>
        </div>
      </Section>

      {/* Resultados */}
      <Section className="bg-nexus-bg">
        <SectionTitle title="Resultados em números" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
Tráfego fim            value="99,9%"
            label="de uptime em fluxos críticos de missão."
Tráfego fim          <KpiHighlight
            value="60%"
            label="menos incidentes de integração em produção."
          />
          <KpiHighlight
            value="40%"
            label="mais rápido para colocar novos agentes em produção."
          />
          <KpiHighlight
            value="85%"
            label="de visibilidade de custos por transação e por modelo."
          />
        </div>
      </Section>

      {/* Depoimentos */}
      <Section className="bg-nexus-surface-base border-y border-nexus-border-subtle">
        <SectionTitle title="O que dizem as operações que rodam na NEXUS" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard quote="Consolidamos cinco ferramentas em uma só camada de controle. A estabilidade subiu para um nível que parecia impossível." />
          <TestimonialCard quote="Hoje sabemos exatamente o que cada agente faz, quanto custa e onde o gargalo está. O ponto cego de observabilidade deixou de existir." />
          <TestimonialCard quote="Um fluxo complexo levava semanas para ir à produção. Com o motor de orquestração, isso virou questão de dias." />
        </div>
      </Section>

      {/* Formulario */}
      <Section id="diagnóstico-form" className="bg-nexus-bg scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-nexus-text-primary tracking-tight mb-4">
              Diagnóstico de Infra IA focado no seu stack
            </h2>
            <p className="text-lg text-nexus-text-secondary leading-relaxed">
              Uma call técnica direta para mapear seus fluxos atuais,
              identificar riscos e projetar ganhos.
            </p>
          </div>
          <div className="bg-nexus-surface-base border border-nexus-border-subtle rounded-xl shadow-elevation-1 p-6 md:p-10">
            {errorMessage && (
              <div className="mb-6 p-4 bg-nexus-status-error/10 border border-nexus-status-error text-nexus-status-error rounded-md text-sm font-medium">
                {errorMessage}
              </div>
            )}
            {isSuccess ? (
              <div className="bg-nexus-status-success/10 border border-nexus-status-success text-nexus-status-success p-6 rounded-md text-center">
                <p className="font-semibold text-lg mb-2">Recebido.</p>
                <p>
                  Nosso time vai responder em até 1 dia útil com a proposta de
                  agenda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-nexus-text-primary"
                    >
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="bg-nexus-bg border border-nexus-border-subtle rounded-md px-4 py-3 text-nexus-text-primary focus:outline-none focus:border-nexus-accent-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-nexus-text-primary"
                    >
                      E-mail corporativo *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="bg-nexus-bg border border-nexus-border-subtle rounded-md px-4 py-3 text-nexus-text-primary focus:outline-none focus:border-nexus-accent-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="company"
                      className="text-sm font-medium text-nexus-text-primary"
                    >
                      Empresa *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      className="bg-nexus-bg border border-nexus-border-subtle rounded-md px-4 py-3 text-nexus-text-primary focus:outline-none focus:border-nexus-accent-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="role"
                      className="text-sm font-medium text-nexus-text-primary"
                    >
                      Cargo/função *
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      required
                      className="bg-nexus-bg border border-nexus-border-subtle rounded-md px-4 py-3 text-nexus-text-primary focus:outline-none focus:border-nexus-accent-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="volume"
                    className="text-sm font-medium text-nexus-text-primary"
                  >
                    Volume aproximado de requisições mensais *
                  </label>
                  <select
                    id="volume"
                    name="volume"
                    required
                    defaultValue=""
                    className="bg-nexus-bg border border-nexus-border-subtle rounded-md px-4 py-3 text-nexus-text-secondary focus:outline-none focus:border-nexus-accent-primary transition-colors"
                  >
                    <option value="" disabled>
                      Selecione uma faixa
                    </option>
                    <option value="ate-10k">Até 10.000 requisições</option>
                    <option value="10k-100k">
                      10.000 a 100.000 requisições
                    </option>
                    <option value="100k-1m">
                      100.000 a 1 Milhão de requisições
                    </option>
                    <option value="mais-1m">+1 Milhão de requisições</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-nexus-text-primary"
                  >
                    Descreva onde sua operação está quebrando (Opcional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="bg-nexus-bg border border-nexus-border-subtle rounded-md px-4 py-3 text-nexus-text-primary focus:outline-none focus:border-nexus-accent-primary transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="mt-4 w-full py-4 bg-nexus-accent-primary text-[#0A0C10] font-bold text-lg rounded-md hover:bg-[#00CCCC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? 'Enviando...'
                    : 'Quero o diagnóstico da minha infra'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-nexus-surface-base border-t border-nexus-border-subtle">
        <div className="max-w-3xl mx-auto">
          <SectionTitle
            title="FAQ"
            subtitle="Perguntas frequentes sobre implementação e arquitetura."
          />
          <div className="space-y-6">
            <FaqItem
              question="Funciona com o stack que já tenho hoje?"
              answer="Sim. NEXUS é agnóstico de stack. Acopla na sua infra atual sem reescrever legado ou trocar banco."
            />
            <FaqItem
              question="Preciso trocar meus modelos de IA?"
              answer="Não. Você usa seus próprios modelos e/ou os principais provedores via uma interface única de orquestração."
            />
            <FaqItem
              question="Quanto tempo leva para subir o primeiro fluxo?"
              answer="Em média, de 3 a 7 dias, dependendo da complexidade de regras e integrações."
            />
            <FaqItem
              question="Quem opera isso: técnico ou negócio?"
              answer="Engenharia faz o setup e integrações. Depois, operações/produto ajustam fluxos e regras pela interface visual."
            />
            <FaqItem
              question="Como fica segurança e privacidade dos dados?"
              answer="Tráfego fim a fim criptografado. Dados transacionais não entram em treino externo sem configuração explícita."
            />
          </div>
        </div>
      </Section>

      {/* Fechamento */}
      <Section className="bg-nexus-surface-elevated border-t border-nexus-border-subtle text-center pb-32">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-nexus-text-primary tracking-tight mb-8 leading-tight">
            Sua <span className="text-nexus-accent-primary">IA</span> já está em
            produção.
            <br />A diferença é ter ou não ter uma infraestrutura sob controle.
          </h2>
          <button
            onClick={scrollToForm}
            className="px-10 py-5 bg-nexus-accent-primary text-[#0A0C10] font-bold text-lg rounded-md hover:bg-[#00CCCC] transition-colors shadow-[0_0_20px_rgba(0,230,230,0.3)]"
          >
            Agendar diagnóstico com especialista
          </button>
        </div>
      </Section>
    </div>
  );
}
