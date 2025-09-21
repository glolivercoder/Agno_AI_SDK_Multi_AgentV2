-- =====================================================
-- AGNO GUI INTERFACE - DATABASE INITIALIZATION
-- =====================================================
-- PostgreSQL initialization script
-- =====================================================

-- Create database if it doesn't exist
-- (This script runs automatically when the PostgreSQL container starts)

-- Set timezone
SET timezone = 'America/Sao_Paulo';

-- Create custom configuration
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Create agno_gui database if it doesn't exist
SELECT 'CREATE DATABASE agno_gui OWNER agno_user'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agno_gui')\gexec

-- Connect to agno_gui database
\c agno_gui;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    model VARCHAR(100) NOT NULL,
    system_prompt TEXT,
    tools JSONB DEFAULT '[]',
    memory_config JSONB DEFAULT '{}',
    settings JSONB DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'inactive',
    performance_metrics JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    agents JSONB DEFAULT '[]',
    workflows JSONB DEFAULT '[]',
    settings JSONB DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'inactive',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workflows table
CREATE TABLE IF NOT EXISTS workflows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    steps JSONB DEFAULT '[]',
    triggers JSONB DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'inactive',
    execution_history JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table (for NextAuth)
CREATE TABLE IF NOT EXISTS sessions (
    session_token VARCHAR(255) PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create verification tokens table (for NextAuth)
CREATE TABLE IF NOT EXISTS verification_tokens (
    token VARCHAR(255) PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_teams_user_id ON teams(user_id);
CREATE INDEX IF NOT EXISTS idx_teams_status ON teams(status);
CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_workflows_team_id ON workflows(team_id);
CREATE INDEX IF NOT EXISTS idx_workflows_status ON workflows(status);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert demo users (password: 'password' hashed)
INSERT INTO users (email, name, password_hash, role) VALUES
    ('admin@agnogui.com', 'Admin User', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeetdPP..l9JhKQu', 'admin'),
    ('user@agnogui.com', 'Regular User', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeetdPP..l9JhKQu', 'user')
ON CONFLICT (email) DO NOTHING;

-- Insert sample data
INSERT INTO agents (user_id, name, description, model, system_prompt, status) VALUES
    ((SELECT id FROM users WHERE email = 'admin@agnogui.com'), 'Assistant', 'General purpose AI assistant', 'gpt-3.5-turbo', 'You are a helpful AI assistant.', 'active'),
    ((SELECT id FROM users WHERE email = 'admin@agnogui.com'), 'Code Reviewer', 'Specialized in code review and suggestions', 'gpt-4', 'You are an expert code reviewer.', 'inactive')
ON CONFLICT DO NOTHING;

-- Create views for analytics
CREATE OR REPLACE VIEW user_stats AS
SELECT
    u.id,
    u.email,
    u.name,
    u.role,
    COUNT(DISTINCT a.id) as total_agents,
    COUNT(DISTINCT t.id) as total_teams,
    COUNT(DISTINCT w.id) as total_workflows,
    MAX(u.last_login_at) as last_login
FROM users u
LEFT JOIN agents a ON u.id = a.user_id
LEFT JOIN teams t ON u.id = t.user_id
LEFT JOIN workflows w ON u.id = w.user_id
GROUP BY u.id, u.email, u.name, u.role;

-- Create function for health check
CREATE OR REPLACE FUNCTION health_check()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'database', 'healthy',
        'timestamp', NOW(),
        'version', version(),
        'connections', (SELECT count(*) FROM pg_stat_activity),
        'users_count', (SELECT count(*) FROM users),
        'agents_count', (SELECT count(*) FROM agents),
        'teams_count', (SELECT count(*) FROM teams),
        'workflows_count', (SELECT count(*) FROM workflows)
    ) INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO agno_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO agno_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO agno_user;

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE 'Agno GUI database initialized successfully at %', NOW();
END
$$;

-- Show summary
SELECT
    'Database initialized successfully!' as message,
    NOW() as timestamp,
    (SELECT count(*) FROM users) as users_created,
    (SELECT count(*) FROM agents) as agents_created,
    (SELECT count(*) FROM teams) as teams_created,
    (SELECT count(*) FROM workflows) as workflows_created;