-- Drop views first since they depend on tables
DROP VIEW IF EXISTS party_planet_host_guest_view;

-- Drop tables if they exist
DROP TABLE IF EXISTS tea_party_blend_assignment;
DROP TABLE IF EXISTS tea_party_host_assignment;
DROP TABLE IF EXISTS tea_party_guest_assignment;
DROP TABLE IF EXISTS planet_party_assignment;
DROP TABLE IF EXISTS tea_party_rating;
DROP TABLE IF EXISTS tea_party_attendee;
DROP TABLE IF EXISTS tea_party;
DROP TABLE IF EXISTS planet;
DROP TABLE IF EXISTS tea_blend;


-- Create tables
CREATE TABLE planet (
    planet_id INT IDENTITY(1,1) PRIMARY KEY,
    planet_name VARCHAR(50) NOT NULL,
    planet_description VARCHAR(255) NOT NULL
);

CREATE TABLE tea_blend (
    tea_blend_id INT IDENTITY(1,1) PRIMARY KEY,
    tea_blend_name VARCHAR(50) NOT NULL,
    tea_blend_flavour VARCHAR(255) NOT NULL,
    tea_blend_magic_effects VARCHAR(255) NOT NULL
);

CREATE TABLE tea_party (
    tea_party_id INT IDENTITY(1,1) PRIMARY KEY,
    tea_party_name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    tea_party_host_planet INT NOT NULL REFERENCES planet(planet_id)
);

CREATE TABLE tea_party_blend_assignment (
    tea_party_blend_assignment_id INT IDENTITY(1,1) PRIMARY KEY,
    tea_party_id INT NOT NULL REFERENCES tea_party(tea_party_id),
    tea_blend_id INT NOT NULL REFERENCES tea_blend(tea_blend_id)
);

CREATE TABLE tea_party_attendee (
    tea_party_attendee_id INT IDENTITY(1,1) PRIMARY KEY,
    tea_party_attendee_name VARCHAR(255) NOT NULL,
    tea_party_attendee_home_planet_id INT NOT NULL REFERENCES planet(planet_id)
);

CREATE TABLE tea_party_rating (
    tea_party_rating_id INT IDENTITY(1,1) PRIMARY KEY,
    tea_party_id INT NOT NULL REFERENCES tea_party(tea_party_id),
    tea_party_attendee_id INT NOT NULL REFERENCES tea_party_attendee(tea_party_attendee_id),
    rating INT NOT NULL
);

CREATE TABLE tea_party_host_assignment (
    tea_party_host_assignment_id INT IDENTITY(1,1) PRIMARY KEY,
    tea_party_host_id INT NOT NULL REFERENCES tea_party_attendee(tea_party_attendee_id),
    tea_party_id INT NOT NULL REFERENCES tea_party(tea_party_id)
);

CREATE TABLE tea_party_guest_assignment (
    tea_party_guest_assignment_id INT IDENTITY(1,1) PRIMARY KEY,
    tea_party_attendee_id INT NOT NULL REFERENCES tea_party_attendee(tea_party_attendee_id),
    tea_party_id INT NOT NULL REFERENCES tea_party(tea_party_id)
);

CREATE TABLE planet_party_assignment (
    planet_party_assignment_id INT IDENTITY(1,1) PRIMARY KEY,
    planet_id INT NOT NULL REFERENCES planet(planet_id),
    tea_party_id INT NOT NULL REFERENCES tea_party(tea_party_id)
);
