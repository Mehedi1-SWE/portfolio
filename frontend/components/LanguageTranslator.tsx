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
        "Academic profile": "Perfil acadêmico", "Explore my Computer Science degree, selected academic projects and relevant coursework.": "Conheça minha graduação em Ciência da Computação, projetos acadêmicos selecionados e disciplinas relevantes.", "Academic Project": "Projeto acadêmico", "Outcome": "Resultado", "Coursework": "Disciplinas", "Career & education": "Carreira e formação", "Professional projects": "Projetos profissionais", "Featured project": "Projeto em destaque", "Professional project": "Projeto profissional", "Live Demo": "Demonstração", "Data Structures & Algorithms": "Estruturas de Dados e Algoritmos", "Database Management": "Gerenciamento de Banco de Dados", "Applied Machine Learning": "Aprendizado de Máquina Aplicado", "AI-assisted Software Engineering": "Engenharia de Software Assistida por IA", "Intelligent Web Applications": "Aplicações Web Inteligentes", "Software Quality & Testing": "Qualidade e Testes de Software", "MERN Stack Developer Intern": "Estagiário de Desenvolvimento MERN Stack", "Tools of the": "Ferramentas de", "trade.": "trabalho.", "Areas of": "Áreas de", "interest.": "interesse.", "My professional": "Minha trajetória", "journey.": "profissional.", "A selection of my": "Uma seleção dos meus", "work.": "trabalhos.", "PRESENT": "ATUAL", "Featured project": "Projeto em destaque", "Academic Project": "Projeto acadêmico", "Academic project": "Projeto acadêmico", "Outcome": "Resultado", "Coursework": "Disciplinas", "Artificial Intelligence / Machine Learning": "Inteligência Artificial / Aprendizado de Máquina", "Web Engineering / Full-Stack Development": "Engenharia Web / Desenvolvimento Full-Stack", "Dental Disease Prediction System": "Sistema de Previsão de Doenças Dentárias", "E-Commerce Web Application": "Aplicação Web de Comércio Eletrônico", "Applied Machine Learning": "Aprendizado de Máquina Aplicado", "AI-assisted Software Engineering": "Engenharia de Software Assistida por IA",
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
        "Academic profile": "Profil académique", "Explore my Computer Science degree, selected academic projects and relevant coursework.": "Découvrez mon diplôme en informatique, des projets académiques sélectionnés et les cours pertinents.", "Academic Project": "Projet académique", "Outcome": "Résultat", "Coursework": "Cours", "Career & education": "Carrière et formation", "Professional projects": "Projets professionnels", "Featured project": "Projet à la une", "Professional project": "Projet professionnel", "Live Demo": "Démo en direct", "Data Structures & Algorithms": "Structures de données et algorithmes", "Database Management": "Gestion de bases de données", "Applied Machine Learning": "Apprentissage automatique appliqué", "AI-assisted Software Engineering": "Ingénierie logicielle assistée par IA", "Intelligent Web Applications": "Applications Web intelligentes", "Software Quality & Testing": "Qualité logicielle et tests", "MERN Stack Developer Intern": "Stagiaire développeur MERN Stack", "Tools of the": "Les outils du", "trade.": "métier.", "Areas of": "Domaines d’", "interest.": "intérêt.", "My professional": "Mon parcours", "journey.": "professionnel.", "A selection of my": "Une sélection de mes", "work.": "travaux.", "PRESENT": "EN COURS", "Academic project": "Projet académique", "Artificial Intelligence / Machine Learning": "Intelligence artificielle / Apprentissage automatique", "Web Engineering / Full-Stack Development": "Ingénierie Web / Développement Full-Stack", "Dental Disease Prediction System": "Système de prédiction des maladies dentaires", "E-Commerce Web Application": "Application Web de commerce électronique"
  }
};

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

function translateDocument(language: Language) {
  document.documentElement.lang = language === "PT" ? "pt" : language === "FR" ? "fr" : "en";
  const dictionary = translations[language];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    if (!originalText.has(node)) originalText.set(node, node.textContent ?? "");
    const original = originalText.get(node) ?? "";
    const trimmed = original.trim();
    if (!trimmed) return;
    const translated = dictionary[trimmed];
    const nextText = translated ? original.replace(trimmed, translated) : original;
    if (node.textContent !== nextText) node.textContent = nextText;
  });

  document.querySelectorAll<HTMLElement>("[placeholder], [aria-label], [title]").forEach((element) => {
    let originals = originalAttributes.get(element);
    if (!originals) { originals = new Map<string, string>(); originalAttributes.set(element, originals); }
    ["placeholder", "aria-label", "title"].forEach((attribute) => {
      const current = element.getAttribute(attribute);
      if (current !== null && !originals!.has(attribute)) originals!.set(attribute, current);
      const original = originals!.get(attribute);
      if (original !== undefined) {
        const nextValue = dictionary[original] ?? original;
        if (current !== nextValue) element.setAttribute(attribute, nextValue);
      }
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
