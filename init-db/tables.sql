CREATE TABLE project (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  link VARCHAR(255)
);

CREATE TABLE image (
  id SERIAL PRIMARY KEY,
  image_data TEXT NOT NULL,
  projectId INTEGER NOT NULL,
  CONSTRAINT fk_project
    FOREIGN KEY (projectId) 
    REFERENCES project (id)
    ON DELETE CASCADE
);
