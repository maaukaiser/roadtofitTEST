USE road_to_fit;
ALTER TABLE usuarios ADD COLUMN password_hash VARCHAR(255) DEFAULT NULL;