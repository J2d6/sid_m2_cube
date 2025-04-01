CREATE TABLE dim_temps (
    id_temps INTEGER PRIMARY KEY,
    date DATE NOT NULL,
    jour INTEGER NOT NULL,
    mois INTEGER NOT NULL,
    nom_mois VARCHAR(10) NOT NULL,
    trimestre INTEGER NOT NULL,
    annee INTEGER NOT NULL,
    jour_semaine VARCHAR(10) NOT NULL,
    est_weekend BOOLEAN NOT NULL
);

-- 2. Table de dimension CLIENTS
CREATE TABLE dim_clients (
    id_client INTEGER PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    telephone VARCHAR(20),
    date_inscription DATE NOT NULL,
    segment VARCHAR(20) NOT NULL, -- 'VIP', 'Standard', 'Nouveau'
    canal_acquisition VARCHAR(20) NOT NULL, -- 'Magasin', 'En ligne', 'Parrainage'
    ville VARCHAR(50),
    code_postal VARCHAR(10),
    pays VARCHAR(30) DEFAULT 'France'
);

-- 3. Table de dimension PRODUITS
CREATE TABLE dim_produits (
    id_produit INTEGER PRIMARY KEY,
    nom_produit VARCHAR(100) NOT NULL,
    categorie VARCHAR(50) NOT NULL,
    sous_categorie VARCHAR(50),
    marque VARCHAR(50),
    prix_unitaire DECIMAL(10,2) NOT NULL,
    cout_production DECIMAL(10,2)
);

-- 4. Table de dimension MAGASINS
CREATE TABLE dim_magasins (
    id_magasin INTEGER PRIMARY KEY,
    nom_magasin VARCHAR(100) NOT NULL,
    adresse VARCHAR(200),
    ville VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL,
    surface DECIMAL(10,2), -- en m²
    date_ouverture DATE
);

-- 5. Table de dimension CANAUX
CREATE TABLE dim_canaux (
    id_canal INTEGER PRIMARY KEY,
    nom_canal VARCHAR(50) NOT NULL, -- 'Site Web', 'App Mobile', 'Magasin Physique'
    type_canal VARCHAR(20) NOT NULL -- 'Online', 'Offline'
);

-- 6. Table de faits VENTES
CREATE TABLE fait_ventes (
    id_vente INTEGER PRIMARY KEY,
    id_client INTEGER NOT NULL,
    id_produit INTEGER NOT NULL,
    id_magasin INTEGER, -- NULL pour les ventes en ligne
    id_canal INTEGER NOT NULL,
    id_temps INTEGER NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    quantite INTEGER NOT NULL,
    remise DECIMAL(10,2) DEFAULT 0,
    methode_paiement VARCHAR(20),
    
    FOREIGN KEY (id_client) REFERENCES dim_clients(id_client),
    FOREIGN KEY (id_produit) REFERENCES dim_produits(id_produit),
    FOREIGN KEY (id_magasin) REFERENCES dim_magasins(id_magasin),
    FOREIGN KEY (id_canal) REFERENCES dim_canaux(id_canal),
    FOREIGN KEY (id_temps) REFERENCES dim_temps(id_temps)
);

-- 7. Table de faits INTERACTIONS CLIENTS
CREATE TABLE fait_interactions (
    id_interaction INTEGER PRIMARY KEY,
    id_client INTEGER NOT NULL,
    id_canal INTEGER NOT NULL,
    id_temps INTEGER NOT NULL,
    type_interaction VARCHAR(50) NOT NULL, -- 'Email', 'Notification', 'Visite Magasin'
    action VARCHAR(50) NOT NULL, -- 'Ouverture', 'Clic', 'Achat'
    duree_seconds INTEGER, -- Pour les visites en ligne
    page_vue VARCHAR(100), -- Pour le web
    
    FOREIGN KEY (id_client) REFERENCES dim_clients(id_client),
    FOREIGN KEY (id_canal) REFERENCES dim_canaux(id_canal),
    FOREIGN KEY (id_temps) REFERENCES dim_temps(id_temps)
);

-- 8. Table de faits PROGRAMMES FIDELITE
CREATE TABLE fait_fidelite (
    id_operation INTEGER PRIMARY KEY,
    id_client INTEGER NOT NULL,
    id_temps INTEGER NOT NULL,
    type_operation VARCHAR(50) NOT NULL, -- 'Inscription', 'Résiliation', 'Utilisation Points'
    points_acquis INTEGER,
    points_utilises INTEGER,
    recompense VARCHAR(100),
    
    FOREIGN KEY (id_client) REFERENCES dim_clients(id_client),
    FOREIGN KEY (id_temps) REFERENCES dim_temps(id_temps)
);


COPY dim_produits FROM 'dim_produits.csv' (HEADER TRUE);
COPY dim_temps FROM 'dim_temps.csv' (HEADER TRUE);
COPY dim_magasins FROM 'dim_magasins.csv' (HEADER TRUE);
COPY dim_canaux FROM 'dim_canaux.csv' (HEADER TRUE);
COPY dim_clients FROM 'dim_clients.csv' (HEADER TRUE);
COPY fait_ventes FROM 'fait_ventes.csv' (HEADER TRUE, NULL '');
COPY fait_interactions FROM 'fait_interactions.csv' (HEADER TRUE, NULL '');
COPY fait_fidelite FROM 'fait_fidelite.csv' (HEADER TRUE, NULL '');

