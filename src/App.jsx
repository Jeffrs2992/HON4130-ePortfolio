import { HashRouter, Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import Home from './pages/Home'
import About from './pages/About'
import Education from './pages/Education'
import Leadership from './pages/Leadership'
import LeadershipExperience from './pages/LeadershipExperience'
import LeadershipSkills from './pages/LeadershipSkills'
import LeadershipCommunity from './pages/LeadershipCommunity'
import Certifications from './pages/Certifications'
import Contact from './pages/Contact'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/leadership/experience" element={<LeadershipExperience />} />
          <Route path="/leadership/skills" element={<LeadershipSkills />} />
          <Route path="/leadership/community" element={<LeadershipCommunity />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
