import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// --- COMPOSANT : HEADER ---
function Header() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/artisans?search=${searchQuery}`);
    }
  };

  return (
    <header className="bg-white border-bottom sticky-top py-3">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <Link to="/" className="navbar-brand text-dark fw-bold fs-4">
          Trouve ton artisan !
        </Link>
        
        <nav className="nav">
          {categories.map(cat => (
            <Link key={cat.id} to={`/artisans?category=${cat.id}`} className="nav-link text-secondary fw-semibold">
              {cat.name}
            </Link>
          ))}
        </nav>

        <form onSubmit={handleSearchSubmit} className="d-flex align-items-center">
          <input 
            type="search" 
            placeholder="Rechercher un artisan..." 
            className="form-control me-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#0074c7' }}>Rechercher</button>
        </form>
      </div>
    </header>
  );
}

// --- COMPOSANT : FOOTER ---
function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container text-md-start text-center">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3 fw-bold text-white-50">Pages Légales</h5>
            <ul className="list-unstyled">
              <li><Link to="/legal" className="text-white text-decoration-none">Mentions légales</Link></li>
              <li><Link to="/legal" className="text-white text-decoration-none">Données personnelles</Link></li>
              <li><Link to="/legal" className="text-white text-decoration-none">Accessibilité</Link></li>
              <li><Link to="/legal" className="text-white text-decoration-none">Gestion des cookies</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3 fw-bold text-white-50">Contact Antenne Lyon</h5>
            <p className="mb-1">101 cours Charlemagne</p>
            <p className="mb-1">CS 20033</p>
            <p className="mb-1">69269 LYON CEDEX 02</p>
            <p className="mb-1">France</p>
            <p className="mb-0"><a href="tel:+33426734000" className="text-white text-decoration-none">+33 (0)4 26 73 40 00</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- CARD COMPOSANT POUR ARTISAN ---
function ArtisanCard({ artisan }) {
  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title fw-bold">{artisan.name}</h5>
        <div className="text-warning mb-2">
          {'★'.repeat(Math.floor(artisan.note))}{artisan.note % 1 !== 0 ? '½' : ''} <span className="text-muted text-small">({artisan.note}/5)</span>
        </div>
        <p className="card-text mb-1 text-muted"><strong>Spécialité :</strong> {artisan.Specialty?.name}</p>
        <p className="card-text text-muted"><strong>Localisation :</strong> {artisan.location}</p>
        <Link to={`/artisan/${artisan.id}`} className="btn btn-outline-primary w-100 mt-2">Voir la fiche complète</Link>
      </div>
    </div>
  );
}

// --- PAGE : ACCUEIL ---
function Home() {
  const [topArtisans, setTopArtisans] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/artisans/top')
      .then(res => res.json())
      .then(data => setTopArtisans(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container py-5">
      <section className="bg-light p-5 rounded-4 mb-5">
        <h2 className="fw-bold mb-4" style={{ color: '#00497c' }}>Comment trouver mon artisan ?</h2>
        <div className="row g-4">
          <div className="col-md-3"><h5>1. Choisir la catégorie d’artisanat dans le menu.</h5></div>
          <div className="col-md-3"><h5>2. Choisir un artisan.</h5></div>
          <div className="col-md-3"><h5>3. Le contacter via le formulaire de contact.</h5></div>
          <div className="col-md-3"><h5>4. Une réponse sera apportée sous 48h.</h5></div>
        </div>
      </section>

      <section>
        <h2 className="fw-bold mb-4 text-center">Les trois artisans du mois</h2>
        <div className="row g-4">
          {topArtisans.map(artisan => (
            <div key={artisan.id} className="col-md-4">
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- PAGE : LISTE / RECHERCHE ---
function ArtisanList() {
  const [artisans, setArtisans] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const search = urlParams.get('search');

  useEffect(() => {
    let url = 'http://localhost:5000/api/artisans';
    if (category) url += `?category=${category}`;
    if (search) url += `?search=${search}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setArtisans(data))
      .catch(err => console.error(err));
  }, [category, search]);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">{search ? `Résultats pour "${search}"` : 'Nos Artisans'}</h2>
      {artisans.length === 0 ? <p>Aucun artisan trouvé.</p> : (
        <div className="row g-4">
          {artisans.map(artisan => (
            <div key={artisan.id} className="col-md-4">
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- PAGE : FICHE DETRAILLÉE ---
function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    fetch(`http://localhost:5000/api/artisans/${id}`)
      .then(res => res.json())
      .then(data => setArtisan(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`E-mail de contact envoyé avec succès à l'artisan ${artisan?.name} !`);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  if (!artisan) return <div className="container py-5">Chargement...</div>;

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{artisan.name}</h2>
          <div className="text-warning mb-3 fs-5">{'★'.repeat(Math.floor(artisan.note))} ({artisan.note}/5)</div>
          <p><strong>Spécialité :</strong> {artisan.Specialty?.name}</p>
          <p><strong>Localisation :</strong> {artisan.location}</p>
          {artisan.website && <p><strong>Site web :</strong> <a href={artisan.website} target="_blank" rel="noreferrer">{artisan.website}</a></p>}
          <h4 className="mt-4 fw-bold">A propos</h4>
          <p className="text-muted">{artisan.about}</p>
        </div>
        <div className="col-md-6">
          <div className="bg-light p-4 rounded-4 shadow-sm">
            <h4 className="fw-bold mb-3">Contacter l'artisan</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3"><input type="text" placeholder="Votre nom" className="form-control" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div className="mb-3"><input type="email" placeholder="Votre e-mail" className="form-control" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
              <div className="mb-3"><input type="text" placeholder="Objet" className="form-control" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} /></div>
              <div className="mb-3"><textarea placeholder="Votre message" className="form-control" rows="4" required value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea></div>
              <button type="submit" className="btn btn-primary w-100">Envoyer le message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- PAGE : LÉGALE EN CONSTRUCTION ---
function LegalPage() {
  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold text-muted">Page en construction</h2>
      <p className="text-secondary">Cette section sera remplie ultérieurement par un cabinet spécialisé.</p>
    </div>
  );
}

// --- PAGE : 404 ---
function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="fw-bold mb-3">Page non trouvée</h2>
      <p className="text-muted">La page que vous avez demandée n'existe pas ou a été déplacée.</p>
      <Link to="/" className="btn btn-primary mt-3">Retour à l'accueil</Link>
    </div>
  );
}

// --- CONFIGURATION DU ROUTEUR PRINCIPAL ---
export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-white">
        <Header />
        <main className="flex-shrink-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artisans" element={<ArtisanList />} />
            <Route path="/artisan/:id" element={<ArtisanDetail />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}