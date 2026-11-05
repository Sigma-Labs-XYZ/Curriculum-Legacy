CREATE TABLE species (
  species_id INT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(30) NOT NULL,
  scientific_name VARCHAR(100) UNIQUE NOT NULL,
  PRIMARY KEY (species_id),
  CONSTRAINT no_human_subjects CHECK (
    LOWER(name) != 'human'
    AND LOWER(scientific_name) NOT LIKE 'homo %'
  )
);

CREATE TABLE subject (
  subject_id INT GENERATED ALWAYS AS IDENTITY,
  species_id INT NOT NULL,
  acquisition_date DATE DEFAULT CURRENT_DATE CHECK (acquisition_date <= CURRENT_DATE),
  PRIMARY KEY (subject_id),
  FOREIGN KEY (species_id) REFERENCES species(species_id)
);


INSERT INTO species
  (name, scientific_name)
VALUES
  ('Tyrannosaurus', 'Tyrannosaurus rex'),
  ('Triceratops', 'Triceratops horridus'),
  ('Velociraptor', 'Velociraptor mongoliensis'),
  ('Stegosaurus', 'Stegosaurus stenops'),
  ('Brachiosaurus', 'Brachiosaurus altithorax'),
  ('Apatosaurus', 'Apatosaurus ajax'),
  ('Allosaurus', 'Allosaurus fragilis'),
  ('Spinosaurus', 'Spinosaurus aegyptiacus'),
  ('Giganotosaurus', 'Giganotosaurus carolinii'),
  ('Archaeopteryx', 'Archaeopteryx lithographica'),
  ('Diplodocus', 'Diplodocus carnegii'),
  ('Compsognathus', 'Compsognathus longipes'),
  ('Ankylosaurus', 'Ankylosaurus magniventris'),
  ('Iguanodon', 'Iguanodon bernissartensis'),
  ('Pachycephalosaurus', 'Pachycephalosaurus wyomingensis'),
  ('Parasaurolophus', 'Parasaurolophus walkeri'),
  ('Oviraptor', 'Oviraptor philoceratops'),
  ('Therizinosaurus', 'Therizinosaurus cheloniformis'),
  ('Utahraptor', 'Utahraptor ostrommaysi'),
  ('Deinonychus', 'Deinonychus antirrhopus'),
  ('Carnotaurus', 'Carnotaurus sastrei'),
  ('Gallimimus', 'Gallimimus bullatus'),
  ('Troodon', 'Troodon formosus'),
  ('Maiasaura', 'Maiasaura peeblesorum'),
  ('Edmontosaurus', 'Edmontosaurus annectens'),
  ('Ceratosaurus', 'Ceratosaurus nasicornis'),
  ('Kentrosaurus', 'Kentrosaurus aethiopicus'),
  ('Suchomimus', 'Suchomimus tenerensis'),
  ('Plateosaurus', 'Plateosaurus engelhardti'),
  ('Corythosaurus', 'Corythosaurus casuarius'),
  ('Euoplocephalus', 'Euoplocephalus tutus'),
  ('Thescelosaurus', 'Thescelosaurus neglectus')
;

WITH species_data AS (
    SELECT 'Species ' || generate_series(1, 1000000) AS name,
                 'Scientific Name ' || generate_series(1, 1000000) AS scientific_name
)
INSERT INTO species (name, scientific_name)
SELECT name, scientific_name
FROM species_data;
