// Supabase configuration
// To set up Supabase:
// 1. Go to https://supabase.com and create a free account
// 2. Create a new project
// 3. Get your Project URL and anon key from Settings > API
// 4. Replace the values below with your actual credentials

const SUPABASE_URL = 'https://neolvrcutfpjkhalzmel.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lb2x2cmN1dGZwamtoYWx6bWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NzgzNDEsImV4cCI6MjA2OTQ1NDM0MX0.duvYY0rIoegMRgszlPEMb9HY66_WrCpngMFSDcRNZuY'; // Replace with your Supabase anon key

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
      return data || [];
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

      const { error: insertError } = await supabase
        .from('vendors')
        .insert(vendors.map(vendor => ({
          ...vendor,
          created_at: vendor.createdAt || new Date().toISOString()
        })));

      if (insertError) throw insertError;
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
      return data || [];
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

      const { error: insertError } = await supabase
        .from('wedding_todos')
        .insert(todos.map(todo => ({
          ...todo,
          created_at: todo.createdAt || new Date().toISOString()
        })));

      if (insertError) throw insertError;
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
          ...finances,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
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

      const { error: insertError } = await supabase
        .from('funds')
        .insert(funds.map(fund => ({
          ...fund,
          created_at: fund.createdAt || new Date().toISOString()
        })));

      if (insertError) throw insertError;
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
