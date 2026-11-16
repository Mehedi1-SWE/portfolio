# Mehedi Hasan — Next.js + Tailwind Portfolio

A clean, premium portfolio that combines **academic background, research interests, professional experience, and software projects**.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide React

## Project Structure

```text
app/
  page.tsx          # Main page: only combines the sections
  globals.css       # Global styles, animations and reusable UI classes
  layout.tsx        # Website metadata and root layout

components/
  Navbar.tsx        # Top navigation
  Hero.tsx          # Hero / introduction section
  About.tsx         # About section
  Academic.tsx      # Education, coursework and academic projects
  Research.tsx      # Research interests
  Experience.tsx    # Professional experience + education timeline
  Projects.tsx      # Professional project showcase
  Skills.tsx        # Technical skills
  Contact.tsx       # Contact CTA
  Footer.tsx        # Footer
  SectionHeading.tsx# Reusable section heading
```

## How to edit content

Most content is intentionally kept close to the component that displays it.

Examples:

- Change your name or hero text → `components/Hero.tsx`
- Add academic projects → `components/Academic.tsx`
- Add research topics → `components/Research.tsx`
- Update jobs / education → `components/Experience.tsx`
- Add projects and links → `components/Projects.tsx`
- Update skills → `components/Skills.tsx`
- Change contact email → `components/Contact.tsx`

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Important files

If you want to change the visual system, start with `app/globals.css`.
The main accent color is stored in the CSS variable `--accent`.
