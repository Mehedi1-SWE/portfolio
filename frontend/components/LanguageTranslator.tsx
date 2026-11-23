"use client";

import { useEffect } from "react";

type Language = "EN" | "PT" | "FR";

const translations: Record<Language, Record<string, string>> = {
  EN: {},
  PT: {
    "Home": "Início",
    "About": "Sobre",
    "Academic": "Acadêmico",
    "Research": "Pesquisa",
    "Experience": "Experiência",
    "Projects": "Projetos",
    "Skills": "Competências",
    "Contact": "Contato",
    "Hello, I'm": "Olá, eu sou",
    "Full-Stack Software Engineer": "Engenheiro de Software Full-Stack",
    "building modern web applications with Next.js, React and Node.js.": "desenvolvendo aplicações web modernas com Next.js, React e Node.js.",
    "Computer Science graduate focused on full-stack web development, building responsive interfaces, backend APIs and practical software solutions.": "Graduado em Ciência da Computação, com foco em desenvolvimento web full-stack, criação de interfaces responsivas, APIs de backend e soluções práticas de software.",
    "Professional CV": "Currículo profissional",
    "Academic CV": "Currículo acadêmico",
    "Europass CV": "Currículo Europass",
    "Explore academic profile": "Explorar perfil acadêmico",
    "Academic & Professional": "Acadêmico e profissional",
    "Software Engineer": "Engenheiro de Software",
    "Full-Stack Development": "Desenvolvimento Full-Stack",
    "Education": "Formação",
    "Focus": "Foco",
    "Engineering + Research": "Engenharia + Pesquisa",
    "Academic credibility meets practical software engineering.": "Credibilidade acadêmica aliada à engenharia de software prática.",
    "Software engineering.": "Engenharia de software.",
    "Built on a strong foundation.": "Construída sobre uma base sólida.",
    "I combine my Computer Science background with hands-on full-stack development. I turn project requirements into responsive interfaces, reliable APIs and practical software solutions.": "Combino minha formação em Ciência da Computação com experiência prática em desenvolvimento full-stack. Transformo requisitos de projetos em interfaces responsivas, APIs confiáveis e soluções práticas de software.",
    "This portfolio showcases my education, research interests, projects and professional experience for employers, university admissions teams and potential collaborators.": "Este portfólio apresenta minha formação, interesses de pesquisa, projetos e experiência profissional para empregadores, equipes de admissão universitária e possíveis colaboradores.",
    "Technical skills": "Competências técnicas",
    "Tools of the ": "Ferramentas de ",
    "trade.": "trabalho.",
    "Technologies, tools and engineering practices I use to develop modern web applications.": "Tecnologias, ferramentas e práticas de engenharia que utilizo para desenvolver aplicações web modernas.",
    "Frontend Development": "Desenvolvimento Front-end",
    "Backend Development": "Desenvolvimento Back-end",
    "Data & Cloud": "Dados e Nuvem",
    "Engineering & DevOps": "Engenharia e DevOps",
    "Practical stack · engineering fundamentals · production-ready workflows": "Stack prática · fundamentos de engenharia · fluxos prontos para produção",
    "Let's work ": "Vamos trabalhar ",
    "together.": "juntos.",
    "I'm open to software engineering opportunities, academic collaborations and research discussions.": "Estou aberto a oportunidades em engenharia de software, colaborações acadêmicas e discussões de pesquisa.",
    "Email me": "Envie um e-mail",
    "Your name": "Seu nome",
    "Enter your name": "Digite seu nome",
    "Email address": "Endereço de e-mail",
    "Subject": "Assunto",
    "What would you like to discuss?": "O que você gostaria de discutir?",
    "Message": "Mensagem",
    "Write your message here...": "Escreva sua mensagem aqui...",
    "Sending...": "Enviando...",
    "Send message": "Enviar mensagem",
    "Your message has been sent successfully. Thank you for reaching out!": "Sua mensagem foi enviada com sucesso. Obrigado pelo contato!",
    "Contact service is not configured yet. Please try again later.": "O serviço de contato ainda não está configurado. Tente novamente mais tarde.",
    "Unable to send your message right now.": "Não foi possível enviar sua mensagem agora.",
    "Unable to send your message right now. Please try again.": "Não foi possível enviar sua mensagem agora. Tente novamente.",
    "Software Engineering · Academic · Research": "Engenharia de Software · Acadêmico · Pesquisa",
    "Services": "Serviços",
    "How I Can Help": "Como posso ajudar",
    "Testimonials": "Depoimentos",
    "Professional feedback": "Feedback profissional",
    "Comments from people who have worked with me.": "Comentários de pessoas que trabalharam comigo.",
    "Academic profile": "Perfil acadêmico",
    "Explore my Computer Science degree, selected academic projects and relevant coursework.": "Conheça minha graduação em Ciência da Computação, projetos acadêmicos selecionados e disciplinas relevantes.",
    "Academic Project": "Projeto acadêmico",
    "Outcome": "Resultado",
    "Coursework": "Disciplinas",
    "Career & education": "Carreira e formação",
    "Professional projects": "Projetos profissionais",
    "Featured project": "Projeto em destaque",
    "Professional project": "Projeto profissional",
    "Live Demo": "Demonstração",
    "Data Structures & Algorithms": "Estruturas de Dados e Algoritmos",
    "Database Management": "Gerenciamento de Banco de Dados",
    "Applied Machine Learning": "Aprendizado de Máquina Aplicado",
    "AI-assisted Software Engineering": "Engenharia de Software Assistida por IA",
    "Intelligent Web Applications": "Aplicações Web Inteligentes",
    "Software Quality & Testing": "Qualidade e Testes de Software",
    "MERN Stack Developer Intern": "Estagiário de Desenvolvimento MERN Stack",
    "Tools of the": "Ferramentas de",
    "Areas of": "Áreas de",
    "interest.": "interesse.",
    "My professional": "Minha trajetória",
    "journey.": "profissional.",
    "A selection of my": "Uma seleção dos meus",
    "work.": "trabalhos.",
    "PRESENT": "ATUAL",
    "Academic project": "Projeto acadêmico",
    "Artificial Intelligence / Machine Learning": "Inteligência Artificial / Aprendizado de Máquina",
    "Web Engineering / Full-Stack Development": "Engenharia Web / Desenvolvimento Full-Stack",
    "Dental Disease Prediction System": "Sistema de Previsão de Doenças Dentárias",
    "E-Commerce Web Application": "Aplicação Web de Comércio Eletrônico",
    "An academic machine-learning project focused on disease prediction with a user-facing interface for interacting with the model.": "Projeto acadêmico de aprendizado de máquina voltado à previsão de doenças, com uma interface para interação com o modelo.",
    "A full-stack academic application with authentication, product workflows and payment integration.": "Aplicação acadêmica full-stack com autenticação, fluxos de produtos e integração de pagamentos.",
    "Algorithmic problem solving, data structures and computational thinking.": "Resolução algorítmica de problemas, estruturas de dados e pensamento computacional.",
    "Database design, queries, data modelling and application integration.": "Projeto de bancos de dados, consultas, modelagem de dados e integração de aplicações.",
    "Software lifecycle, engineering practices and collaborative development.": "Ciclo de vida de software, práticas de engenharia e desenvolvimento colaborativo.",
    "Machine learning concepts, modelling and applied prediction workflows.": "Conceitos de aprendizado de máquina, modelagem e processos de previsão aplicada.",
    "A modern insurance web experience built with reusable Next.js components, responsive layouts and service-focused user flows.": "Uma experiência web moderna de seguros, criada com componentes reutilizáveis do Next.js, layouts responsivos e fluxos focados em serviços.",
    "A monorepo-based business platform with a customer-facing frontend, a dedicated admin dashboard and a backend API layer.": "Plataforma empresarial baseada em monorepo, com frontend para clientes, painel administrativo dedicado e camada de API backend.",
    "A college website project organized into separate frontend and backend applications, with a dedicated frontend implementation.": "Projeto de site universitário organizado em aplicações separadas de frontend e backend, com implementação dedicada do frontend.",
  },
  FR: {
    "Home": "Accueil",
    "About": "À propos",
    "Academic": "Académique",
    "Research": "Recherche",
    "Experience": "Expérience",
    "Projects": "Projets",
    "Skills": "Compétences",
    "Contact": "Contact",
    "Hello, I'm": "Bonjour, je suis",
    "Full-Stack Software Engineer": "Ingénieur logiciel Full-Stack",
    "building modern web applications with Next.js, React and Node.js.": "créant des applications web modernes avec Next.js, React et Node.js.",
    "Computer Science graduate focused on full-stack web development, building responsive interfaces, backend APIs and practical software solutions.": "Diplômé en informatique, spécialisé dans le développement web full-stack, la création d’interfaces adaptatives, d’API backend et de solutions logicielles pratiques.",
    "Professional CV": "CV professionnel",
    "Academic CV": "CV académique",
    "Europass CV": "CV Europass",
    "Explore academic profile": "Découvrir le profil académique",
    "Academic & Professional": "Académique et professionnel",
    "Software Engineer": "Ingénieur logiciel",
    "Full-Stack Development": "Développement Full-Stack",
    "Education": "Formation",
    "Focus": "Domaine",
    "Engineering + Research": "Ingénierie + Recherche",
    "Academic credibility meets practical software engineering.": "La crédibilité académique rencontre l’ingénierie logicielle pratique.",
    "Software engineering.": "Ingénierie logicielle.",
    "Built on a strong foundation.": "Reposant sur des bases solides.",
    "I combine my Computer Science background with hands-on full-stack development. I turn project requirements into responsive interfaces, reliable APIs and practical software solutions.": "J’associe ma formation en informatique à une expérience pratique du développement full-stack. Je transforme les exigences des projets en interfaces adaptatives, API fiables et solutions logicielles concrètes.",
    "This portfolio showcases my education, research interests, projects and professional experience for employers, university admissions teams and potential collaborators.": "Ce portfolio présente ma formation, mes intérêts de recherche, mes projets et mon expérience professionnelle aux employeurs, aux équipes d’admission universitaire et aux collaborateurs potentiels.",
    "Technical skills": "Compétences techniques",
    "Tools of the ": "Les outils du ",
    "trade.": "métier.",
    "Technologies, tools and engineering practices I use to develop modern web applications.": "Technologies, outils et pratiques d’ingénierie que j’utilise pour développer des applications web modernes.",
    "Frontend Development": "Développement Front-end",
    "Backend Development": "Développement Back-end",
    "Data & Cloud": "Données et Cloud",
    "Engineering & DevOps": "Ingénierie et DevOps",
    "Practical stack · engineering fundamentals · production-ready workflows": "Stack pratique · fondamentaux de l’ingénierie · processus prêts pour la production",
    "Let's work ": "Travaillons ",
    "together.": "ensemble.",
    "I'm open to software engineering opportunities, academic collaborations and research discussions.": "Je suis ouvert aux opportunités en ingénierie logicielle, aux collaborations académiques et aux échanges autour de la recherche.",
    "Email me": "M’envoyer un e-mail",
    "Your name": "Votre nom",
    "Enter your name": "Saisissez votre nom",
    "Email address": "Adresse e-mail",
    "Subject": "Sujet",
    "What would you like to discuss?": "De quoi souhaitez-vous discuter ?",
    "Message": "Message",
    "Write your message here...": "Écrivez votre message ici...",
    "Sending...": "Envoi en cours…",
    "Send message": "Envoyer le message",
    "Your message has been sent successfully. Thank you for reaching out!": "Votre message a été envoyé avec succès. Merci de m’avoir contacté !",
    "Contact service is not configured yet. Please try again later.": "Le service de contact n’est pas encore configuré. Veuillez réessayer plus tard.",
    "Unable to send your message right now.": "Impossible d’envoyer votre message pour le moment.",
    "Unable to send your message right now. Please try again.": "Impossible d’envoyer votre message pour le moment. Veuillez réessayer.",
    "Software Engineering · Academic · Research": "Ingénierie logicielle · Académique · Recherche",
    "Services": "Services",
    "How I Can Help": "Comment je peux vous aider",
    "Testimonials": "Témoignages",
    "Professional feedback": "Retours professionnels",
    "Comments from people who have worked with me.": "Commentaires de personnes ayant travaillé avec moi.",
    "Academic profile": "Profil académique",
    "Explore my Computer Science degree, selected academic projects and relevant coursework.": "Découvrez mon diplôme en informatique, des projets académiques sélectionnés et les cours pertinents.",
    "Academic Project": "Projet académique",
    "Outcome": "Résultat",
    "Coursework": "Cours",
    "Career & education": "Carrière et formation",
    "Professional projects": "Projets professionnels",
    "Featured project": "Projet à la une",
    "Professional project": "Projet professionnel",
    "Live Demo": "Démo en direct",
    "Data Structures & Algorithms": "Structures de données et algorithmes",
    "Database Management": "Gestion de bases de données",
    "Applied Machine Learning": "Apprentissage automatique appliqué",
    "AI-assisted Software Engineering": "Ingénierie logicielle assistée par IA",
    "Intelligent Web Applications": "Applications Web intelligentes",
    "Software Quality & Testing": "Qualité logicielle et tests",
    "MERN Stack Developer Intern": "Stagiaire développeur MERN Stack",
    "Tools of the": "Les outils du",
    "Areas of": "Domaines d’",
    "interest.": "intérêt.",
    "My professional": "Mon parcours",
    "journey.": "professionnel.",
    "A selection of my": "Une sélection de mes",
    "work.": "travaux.",
    "PRESENT": "EN COURS",
    "Academic project": "Projet académique",
    "Artificial Intelligence / Machine Learning": "Intelligence artificielle / Apprentissage automatique",
    "Web Engineering / Full-Stack Development": "Ingénierie Web / Développement Full-Stack",
    "Dental Disease Prediction System": "Système de prédiction des maladies dentaires",
    "E-Commerce Web Application": "Application Web de commerce électronique",
    "An academic machine-learning project focused on disease prediction with a user-facing interface for interacting with the model.": "Un projet académique d’apprentissage automatique consacré à la prédiction de maladies, avec une interface permettant d’interagir avec le modèle.",
    "A full-stack academic application with authentication, product workflows and payment integration.": "Une application académique full-stack avec authentification, gestion des produits et intégration des paiements.",
    "Algorithmic problem solving, data structures and computational thinking.": "Résolution algorithmique de problèmes, structures de données et pensée computationnelle.",
    "Database design, queries, data modelling and application integration.": "Conception de bases de données, requêtes, modélisation des données et intégration d’applications.",
    "Software lifecycle, engineering practices and collaborative development.": "Cycle de vie logiciel, pratiques d’ingénierie et développement collaboratif.",
    "Machine learning concepts, modelling and applied prediction workflows.": "Concepts d’apprentissage automatique, modélisation et processus de prédiction appliquée.",
    "A modern insurance web experience built with reusable Next.js components, responsive layouts and service-focused user flows.": "Une expérience web moderne d’assurance créée avec des composants Next.js réutilisables, des mises en page adaptatives et des parcours axés sur les services.",
    "A monorepo-based business platform with a customer-facing frontend, a dedicated admin dashboard and a backend API layer.": "Une plateforme métier basée sur un monorepo, avec un frontend destiné aux clients, un tableau de bord d’administration dédié et une couche API backend.",
    "A college website project organized into separate frontend and backend applications, with a dedicated frontend implementation.": "Un projet de site universitaire organisé en applications frontend et backend distinctes, avec une implémentation frontend dédiée."
  }
};


