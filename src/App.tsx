import { useState } from 'react'
// import './App.css'
import './styles/global.css'
import './styles/home-page.css'
import { Header } from './components/Header'
import { BurgerMenu } from './components/BurgerMenu'
import { Footer } from './components/Footer'
import { ImageCursor, TextCursor } from './components/CustomCursor'
import { ProjectCard } from './components/ProjectCard'
import { projectData } from './data/projects'
import type { ProjectCardProps } from './data/projects'

function App() {
  const [section, setSection] = useState('Home')

  return (
    <>
      <Header />
      <BurgerMenu />

      <main>
        <Home />
        <About />
        <Projects />
      </main>

      <Footer />
      {/* <ImageCursor imageUrl="./assets/cursor-assets/cursor-default.png" /> */}
      <TextCursor />
    </>

  )
}

function Home() {
  return (
    <section id="home">
      <div id="home-wrapper">
        <h1 className="home-headline">
          <span className="headline-text">Portfolio</span>
        </h1>
        <div className="scroll-to-explore">
          <span>scroll to explore</span>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about">
      <div id="about-wrapper" className="appear-elem text-font">
        <div className="about-text-wrapper">
          <span className="brackets-headline">[about me]</span>
          <div id="about-text" className="appear-text-wrapper">
            <p className="appear-text-part" style={{ marginBottom: '1em' }}>
              Hey, I‘m Felix. I‘m a creative designer and developer and recently graduated with a masters
              degree from the HFU in the black forest in germany. My works spread through various fields
              from web-design and development to interaction and game design. I also did some projects
              working with VR, creating 3D assets and animations. Mostly I‘m home in the web, where I also
              did my last project for my master thesis: a multiplayer VR pong game.
            </p>
            <p className="appear-text-part">
              I´m always striving to learn new things and improve my skills, where I can combine my
              passion for design and technology to create engaging and innovative experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects">
      <div className="projects-headline-wrapper">
        <div>
          <h2 className="projects-headline">
            <span className="headline-text">selected</span>
          </h2>
          <span className="projects-headline-line-1" />
        </div>
        <div>
          <span className="projects-headline-line-2" />
          <h2 className="projects-headline  has-project-number">
            <span className="headline-text">
              projects<span className="projects-number">[4]</span>
            </span>
          </h2>
        </div>
      </div>
      <div id="project-wrapper">
        {projectData.map((project: ProjectCardProps) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            year={project.year}
            tags={project.tags}
            thumbnail={project.thumbnail}
            url={project.url}
          />
        ))}
      </div>
    </section>
  )
}

export default App
