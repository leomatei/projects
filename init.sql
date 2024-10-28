
CREATE TABLE IF NOT EXISTS project (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS image (
    id SERIAL PRIMARY KEY,
    image_data BYTEA NOT NULL
);


CREATE TABLE IF NOT EXISTS project_image (
    project_id INT,
    image_id INT,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES image(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, image_id)
);