// Split JSX heading fragments: each text node is translated independently.
Object.assign(translations.PT, {
  "A strong": "Uma base",
  "foundation.": "sólida.",
  "Built on a strong foundation.": "Construída sobre uma base sólida."
});
Object.assign(translations.FR, {
  "A strong": "Une base",
  "foundation.": "solide.",
  "Built on a strong foundation.": "Reposant sur des bases solides."
});

// Hero, career timeline, and profile-card copy.
Object.assign(translations.PT, {
  "Engineering · Research · Web": "Engenharia · Pesquisa · Web",
  "Academic & Professional": "Acadêmico e profissional",
  "Computer Science graduate building modern web applications with a practical, research-aware approach to software engineering.": "Graduado em Ciência da Computação que desenvolve aplicações web modernas com uma abordagem prática e orientada à pesquisa em engenharia de software.",
  "Engineering + Research": "Engenharia + Pesquisa",
  "Academic credibility meets practical software engineering.": "Credibilidade acadêmica aliada à engenharia de software prática.",
  "Technology highlights": "Destaques tecnológicos", "Career & education": "Carreira e formação",
  "My professional": "Minha trajetória", "journey.": "profissional.",
  "Contributing to full-stack web application development using MongoDB, Express.js, React.js and Node.js": "Contribuindo para o desenvolvimento de aplicações web full-stack usando MongoDB, Express.js, React.js e Node.js",
  "Building responsive interfaces with React and Tailwind CSS, and supporting API integration, testing and deployment workflows": "Criando interfaces responsivas com React e Tailwind CSS e apoiando a integração de APIs, testes e processos de implantação",
  "Provided technical support and troubleshooting while helping maintain reliable technology operations": "Prestou suporte técnico e solucionou problemas, ajudando a manter operações tecnológicas confiáveis",
  "IT & Support": "TI e suporte", "Education": "Formação", "Focus": "Foco"
});
Object.assign(translations.FR, {
  "Engineering · Research · Web": "Ingénierie · Recherche · Web",
  "Academic & Professional": "Académique et professionnel",
  "Computer Science graduate building modern web applications with a practical, research-aware approach to software engineering.": "Diplômé en informatique qui développe des applications web modernes avec une approche pratique de l’ingénierie logicielle, éclairée par la recherche.",
  "Engineering + Research": "Ingénierie + Recherche",
  "Academic credibility meets practical software engineering.": "La crédibilité académique rencontre l’ingénierie logicielle pratique.",
  "Technology highlights": "Points forts technologiques", "Career & education": "Carrière et formation",
  "My professional": "Mon parcours", "journey.": "professionnel.",
  "Contributing to full-stack web application development using MongoDB, Express.js, React.js and Node.js": "Contribution au développement d’applications web full-stack avec MongoDB, Express.js, React.js et Node.js",
  "Building responsive interfaces with React and Tailwind CSS, and supporting API integration, testing and deployment workflows": "Création d’interfaces adaptatives avec React et Tailwind CSS, et participation à l’intégration d’API, aux tests et aux processus de déploiement",
  "Provided technical support and troubleshooting while helping maintain reliable technology operations": "Assistance technique et dépannage afin de contribuer à la fiabilité des opérations informatiques",
  "IT & Support": "Informatique et support", "Education": "Formation", "Focus": "Domaine"
});

