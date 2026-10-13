import { createFileRoute } from '@tanstack/react-router';
import { useState, type MouseEvent } from 'react';
import { ArrowRight, BadgeCheck, ChevronDown, ChevronUp, CircleCheck, FileCheck2, LockKeyhole, Menu, Percent, ShieldCheck, Smartphone, Wallet, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/clt-hero.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Meliconsig | Empréstimo CLT para seus próximos passos' },
    { name: 'description', content: 'Conheça o empréstimo CLT da Meliconsig. Entenda o desconto em folha, explore uma simulação ilustrativa e planeje seus próximos passos.' },
    { property: 'og:title', content: 'Meliconsig | Empréstimo CLT' },
    { property: 'og:description', content: 'Crédito para quem trabalha de carteira assinada. Mais clareza para planejar seus próximos passos.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

// Each visitor is randomly assigned one of these numbers on their first click and keeps it for the rest of the visit.
const whatsappNumbers = ['5511950494335', '5511979792222'];
let assignedWhatsappNumber: string | undefined;
const pickWhatsappNumber = () => (assignedWhatsappNumber ??= whatsappNumbers[Math.floor(Math.random() * whatsappNumbers.length)]);
const whatsappUrl = (number: string, message: string) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
const whatsappHref = (message: string) => ({
  href: whatsappUrl(whatsappNumbers[0], message),
  target: '_blank',
  rel: 'noopener noreferrer',
  // The href is swapped at click time so server and client render the same markup.
  onClick: (event: MouseEvent<HTMLAnchorElement>) => { event.currentTarget.href = whatsappUrl(pickWhatsappNumber(), message); },
});
const whatsappLink = whatsappHref('Quero contratar o Empréstimo para CLT');
const whatsappSupportLink = whatsappHref('Quero falar com um atendente');
const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const benefits = [
  { icon: Percent, title: 'Seu salário abre possibilidades', text: 'O desconto em folha pode trazer condições mais competitivas que o crédito pessoal.' },
  { icon: Wallet, title: 'Parcelas sem surpresas', text: 'O valor é definido no contrato e descontado diretamente na sua folha de pagamento.' },
  { icon: Smartphone, title: 'Menos burocracia', text: 'Uma modalidade pensada para quem trabalha com carteira assinada, sem convênio da empresa.' },
  { icon: ShieldCheck, title: 'Clareza em cada etapa', text: 'Compare juros, parcelas e o custo total antes de tomar a sua decisão.' },
];
const faqs = [
  { q: 'O que é o empréstimo CLT?', a: 'É uma modalidade de crédito consignado para trabalhadores com carteira assinada. As parcelas são descontadas diretamente na folha de pagamento, conforme as condições do contrato.' },
  { q: 'Quem pode solicitar o Crédito do Trabalhador?', a: 'Trabalhadores com vínculo CLT ativo, incluindo empregados domésticos e rurais, podem ser elegíveis. A contratação depende da margem consignável disponível, das regras da modalidade e da análise da instituição financeira.' },
  { q: 'Minha empresa precisa ter convênio?', a: 'No Crédito do Trabalhador, a empresa não precisa ter um convênio específico com o banco. A modalidade utiliza as informações do vínculo de trabalho registradas no eSocial.' },
  { q: 'Quanto do meu salário pode ser comprometido?', a: 'A parcela deve respeitar a margem consignável de até 35% da remuneração disponível, conforme as regras do programa. O valor aprovado depende da margem calculada e da análise de crédito.' },
  { q: 'O que acontece se eu sair do emprego?', a: 'A dívida não deixa de existir. O pagamento do saldo e o uso de eventuais garantias seguem as condições do contrato e a legislação aplicável. Leia essas condições antes de contratar.' },
  { q: 'A simulação já é uma oferta de empréstimo?', a: 'Não. Esta página apresenta apenas um exemplo matemático com taxa hipotética. Ela não consulta seu vínculo de trabalho, não analisa crédito e não realiza contratação. Taxas, prazos, CET e condições reais devem ser informados em uma proposta da instituição financeira.' },
];

function Logo() {
  return <a href="#inicio" className="logo" aria-label="Meliconsig, início"><svg className="logo-symbol" viewBox="0 0 48 48" aria-hidden="true"><path d="M3 41 19 6h10l16 35H34L24 17 14 41Z"/><path d="M17 32h14v9H17Z"/></svg><span className="logo-name">Meliconsig</span></a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [amount, setAmount] = useState(10000);
  const [months, setMonths] = useState(24);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const rate = 0.025;
  const payment = amount * rate / (1 - Math.pow(1 + rate, -months));
  return <>
    <header className="site-header"><div className="container-acme header-inner"><Logo /><nav aria-label="Navegação principal" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
      <a href="#vantagens" onClick={() => setMenuOpen(false)}>Por que a Meliconsig?</a><a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a><a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas frequentes</a>
    </nav><div className="header-actions"><Button variant="brand" className="header-cta" asChild><a {...whatsappLink}>Simular empréstimo <ArrowRight /></a></Button><Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div></div></header>
    <main id="inicio">
      <section className="hero" aria-labelledby="hero-title"><img src={heroImage} alt="Trabalhadora de camisa azul sorrindo ao consultar seu celular em casa" width={1920} height={1024} className="hero-image" fetchPriority="high" /><div className="hero-shade" /><div className="container-acme hero-content">
        <div className="eyebrow"><BadgeCheck size={14} /> Crédito para quem trabalha de carteira assinada</div>
        <h1 id="hero-title">Empréstimo CLT.<span>Seu próximo passo<br />começa aqui.</span></h1>
        <p className="hero-copy">Você trabalha pelos seus sonhos.<br />A Meliconsig acredita nos seus próximos passos. Conheça o crédito com desconto em folha.</p>
        <Button variant="hero" size="cta" asChild><a {...whatsappLink}>Quero simular meu empréstimo <ArrowRight /></a></Button>
        <div className="hero-reassurance"><LockKeyhole /> Sem compromisso. Sem informar dados pessoais.</div>
        <div className="hero-stamp"><div className="stamp-icon"><ShieldCheck size={24} /></div><div><strong>Seu planejamento em primeiro lugar</strong><p>Transparência para decidir com confiança.</p></div></div>
      </div></section>
      <div className="trust-strip"><div className="container-acme trust-inner">{[
        { icon: Smartphone, title: 'Simulação online', text: 'No seu tempo, de onde estiver' },
        { icon: FileCheck2, title: 'Desconto em folha', text: 'Mais praticidade para o seu dia a dia' },
        { icon: ShieldCheck, title: 'Decisão consciente', text: 'Entenda as condições antes de contratar' },
      ].map(item => <div className="trust-item" key={item.title}><item.icon /><div><strong>{item.title}</strong><p>{item.text}</p></div></div>)}</div></div>
      <section id="vantagens" className="section-space container-acme"><div className="section-heading"><div className="eyebrow">Mais possibilidades, menos complicação</div><h2>Você cuida do futuro.<br /><span>A gente aproxima as possibilidades.</span></h2><p>Conheça as vantagens do crédito para quem tem carteira assinada.</p></div><div className="benefits-grid">{benefits.map(item => <article className="benefit" key={item.title}><div className="benefit-icon"><item.icon /></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
      <section id="simular" className="simulator-band section-space"><div className="container-acme simulator-layout"><div className="simulator-intro"><div className="eyebrow">O primeiro passo é planejar</div><h2>Quanto você precisa para seguir em frente?</h2><p>Explore valores e prazos para entender como uma parcela pode se encaixar no seu planejamento.</p><div className="check-list"><div><CircleCheck /> Você escolhe o valor e o prazo</div><div><CircleCheck /> Veja a estimativa na hora</div><div><CircleCheck /> Sem preencher seus dados pessoais</div></div></div><div className="simulator"><h3>Vamos fazer uma simulação?</h3><p className="simulator-subtitle">Uma estimativa para começar seu planejamento.</p><label htmlFor="amount" className="simulator-label">De quanto você precisa?<strong>{money(amount)}</strong></label><input id="amount" className="amount-slider" type="range" min="1000" max="30000" step="500" value={amount} onChange={e => setAmount(Number(e.target.value))} aria-valuetext={money(amount)} /><div className="range-labels"><span>R$ 1.000</span><span>R$ 30.000</span></div><label htmlFor="months" className="simulator-label">Em quantas parcelas?</label><select id="months" className="term-select" value={months} onChange={e => setMonths(Number(e.target.value))}>{[12,24,36,48].map(term => <option value={term} key={term}>{term} parcelas</option>)}</select><div className="estimate" aria-live="polite"><span>Parcela ilustrativa</span><strong>{money(payment)}</strong></div><p className="simulator-note">Exemplo com juros hipotéticos de 2,5% ao mês, sem IOF ou outros custos. Não é uma oferta de crédito. Condições reais e CET dependem de análise.</p><Button variant="brand" size="cta" className="simulator-action" asChild><a {...whatsappLink}>Ver minha simulação <ArrowRight /></a></Button></div></div></section>
      <section id="como-funciona" className="container-acme section-space"><div className="section-heading"><div className="eyebrow">Simples de entender</div><h2>Seu crédito, <span>um passo de cada vez.</span></h2><p>Saiba o que considerar antes de contratar seu empréstimo CLT.</p></div><div className="steps-grid">{[
        { title: 'Comece pela simulação', text: 'Escolha um valor e um prazo. Pense na parcela que faz sentido para o seu orçamento.' },
        { title: 'Compare as condições', text: 'Em uma proposta real, confira juros, CET, prazo e margem disponível antes de decidir.' },
        { title: 'Contrate com consciência', text: 'Após a análise e a assinatura do contrato, as parcelas são descontadas em folha.' },
      ].map((step,i) => <div className="step" key={step.title}><span className="step-number">0{i+1}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div><div className="steps-cta"><Button variant="brand" size="cta" asChild><a {...whatsappLink}>Dar o primeiro passo <ArrowRight /></a></Button></div></section>
      <section className="safety-band"><div className="container-acme safety-inner"><ShieldCheck /><div><h3>Crédito responsável. Tranquilidade de verdade.</h3><p>Nunca faça depósitos antecipados para liberar um empréstimo. Antes de contratar, confira o custo total e preserve seu orçamento.</p></div></div></section>
      <section id="duvidas" className="container-acme section-space faq-layout"><div className="faq-intro"><div className="eyebrow">Pode perguntar</div><h2>Menos dúvidas.<br />Mais confiança.</h2><p>As respostas que você precisa para conhecer o empréstimo CLT.</p></div><div>{faqs.map((faq,i) => <div className="faq-item" key={faq.q}><Button variant="ghost" className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} aria-controls={`faq-${i}`}>{faq.q}{openFaq === i ? <ChevronUp /> : <ChevronDown />}</Button>{openFaq === i && <p id={`faq-${i}`} className="faq-answer">{faq.a}</p>}</div>)}</div></section>
    </main>
    <footer className="site-footer"><div className="container-acme"><div className="footer-top"><Logo /><p>Crédito para quem constrói o amanhã.</p></div><div className="footer-bottom"><p>A simulação apresentada é exclusivamente ilustrativa e não constitui oferta, aprovação ou contratação de crédito. A contratação está sujeita à elegibilidade, à margem consignável e à análise da instituição financeira. Avalie o Custo Efetivo Total (CET) e todas as condições antes de contratar.</p><p className="copyright">© {new Date().getFullYear()} Meliconsig. Todos os direitos reservados.</p></div></div></footer>
    <Button variant="whatsapp" size="icon" className="whatsapp-float" asChild><a {...whatsappSupportLink} aria-label="Fale com a Meliconsig pelo WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg></a></Button>
  </>;
}
