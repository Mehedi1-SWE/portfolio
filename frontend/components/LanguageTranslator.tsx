"use client";

import { useEffect } from "react";

type Language = "EN" | "PT" | "FR";

const translations: Record<Language, Record<string, string>> = {
  EN: {},
  PT: {
    "Home": "Início", "About": "Sobre", "Academic": "Acadêmico", "Research": "Pesquisa", "Experience": "Experiência", "Projects": "Projetos", "Skills": "Competências", "Contact": "Contato",
    "Hello, I'm": "Olá, eu sou", "Full-Stack Software Engineer": "Engenheiro de Software Full-Stack", "building modern web applications with Next.js, React and Node.js.": "desenvolvendo aplicações web modernas com Next.js, React e Node.js.",
    "Computer Science graduate focused on full-stack web development, building responsive interfaces, backend APIs and practical software solutions.": "Graduado em Ciência da Computação, com foco em desenvolvimento web full-stack, criação de interfaces responsivas, APIs de backend e soluções práticas de software.",
    "Professional CV": "Currículo profissional", "Academic CV": "Currículo acadêmico", "Europass CV": "Currículo Europass", "Explore academic profile": "Explorar perfil acadêmico",
    "Academic & Professional": "Acadêmico e profissional", "Software Engineer": "Engenheiro de Software", "Full-Stack Development": "Desenvolvimento Full-Stack",
    "Education": "Formação", "Focus": "Foco", "Engineering + Research": "Engenharia + Pesquisa", "Academic credibility meets practical software engineering.": "Credibilidade acadêmica aliada à engenharia de software prática.",
    "Software engineering.": "Engenharia de software.", "Built on a strong foundation.": "Construída sobre uma base sólida.",
    "I combine my Computer Science background with hands-on full-stack development. I turn project requirements into responsive interfaces, reliable APIs and practical software solutions.": "Combino minha formação em Ciência da Computação com experiência prática em desenvolvimento full-stack. Transformo requisitos de projetos em interfaces responsivas, APIs confiáveis e soluções práticas de software.",
    "This portfolio showcases my education, research interests, projects and professional experience for employers, university admissions teams and potential collaborators.": "Este portfólio apresenta minha formação, interesses de pesquisa, projetos e experiência profissional para empregadores, equipes de admissão universitária e possíveis colaboradores.",
    "Technical skills": "Competências técnicas", "Tools of the ": "Ferramentas de ", "trade.": "trabalho.",
    "Technologies, tools and engineering practices I use to develop modern web applications.": "Tecnologias, ferramentas e práticas de engenharia que utilizo para desenvolver aplicações web modernas.",
    "Frontend Development": "Desenvolvimento Front-end", "Backend Development": "Desenvolvimento Back-end", "Data & Cloud": "Dados e Nuvem", "Engineering & DevOps": "Engenharia e DevOps",
    "Practical stack · engineering fundamentals · production-ready workflows": "Stack prática · fundamentos de engenharia · fluxos prontos para produção",
    "Let's work ": "Vamos trabalhar ", "together.": "juntos.", "I'm open to software engineering opportunities, academic collaborations and research discussions.": "Estou aberto a oportunidades em engenharia de software, colaborações acadêmicas e discussões de pesquisa.",
    "Email me": "Envie um e-mail", "Your name": "Seu nome", "Enter your name": "Digite seu nome", "Email address": "Endereço de e-mail", "Subject": "Assunto", "What would you like to discuss?": "O que você gostaria de discutir?", "Message": "Mensagem", "Write your message here...": "Escreva sua mensagem aqui...", "Sending...": "Enviando...", "Send message": "Enviar mensagem",
    "Your message has been sent successfully. Thank you for reaching out!": "Sua mensagem foi enviada com sucesso. Obrigado pelo contato!", "Contact service is not configured yet. Please try again later.": "O serviço de contato ainda não está configurado. Tente novamente mais tarde.", "Unable to send your message right now.": "Não foi possível enviar sua mensagem agora.", "Unable to send your message right now. Please try again.": "Não foi possível enviar sua mensagem agora. Tente novamente.",
    "Software Engineering · Academic · Research": "Engenharia de Software · Acadêmico · Pesquisa",
    "Services": "Serviços", "How I Can Help": "Como posso ajudar", "Testimonials": "Depoimentos", "Professional feedback": "Feedback profissional", "Comments from people who have worked with me.": "Comentários de pessoas que trabalharam comigo."
  },
  FR: {
    "Home": "Accueil", "About": "À propos", "Academic": "Académique", "Research": "Recherche", "Experience": "Expérience", "Projects": "Projets", "Skills": "Compétences", "Contact": "Contact",
    "Hello, I'm": "Bonjour, je suis", "Full-Stack Software Engineer": "Ingénieur logiciel Full-Stack", "building modern web applications with Next.js, React and Node.js.": "créant des applications web modernes avec Next.js, React et Node.js.",
    "Computer Science graduate focused on full-stack web development, building responsive interfaces, backend APIs and practical software solutions.": "Diplômé en informatique, spécialisé dans le développement web full-stack, la création d’interfaces adaptatives, d’API backend et de solutions logicielles pratiques.",
    "Professional CV": "CV professionnel", "Academic CV": "CV académique", "Europass CV": "CV Europass", "Explore academic profile": "Découvrir le profil académique",
    "Academic & Professional": "Académique et professionnel", "Software Engineer": "Ingénieur logiciel", "Full-Stack Development": "Développement Full-Stack",
    "Education": "Formation", "Focus": "Domaine", "Engineering + Research": "Ingénierie + Recherche", "Academic credibility meets practical software engineering.": "La crédibilité académique rencontre l’ingénierie logicielle pratique.",
    "Software engineering.": "Ingénierie logicielle.", "Built on a strong foundation.": "Reposant sur des bases solides.",
    "I combine my Computer Science background with hands-on full-stack development. I turn project requirements into responsive interfaces, reliable APIs and practical software solutions.": "J’associe ma formation en informatique à une expérience pratique du développement full-stack. Je transforme les exigences des projets en interfaces adaptatives, API fiables et solutions logicielles concrètes.",
    "This portfolio showcases my education, research interests, projects and professional experience for employers, university admissions teams and potential collaborators.": "Ce portfolio présente ma formation, mes intérêts de recherche, mes projets et mon expérience professionnelle aux employeurs, aux équipes d’admission universitaire et aux collaborateurs potentiels.",
    "Technical skills": "Compétences techniques", "Tools of the ": "Les outils du ", "trade.": "métier.",
    "Technologies, tools and engineering practices I use to develop modern web applications.": "Technologies, outils et pratiques d’ingénierie que j’utilise pour développer des applications web modernes.",
    "Frontend Development": "Développement Front-end", "Backend Development": "Développement Back-end", "Data & Cloud": "Données et Cloud", "Engineering & DevOps": "Ingénierie et DevOps",
    "Practical stack · engineering fundamentals · production-ready workflows": "Stack pratique · fondamentaux de l’ingénierie · processus prêts pour la production",
    "Let's work ": "Travaillons ", "together.": "ensemble.", "I'm open to software engineering opportunities, academic collaborations and research discussions.": "Je suis ouvert aux opportunités en ingénierie logicielle, aux collaborations académiques et aux échanges autour de la recherche.",
    "Email me": "M’envoyer un e-mail", "Your name": "Votre nom", "Enter your name": "Saisissez votre nom", "Email address": "Adresse e-mail", "Subject": "Sujet", "What would you like to discuss?": "De quoi souhaitez-vous discuter ?", "Message": "Message", "Write your message here...": "Écrivez votre message ici...", "Sending...": "Envoi en cours…", "Send message": "Envoyer le message",
    "Your message has been sent successfully. Thank you for reaching out!": "Votre message a été envoyé avec succès. Merci de m’avoir contacté !", "Contact service is not configured yet. Please try again later.": "Le service de contact n’est pas encore configuré. Veuillez réessayer plus tard.", "Unable to send your message right now.": "Impossible d’envoyer votre message pour le moment.", "Unable to send your message right now. Please try again.": "Impossible d’envoyer votre message pour le moment. Veuillez réessayer.",
    "Software Engineering · Academic · Research": "Ingénierie logicielle · Académique · Recherche",
    "Services": "Services", "How I Can Help": "Comment je peux vous aider", "Testimonials": "Témoignages", "Professional feedback": "Retours professionnels", "Comments from people who have worked with me.": "Commentaires de personnes ayant travaillé avec moi."
  }
};

function translateDocument(language: Language) {
  const dictionary = translations[language];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    const original = node.textContent ?? "";
    const trimmed = original.trim();
    if (!trimmed) return;
    const translated = dictionary[trimmed];
    if (translated) node.textContent = original.replace(trimmed, translated);
  });

  document.querySelectorAll<HTMLElement>("[placeholder], [aria-label], [title]").forEach((element) => {
    ["placeholder", "aria-label", "title"].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (value && dictionary[value]) element.setAttribute(attribute, dictionary[value]);
    });
  });
}

export function LanguageTranslator() {
  useEffect(() => {
    const readLanguage = () => (localStorage.getItem("portfolio-language") as Language) || "EN";
    let language = readLanguage();
    translateDocument(language);
    const observer = new MutationObserver(() => translateDocument(language));
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    const onLanguageChange = (event: Event) => {
      language = (event as CustomEvent<Language>).detail || readLanguage();
      translateDocument(language);
    };
    window.addEventListener("portfolio-language-change", onLanguageChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("portfolio-language-change", onLanguageChange);
    };
  }, []);
  return null;
}
