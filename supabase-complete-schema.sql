-- Complete Supabase Schema for Wedding Planning App
-- Drop all existing tables first
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS wedding_todos CASCADE;
DROP TABLE IF EXISTS finances CASCADE;
DROP TABLE IF EXISTS funds CASCADE;

-- Create vendors table with camelCase fields
CREATE TABLE vendors (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  total DECIMAL DEFAULT 0,
  paid DECIMAL DEFAULT 0,
  paidBy TEXT DEFAULT '',
  remaining DECIMAL DEFAULT 0,
  remainingBy TEXT DEFAULT 'Us',
  responsibility TEXT DEFAULT 'Us',
  dueDate DATE,
  status TEXT DEFAULT 'pending',
  notes TEXT DEFAULT '',
  link TEXT DEFAULT '',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wedding_todos table with camelCase fields
CREATE TABLE wedding_todos (
  id BIGINT PRIMARY KEY,
  task TEXT NOT NULL,
  dueDate DATE,
  completed BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create finances table with snake_case fields (as expected by the app)
CREATE TABLE finances (
  id INTEGER PRIMARY KEY DEFAULT 1,
  michaela_savings DECIMAL DEFAULT 0,
  arrington_savings DECIMAL DEFAULT 0,
  joint_savings DECIMAL DEFAULT 0,
  michaela_paid DECIMAL DEFAULT 0,
  arrington_paid DECIMAL DEFAULT 0,
  joint_paid DECIMAL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row_finances CHECK (id = 1)
);

-- Create funds table with camelCase fields
CREATE TABLE funds (
  id BIGINT PRIMARY KEY,
  source TEXT NOT NULL,
  amount DECIMAL DEFAULT 0,
  dateExpected DATE,
  dateReceived DATE,
  status TEXT DEFAULT 'expected',
  notes TEXT DEFAULT '',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for all tables
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE finances ENABLE ROW LEVEL SECURITY;
ALTER TABLE funds ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations
CREATE POLICY "Allow all operations on vendors" ON vendors 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on wedding_todos" ON wedding_todos 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on finances" ON finances 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on funds" ON funds 
  FOR ALL USING (true) WITH CHECK (true);

-- Insert initial finances row (required for single-row table)
INSERT INTO finances (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Success message
SELECT 'All tables created successfully with correct field names!' as message;