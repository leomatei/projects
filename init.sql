
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(255),
);


CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    image_data BYTEA NOT NULL
);


CREATE TABLE IF NOT EXISTS project_images (
    project_id INT,
    image_id INT,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, image_id)
);
