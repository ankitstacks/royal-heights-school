
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'staff'
    CHECK (role IN ('owner', 'staff')),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vacancies (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  department VARCHAR(120) NOT NULL,
  employment_type VARCHAR(40) NOT NULL DEFAULT 'Full-time',
  location VARCHAR(180) NOT NULL DEFAULT 'Zirapur, Madhya Pradesh',
  description TEXT NOT NULL,
  qualifications TEXT NOT NULL,
  experience VARCHAR(180),
  salary_range VARCHAR(180),
  last_date DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'closed')),
  created_by BIGINT REFERENCES admin_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS job_applications (
  id BIGSERIAL PRIMARY KEY,
  vacancy_id BIGINT NOT NULL REFERENCES vacancies(id),
  full_name VARCHAR(160) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(25) NOT NULL,
  qualification VARCHAR(180) NOT NULL,
  experience_years NUMERIC(4,1) NOT NULL DEFAULT 0,
  cover_letter TEXT,
  resume_storage_key TEXT NOT NULL,
  resume_original_name VARCHAR(255) NOT NULL,
  resume_mime_type VARCHAR(100) NOT NULL,
  resume_size_bytes BIGINT NOT NULL,
  status VARCHAR(24) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'shortlisted', 'rejected', 'hired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vacancies_public
  ON vacancies(status, last_date);

CREATE INDEX IF NOT EXISTS idx_applications_vacancy
  ON job_applications(vacancy_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_applications_status
  ON job_applications(status, created_at DESC);