// Additional portfolio copy used by the remaining sections.
Object.assign(translations.PT, {
  "About": "Sobre", "Academic Education": "Formação acadêmica", "Degrees and formal academic qualifications.": "Graus e qualificações acadêmicas formais.",
  "Academic Certifications": "Certificações acadêmicas", "Certificates earned through academic courses and institutions.": "Certificados obtidos em cursos e instituições acadêmicas.",
  "Professional Certifications": "Certificações profissionais", "Industry-recognized credentials and professional training.": "Credenciais reconhecidas pelo setor e formação profissional.",
  "Academic Achievements": "Conquistas acadêmicas", "Academic awards, scholarships and recognitions.": "Prêmios acadêmicos, bolsas e reconhecimentos.",
  "Academic & Professional Credentials": "Credenciais acadêmicas e profissionais", "Education, certifications and achievements managed directly from the portfolio dashboard.": "Formação, certificações e conquistas gerenciadas diretamente pelo painel do portfólio.",
  "Valid until": "Válido até", "View credential ↗": "Ver credencial ↗", "Research & Thesis": "Pesquisa e Tese",
  "Oral and Dental Disease Prediction Using Machine Learning": "Previsão de doenças orais e dentárias usando aprendizado de máquina",
  "Academic Qualifications": "Qualificações acadêmicas", "Completed February 2024": "Concluído em fevereiro de 2024",
  "My research interests include machine learning, AI-assisted software development, intelligent web applications and methods for improving software quality.": "Meus interesses de pesquisa incluem aprendizado de máquina, desenvolvimento de software assistido por IA, aplicações web inteligentes e métodos para melhorar a qualidade do software.",
  "Full-Stack Development": "Desenvolvimento Full-Stack", "Complete web applications with modern frontend, backend and database architecture.": "Aplicações web completas com arquitetura moderna de frontend, backend e banco de dados.",
  "Frontend Development": "Desenvolvimento Front-end", "Responsive interfaces using Next.js, React, TypeScript and Tailwind CSS.": "Interfaces responsivas usando Next.js, React, TypeScript e Tailwind CSS.",
  "Backend & APIs": "Backend e APIs", "Structured REST APIs, validation, database integration and server-side logic.": "APIs REST estruturadas, validação, integração de banco de dados e lógica do servidor.",
  "MongoDB Solutions": "Soluções MongoDB", "Practical document models and reliable data access with Mongoose.": "Modelos de documentos práticos e acesso confiável a dados com Mongoose.",
  "API Integration": "Integração de APIs", "Clean client-server integration and third-party service connectivity.": "Integração cliente-servidor clara e conexão com serviços de terceiros.",
  "Machine Learning": "Aprendizado de Máquina", "Data-driven prediction solutions and research-oriented ML implementation.": "Soluções de previsão orientadas por dados e implementação de ML voltada à pesquisa.",
  "Services": "Serviços", "How I Can Help": "Como posso ajudar", "Software development services focused on your requirements, maintainable code and user-friendly applications.": "Serviços de desenvolvimento de software focados em seus requisitos, código de fácil manutenção e aplicações intuitivas.",
  "Connect with me": "Conecte-se comigo", "Scan the QR code to add me as a friend.": "Escaneie o código QR para me adicionar como contato.",
  "Scan to connect": "Escaneie para conectar", "Open WeChat and scan this QR code.": "Abra o WeChat e escaneie este código QR.",
  "Close": "Fechar", "Go to homepage": "Ir para a página inicial", "Open navigation menu": "Abrir menu de navegação", "Close navigation menu": "Fechar menu de navegação"
});
Object.assign(translations.FR, {
  "About": "À propos", "Academic Education": "Formation académique", "Degrees and formal academic qualifications.": "Diplômes et qualifications académiques officielles.",
  "Academic Certifications": "Certifications académiques", "Certificates earned through academic courses and institutions.": "Certificats obtenus dans le cadre de cours et d’établissements académiques.",
  "Professional Certifications": "Certifications professionnelles", "Industry-recognized credentials and professional training.": "Certifications reconnues par le secteur et formations professionnelles.",
  "Academic Achievements": "Réalisations académiques", "Academic awards, scholarships and recognitions.": "Prix académiques, bourses et distinctions.",
  "Academic & Professional Credentials": "Titres académiques et professionnels", "Education, certifications and achievements managed directly from the portfolio dashboard.": "Formation, certifications et réalisations gérées directement depuis le tableau de bord du portfolio.",
  "Valid until": "Valable jusqu’au", "View credential ↗": "Voir le justificatif ↗", "Research & Thesis": "Recherche et mémoire",
  "Oral and Dental Disease Prediction Using Machine Learning": "Prédiction des maladies bucco-dentaires à l’aide de l’apprentissage automatique",
  "Academic Qualifications": "Qualifications académiques", "Completed February 2024": "Terminé en février 2024",
  "My research interests include machine learning, AI-assisted software development, intelligent web applications and methods for improving software quality.": "Mes intérêts de recherche comprennent l’apprentissage automatique, le développement logiciel assisté par l’IA, les applications web intelligentes et les méthodes d’amélioration de la qualité logicielle.",
  "Full-Stack Development": "Développement Full-Stack", "Complete web applications with modern frontend, backend and database architecture.": "Applications web complètes avec une architecture moderne frontend, backend et base de données.",
  "Frontend Development": "Développement Front-end", "Responsive interfaces using Next.js, React, TypeScript and Tailwind CSS.": "Interfaces adaptatives avec Next.js, React, TypeScript et Tailwind CSS.",
  "Backend & APIs": "Backend et API", "Structured REST APIs, validation, database integration and server-side logic.": "API REST structurées, validation, intégration de bases de données et logique côté serveur.",
  "MongoDB Solutions": "Solutions MongoDB", "Practical document models and reliable data access with Mongoose.": "Modèles de documents pratiques et accès fiable aux données avec Mongoose.",
  "API Integration": "Intégration d’API", "Clean client-server integration and third-party service connectivity.": "Intégration client-serveur claire et connexion aux services tiers.",
  "Machine Learning": "Apprentissage automatique", "Data-driven prediction solutions and research-oriented ML implementation.": "Solutions de prédiction fondées sur les données et mise en œuvre du ML orientée recherche.",
  "Services": "Services", "How I Can Help": "Comment je peux vous aider", "Software development services focused on your requirements, maintainable code and user-friendly applications.": "Services de développement logiciel axés sur vos besoins, un code maintenable et des applications faciles à utiliser.",
  "Connect with me": "Contactez-moi", "Scan the QR code to add me as a friend.": "Scannez le code QR pour m’ajouter comme contact.",
  "Scan to connect": "Scanner pour se connecter", "Open WeChat and scan this QR code.": "Ouvrez WeChat et scannez ce code QR.",
  "Close": "Fermer", "Go to homepage": "Aller à la page d’accueil", "Open navigation menu": "Ouvrir le menu de navigation", "Close navigation menu": "Fermer le menu de navigation"
});

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

