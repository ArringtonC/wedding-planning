-- Wedding Planning App Database Schema
-- Run these SQL commands in your Supabase SQL Editor

-- Create vendors table
CREATE TABLE vendors (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  total DECIMAL DEFAULT 0,
  paid DECIMAL DEFAULT 0,
  paid_by TEXT DEFAULT '',
  remaining DECIMAL DEFAULT 0,
  remaining_by TEXT DEFAULT 'Us',
  responsibility TEXT DEFAULT 'Us',
  due_date DATE,
  status TEXT DEFAULT 'pending',
  notes TEXT DEFAULT '',
  link TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wedding_todos table
CREATE TABLE wedding_todos (
  id BIGINT PRIMARY KEY,
  task TEXT NOT NULL,
  due_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create finances table (single row for user finances)
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

-- Create funds table
CREATE TABLE funds (
  id BIGINT PRIMARY KEY,
  source TEXT NOT NULL,
  amount DECIMAL DEFAULT 0,
  date_expected DATE,
  date_received DATE,
  status TEXT DEFAULT 'expected',
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE finances ENABLE ROW LEVEL SECURITY;
ALTER TABLE funds ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations for now (you can restrict later)
-- For vendors
CREATE POLICY "Allow all operations on vendors" ON vendors
  FOR ALL USING (true) WITH CHECK (true);

-- For wedding_todos
CREATE POLICY "Allow all operations on wedding_todos" ON wedding_todos
  FOR ALL USING (true) WITH CHECK (true);

-- For finances
CREATE POLICY "Allow all operations on finances" ON finances
  FOR ALL USING (true) WITH CHECK (true);

-- For funds
CREATE POLICY "Allow all operations on funds" ON funds
  FOR ALL USING (true) WITH CHECK (true);

-- Insert initial finances row
INSERT INTO finances (id) VALUES (1) ON CONFLICT (id) DO NOTHING;