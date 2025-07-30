-- Drop existing tables if they exist
DROP TABLE IF EXISTS wedding_todos CASCADE;

-- Create wedding_todos table with exact field names the app expects
CREATE TABLE wedding_todos (
  id BIGINT PRIMARY KEY,
  task TEXT NOT NULL,
  dueDate DATE,
  completed BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE wedding_todos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on wedding_todos" ON wedding_todos FOR ALL USING (true) WITH CHECK (true);

-- Optional: Insert a test todo to verify it's working
-- INSERT INTO wedding_todos (id, task, dueDate, completed) 
-- VALUES (1735840000000, 'Test Todo - Delete Me', '2025-08-01', false);