function translateDocument(language: Language) {
  document.documentElement.lang = language === "PT" ? "pt" : language === "FR" ? "fr" : "en";
  const dictionary = Object.fromEntries(Object.entries(translations[language]).map(([key, value]) => [key.trim(), value]));
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  // Handle headings whose English phrase is split across JSX text nodes and styled spans.
  document.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6").forEach((heading) => {
    const headingNodes: Text[] = [];
    const headingWalker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    while (headingWalker.nextNode()) {
      const textNode = headingWalker.currentNode as Text;
      if ((textNode.textContent ?? "").trim()) headingNodes.push(textNode);
    }
    const originalParts = headingNodes.map((node) => {
      if (!originalText.has(node)) originalText.set(node, node.textContent ?? "");
      return originalText.get(node) ?? "";
    });
    const originalHeading = originalParts.join("").trim();
    const phraseTranslations: Record<string, Record<Language, string[]>> = {
      "A strong foundation.": {
        EN: ["A strong ", "foundation."],
        PT: ["Uma base ", "sólida."],
        FR: ["Une base ", "solide."],
      },
    };
    const phrase = phraseTranslations[originalHeading];
    if (phrase && headingNodes.length === phrase[language].length) {
      headingNodes.forEach((node, index) => {
        const nextText = phrase[language][index];
        if (node.nodeValue !== nextText) node.nodeValue = nextText;
      });
    }
  });

  nodes.forEach((node) => {
    if (!originalText.has(node)) originalText.set(node, node.textContent ?? "");
    const original = originalText.get(node) ?? "";
    const trimmed = original.trim();
    if (!trimmed) return;
    const translated = dictionary[trimmed];
    const nextText = translated ? original.replace(trimmed, translated) : original;
    if (node.nodeValue !== nextText) node.nodeValue = nextText;
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
