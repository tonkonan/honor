-- Сбрасываем базу данных
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Предоставляем права на схему
GRANT ALL ON SCHEMA public TO honoruser;
GRANT ALL ON SCHEMA public TO public;

-- Создаем необходимые таблицы
CREATE TABLE "User" (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  "fullName" VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'CITIZEN',
  "avatarUrl" VARCHAR(255),
  "isVerified" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Предоставляем права на таблицы
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO honoruser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO honoruser; 