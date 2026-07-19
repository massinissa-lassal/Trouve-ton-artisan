USE trouve_ton_artisan;

-- Insertion des Catégories
INSERT INTO categories (id, name) VALUES
(1, 'Alimentation'),
(2, 'Bâtiment'),
(3, 'Fabrication'),
(4, 'Services');

-- Insertion des Spécialités
INSERT INTO specialties (id, name, category_id) VALUES
(1, 'Boucher', 1),
(2, 'Boulanger', 1),
(3, 'Chocolatier', 1),
(4, 'Traiteur', 1),
(5, 'Chauffagiste', 2),
(6, 'Électricien', 2),
(7, 'Menuisier', 2),
(8, 'Plombier', 2),
(9, 'Bijoutier', 3),
(10, 'Couturier', 3),
(11, 'Ferronnier', 3),
(12, 'Coiffeur', 4),
(13, 'Fleuriste', 4),
(14, 'Toiletteur', 4),
(15, 'Webdesign', 4);

-- Insertion des Artisans
INSERT INTO artisans (name, note, location, about, email, website, is_top, specialty_id) VALUES
('Boucherie Dumont', 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'boucherie.dumont@gmail.com', NULL, 0, 1),
('Au pain chaud', 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'aupainchaud@hotmail.com', NULL, 1, 2),
('Chocolaterie Labbé', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 1, 3),
('Traiteur Truchon', 4.1, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'truchon-traiteur@gmail.com', 'https://truchon-traiteur.fr', 1, 4),
('Oreille Salmons', 5.0, 'Évian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'o.salmons@live.com', NULL, 1, 5),
('Mont Blanc Électricité', 4.5, 'Chamonix', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 0, 6),
('Boutot & fils', 4.7, 'Bourg-en-bresse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.fr', 0, 7),
('Vallis Bellemare', 4.0, 'Vienne', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 0, 8),
('Claude Quinn', 4.2, 'Aix-les-bains', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'claude.quinn@gmail.com', NULL, 0, 9),
('Amitee Lécuyer', 4.5, 'Annecy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'a.amitee@hotmail.com', 'https://lecuyer.couture.com', 0, 10),
('Ernest Carignan', 5.0, 'Le Puy-en-Velay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'e-carignan@hotmail.com', NULL, 0, 11),
('Royden Charbonneau', 3.8, 'Saint-Priest', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'r.charbonneau@gmail.com', NULL, 0, 12),
('Leala Dennis', 3.8, 'Chambéry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'l.dennis@hotmail.com', 'https://coiffure-leala-chambery.fr', 0, 12),
('C\'est sup\'hair', 4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'sup-hair@gmail.com', 'https://sup-hair.fr', 0, 12),
('Le monde des fleurs', 4.6, 'Annonay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'contact@le.monde.des.fleurs.annonay.fr', 'https://le.monde.des.fleurs.annonay.fr', 0, 13),
('Valerie Laderoute', 4.5, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'v-laderoute@gmail.com', NULL, 0, 14),
('CM Graphisme', 4.4, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend.', 'contact@cm-graphisme.com', 'https://cm-graphisme.com', 0, 15);