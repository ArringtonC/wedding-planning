// Supabase configuration
// To set up Supabase:
// 1. Go to https://supabase.com and create a free account
// 2. Create a new project
// 3. Get your Project URL and anon key from Settings > API
// 4. Replace the values below with your actual credentials

const SUPABASE_URL = 'https://iuhdaxnceemzbxwxmpdl.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1aGRheG5jZWVtemJ4d3htcGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4Nzg5NzEsImV4cCI6MjA2OTQ1NDk3MX0.qk5Gxo6IVIQqVQwHuxI7J-QKzMtHFd9Z5uPdRH5uDXA'; // Replace with your Supabase anon key

// Initialize Supabase client
let supabase = null;

export const initSupabase = () => {
  if (typeof window !== 'undefined' && window.supabase) {
    try {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('Supabase initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing Supabase:', error);
      return false;
    }
  }
  return false;
};

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';
};

// Database operations
export const supabaseOps = {
  // Vendors operations
  async getVendors() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      console.log('Fetched vendors from Supabase:', data?.length || 0, 'items');
      
      // Map database fields to app fields if needed
      const vendors = (data || []).map(vendor => ({
        id: vendor.id,
        name: vendor.name,
        total: vendor.total || 0,
        paid: vendor.paid || 0,
        paidBy: vendor.paid_by || '',
        remaining: vendor.remaining || 0,
        remainingBy: vendor.remaining_by || 'Us',
        responsibility: vendor.responsibility || 'Us',
        dueDate: vendor.due_date,
        status: vendor.status || 'pending',
        notes: vendor.notes || '',
        link: vendor.link || '',
        createdAt: vendor.created_at
      }));
      
      return vendors;
    } catch (error) {
      console.error('Error fetching vendors:', error);
      return null;
    }
  },

  async saveVendors(vendors) {
    if (!supabase) return false;
    try {
      // Clear existing vendors and insert new ones
      const { error: deleteError } = await supabase
        .from('vendors')
        .delete()
        .neq('id', 0); // Delete all rows

      if (deleteError) throw deleteError;

      // Only insert if there are vendors to save
      if (vendors.length > 0) {
        const { error: insertError } = await supabase
          .from('vendors')
          .insert(vendors.map(vendor => ({
            id: vendor.id,
            name: vendor.name,
            total: vendor.total,
            paid: vendor.paid,
            paid_by: vendor.paidBy,
            remaining: vendor.remaining,
            remaining_by: vendor.remainingBy,
            responsibility: vendor.responsibility,
            due_date: vendor.dueDate,
            status: vendor.status,
            notes: vendor.notes,
            link: vendor.link,
            created_at: vendor.createdAt || new Date().toISOString()
          })));

        if (insertError) throw insertError;
      }
      
      console.log('Saved vendors to Supabase:', vendors.length, 'items');
      return true;
    } catch (error) {
      console.error('Error saving vendors:', error);
      return false;
    }
  },

  // Wedding todos operations
  async getTodos() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('wedding_todos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      console.log('Fetched todos from Supabase:', data?.length || 0, 'items');
      
      // Map database fields to app fields if needed
      const todos = (data || []).map(todo => ({
        id: todo.id,
        task: todo.task,
        dueDate: todo.due_date,
        completed: todo.completed,
        createdAt: todo.created_at
      }));
      
      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
      return null;
    }
  },

  async saveTodos(todos) {
    if (!supabase) return false;
    try {
      // Clear existing todos and insert new ones
      const { error: deleteError } = await supabase
        .from('wedding_todos')
        .delete()
        .neq('id', 0); // Delete all rows

      if (deleteError) throw deleteError;

      // Only insert if there are todos to save
      if (todos.length > 0) {
        const { error: insertError } = await supabase
          .from('wedding_todos')
          .insert(todos.map(todo => ({
            id: todo.id,
            task: todo.task,
            due_date: todo.dueDate,
            completed: todo.completed,
            created_at: todo.createdAt || new Date().toISOString()
          })));

        if (insertError) throw insertError;
      }
      
      console.log('Saved todos to Supabase:', todos.length, 'items');
      return true;
    } catch (error) {
      console.error('Error saving todos:', error);
      return false;
    }
  },

  // Finances operations
  async getFinances() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('finances')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
      console.log('Fetched finances from Supabase:', data);
      return data || null;
    } catch (error) {
      console.error('Error fetching finances:', error);
      return null;
    }
  },

  async saveFinances(finances) {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('finances')
        .upsert({
          id: 1,
          michaela_savings: finances.michaela_savings,
          arrington_savings: finances.arrington_savings,
          joint_savings: finances.joint_savings,
          michaela_paid: finances.michaela_paid,
          arrington_paid: finances.arrington_paid,
          joint_paid: finances.joint_paid,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      console.log('Saved finances to Supabase:', finances);
      return true;
    } catch (error) {
      console.error('Error saving finances:', error);
      return false;
    }
  },

  // Funds operations
  async getFunds() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('funds')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching funds:', error);
      return null;
    }
  },

  async saveFunds(funds) {
    if (!supabase) return false;
    try {
      // Clear existing funds and insert new ones
      const { error: deleteError } = await supabase
        .from('funds')
        .delete()
        .neq('id', 0); // Delete all rows

      if (deleteError) throw deleteError;

      // Only insert if there are funds to save
      if (funds.length > 0) {
        const { error: insertError } = await supabase
          .from('funds')
          .insert(funds.map(fund => ({
            id: fund.id,
            source: fund.source,
            amount: fund.amount,
            date_expected: fund.dateExpected,
            date_received: fund.dateReceived,
            status: fund.status,
            notes: fund.notes,
            created_at: fund.createdAt || new Date().toISOString()
          })));

        if (insertError) throw insertError;
      }
      
      console.log('Saved funds to Supabase:', funds.length, 'items');
      return true;
    } catch (error) {
      console.error('Error saving funds:', error);
      return false;
    }
  },

  // Export all data
  async exportAllData() {
    if (!supabase) return null;
    try {
      const [vendors, todos, finances, funds] = await Promise.all([
        this.getVendors(),
        this.getTodos(),
        this.getFinances(),
        this.getFunds()
      ]);

      return {
        vendors: vendors || [],
        todos: todos || [],
        finances: finances || {},
        funds: funds || [],
        exportedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  }
};

export default supabase;
