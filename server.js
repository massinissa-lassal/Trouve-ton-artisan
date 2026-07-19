const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes, Op } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connexion unique à MySQL
const sequelize = new Sequelize('trouve_ton_artisan', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

// 2. Définition des modèles (Tables)
const Categorie = sequelize.define('Categorie', {
    name: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'categories', timestamps: false });

const Specialty = sequelize.define('Specialty', {
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'specialties', timestamps: false });

const Artisan = sequelize.define('Artisan', {
    name: { type: DataTypes.STRING, allowNull: false },
    note: { type: DataTypes.FLOAT },
    location: { type: DataTypes.STRING },
    about: { type: DataTypes.TEXT },
    email: { type: DataTypes.STRING },
    is_top: { type: DataTypes.BOOLEAN, defaultValue: false },
    specialty_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'artisans', timestamps: false });

// Définition des relations pour les requêtes (Jointures)
Artisan.belongsTo(Specialty, { foreignKey: 'specialty_id' });
Specialty.belongsTo(Categorie, { foreignKey: 'category_id' });
Specialty.hasMany(Artisan, { foreignKey: 'specialty_id' });
Categorie.hasMany(Specialty, { foreignKey: 'category_id' });

// 3. Routes de l'API pour le Frontend React

// Récupérer toutes les catégories
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Erreur catégories", details: err.message });
    }
});

// Récupérer les artisans du mois
app.get('/api/artisans/top', async (req, res) => {
    try {
        const topArtisans = await Artisan.findAll({ 
            where: { is_top: true },
            include: [{ model: Specialty, include: [Categorie] }]
        });
        res.json(topArtisans);
    } catch (err) {
        res.status(500).json({ error: "Erreur artisans du mois", details: err.message });
    }
});

// Récupérer les artisans (avec gestion du filtre optionnel ?category=ID)
app.get('/api/artisans', async (req, res) => {
    try {
        const { category } = req.query;
        let options = {
            include: [{ model: Specialty, include: [Categorie] }]
        };

        // Si une catégorie est passée en paramètre, on filtre via la jointure
        if (category) {
            options.include[0].where = { category_id: category };
        }

        const artisans = await Artisan.findAll(options);
        res.json(artisans);
    } catch (err) {
        res.status(500).json({ error: "Erreur artisans", details: err.message });
    }
});

// NOUVELLE ROUTE : Récupérer un artisan unique par son ID (pour la fiche complète)
app.get('/api/artisans/:id', async (req, res) => {
    try {
        const artisan = await Artisan.findByPk(req.params.id, {
            include: [{ model: Specialty, include: [Categorie] }]
        });
        if (!artisan) {
            return res.status(404).json({ error: "Artisan non trouvé" });
        }
        res.json(artisan);
    } catch (err) {
        res.status(500).json({ error: "Erreur récupération artisan", details: err.message });
    }
});

// 4. Initialisation automatique de la base et démarrage
const PORT = 5000;

async function startServer() {
    try {
        await sequelize.sync({ alter: true });
        console.log("Tables MySQL synchronisées avec succès !");

        const count = await Artisan.count();
        if (count === 0) {
            const c1 = await Categorie.create({ name: 'Bâtiment' });
            const c2 = await Categorie.create({ name: 'Services' });
            const c3 = await Categorie.create({ name: 'Fabrication' });
            const c4 = await Categorie.create({ name: 'Alimentation' });

            const s1 = await Specialty.create({ name: 'Électricien', category_id: c1.id });
            const s2 = await Specialty.create({ name: 'Plombier', category_id: c1.id });
            const s3 = await Specialty.create({ name: 'Boucher', category_id: c4.id });

            await Artisan.create({ name: 'Mont Blanc Électricité', note: 4.5, location: 'Chamonix', about: 'Dépannage rapide.', email: 'contact@mont-blanc.com', is_top: true, specialty_id: s1.id });
            await Artisan.create({ name: 'Plomberie Bellemare', note: 4.8, location: 'Lyon', about: 'Plombier de confiance.', email: 'contact@bellemare.com', is_top: true, specialty_id: s2.id });
            await Artisan.create({ name: 'Boucherie Dumont', note: 4.2, location: 'Montélimar', about: 'Viande de qualité.', email: 'dumont@boucherie.com', is_top: true, specialty_id: s3.id });
            console.log("Données de démonstration injectées !");
        }

        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });
    } catch (error) {
        console.error("Impossible de démarrer le serveur :", error);
    }
}

startServer();