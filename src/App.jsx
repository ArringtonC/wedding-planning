import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Calendar, DollarSign, Users, AlertCircle, ChevronDown, ChevronUp, CreditCard, ExternalLink, Edit2, Plus, Trash2, Save, X, PiggyBank, TrendingUp, Wallet, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const App = () => {
  // Load saved data from localStorage
  const loadData = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return defaultValue;
    }
  };

  const [activeTab, setActiveTab] = useState('our-payments');
  const [expandedSections, setExpandedSections] = useState({});
  const [editingVendor, setEditingVendor] = useState(null);
  const [editingFund, setEditingFund] = useState(null);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showAddFund, setShowAddFund] = useState(false);
  const [showCompletedVendors, setShowCompletedVendors] = useState(false);
  const [completedVendors, setCompletedVendors] = useState(() => loadData('completedVendors', []));
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: '',
    showOverdue: true,
    showUpcoming: true,
    showNoDate: true
  });
  const [tableSorting, setTableSorting] = useState({
    column: null,
    direction: 'asc' // 'asc' or 'desc'
  });

  // Wedding Todo List state
  const [weddingTodos, setWeddingTodos] = useState(() => loadData('weddingTodos', []));
  const [newTodo, setNewTodo] = useState({
    task: '',
    dueDate: '',
    completed: false
  });
  const [showAddTodo, setShowAddTodo] = useState(false);

  const [newVendor, setNewVendor] = useState({
    name: '',
    total: 0,
    paid: 0,
    paidBy: '',
    remaining: 0,
    remainingBy: 'Us',
    responsibility: 'Us',
    dueDate: '',
    status: 'pending',
    notes: '',
    link: ''
  });

  const [newFund, setNewFund] = useState({
    source: '',
    amount: 0,
    dateExpected: '',
    dateReceived: '',
    status: 'expected',
    notes: ''
  });

  // Our current finances
  const [ourFinances, setOurFinances] = useState(() => loadData('ourFinances', {
    michaelaSavings: 0,
    arringtonSavings: 0,
    jointSavings: 0,
    michaelaPaid: 0,
    arringtonPaid: 0,
    jointPaid: 0
  }));
  
  const [vendors, setVendors] = useState(() => loadData('weddingVendors', [
    {
      id: 1,
      name: 'Venue: Botanical Gardens',
      total: 9175,
      paid: 3750,
      paidBy: 'Parents (us 500)',
      remaining: 4925,
      remainingBy: 'Parents',
      responsibility: 'Parents',
      notes: 'M+A are responsible for bartenders',
      link: ''
    },
    {
      id: 2,
      name: 'Caterer: China\'s Creations',
      total: 7254,
      paid: 2504,
      paidBy: 'Parents (us: $250)',
      remaining: 4750,
      remainingBy: 'Parents',
      responsibility: 'Parents',
      notes: 'US: 250 to venue',
      link: 'https://www.paypal.com/invoice/p/#3KHJDE6V384EFWPD'
    },
    {
      id: 3,
      name: 'Florals & Vases: Native Petals',
      total: 11900.5,
      paid: 1545,
      paidBy: 'Parents (us: $545)',
      remaining: 11355,
      remainingBy: 'Parents',
      responsibility: 'Parents',
      notes: 'Depending on the amount if tables needed could save 1k',
      link: 'https://app.squareup.com/pay-invoice/inv:0-ChDvTcmV8c4yInnbPCGS4Ey_ENQJ'
    },
    {
      id: 4,
      name: 'Photography and Video: Flemings',
      total: 6831.88,
      paid: 5708.75,
      paidBy: 'Us',
      remaining: 1123.13,
      remainingBy: 'Us',
      responsibility: 'Us',
      notes: 'Will reach out at least 3 weeks before the wedding; money due sept 4',
      link: ''
    },
    {
      id: 5,
      name: 'Cake: Abundantly Sweets',
      total: 1380,
      paid: 690,
      paidBy: 'Us',
      remaining: 690,
      remainingBy: 'Us',
      responsibility: 'Us',
      notes: 'Could go down based on number on guest count',
      link: ''
    },
    {
      id: 6,
      name: 'DJ: Don Jr',
      total: 1300,
      paid: 250,
      paidBy: 'Us',
      remaining: 1050,
      remainingBy: 'Us',
      responsibility: 'Us',
      notes: '',
      link: ''
    },
    {
      id: 7,
      name: 'Violin: Johnathan',
      total: 1260,
      paid: 420,
      paidBy: 'Us',
      remaining: 840,
      remainingBy: 'Us',
      responsibility: 'Us',
      notes: '',
      link: ''
    },
    {
      id: 8,
      name: 'Makeup',
      total: 300,
      paid: 0,
      paidBy: '',
      remaining: 300,
      remainingBy: 'Us',
      responsibility: 'Michaela',
      notes: '$115 for bridesmaids',
      link: ''
    },
    {
      id: 9,
      name: 'Signage: Chanarda',
      total: 300,
      paid: 0,
      paidBy: '',
      remaining: 300,
      remainingBy: 'Us',
      responsibility: 'Us',
      notes: '',
      link: ''
    },
    {
      id: 10,
      name: 'Giveaways',
      total: 800,
      paid: 0,
      paidBy: '',
      remaining: 800,
      remainingBy: 'Us',
      responsibility: 'Us',
      notes: '',
      link: ''
    },
    {
      id: 11,
      name: 'Invitations and other cards',
      total: 350,
      paid: 0,
      paidBy: '',
      remaining: 350,
      remainingBy: 'Us',
      responsibility: 'Us',
      notes: '',  
      link: ''
    },
    {
      id: 12,
      name: 'Bar: Venue',
      total: 5000,
      paid: 0,
      paidBy: '',
      remaining: 5000,
      remainingBy: 'Us',
      responsibility: 'Us',
      notes: 'Us (250/bartender)',
      link: ''
    }
  ]));

  const [incomingFunds, setIncomingFunds] = useState(() => loadData('weddingFunds', [
    {
      id: 1,
      source: 'Tax Refund',
      amount: 2000,
      dateExpected: '2025-03-15',
      dateReceived: '',
      status: 'expected',
      notes: 'Federal tax return'
    },
    {
      id: 2,
      source: 'Wedding Gift - Grandparents',
      amount: 1000,
      dateExpected: '2025-06-01',
      dateReceived: '',
      status: 'expected',
      notes: ''
    }
  ]));

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('weddingVendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('weddingFunds', JSON.stringify(incomingFunds));
  }, [incomingFunds]);

  useEffect(() => {
    localStorage.setItem('ourFinances', JSON.stringify(ourFinances));
  }, [ourFinances]);

  useEffect(() => {
    localStorage.setItem('weddingTodos', JSON.stringify(weddingTodos));
  }, [weddingTodos]);

  useEffect(() => {
    localStorage.setItem('completedVendors', JSON.stringify(completedVendors));
  }, [completedVendors]);

  const calculateBudgetSummary = () => {
    const vendorTotals = vendors.reduce((acc, vendor) => ({
      total: acc.total + vendor.total,
      paid: acc.paid + vendor.paid,
      remaining: acc.remaining + vendor.remaining
    }), { total: 0, paid: 0, remaining: 0 });
    
    // Calculate M&A (Us) specific costs
    const ourRemaining = vendors
      .filter(v => v.remainingBy === 'Us')
      .reduce((sum, v) => sum + v.remaining, 0);
    
    const parentRemaining = vendors
      .filter(v => v.remainingBy === 'Parents')
      .reduce((sum, v) => sum + v.remaining, 0);

    // Calculate incoming funds
    const totalExpectedFunds = incomingFunds
      .reduce((sum, fund) => sum + fund.amount, 0);
    
    const receivedFunds = incomingFunds
      .filter(f => f.status === 'received')
      .reduce((sum, fund) => sum + fund.amount, 0);
    
    const pendingFunds = incomingFunds
      .filter(f => f.status === 'expected')
      .reduce((sum, fund) => sum + fund.amount, 0);

    return {
      ...vendorTotals,
      ourRemaining,
      parentRemaining,
      totalExpectedFunds,
      receivedFunds,
      pendingFunds,
      shortfall: ourRemaining - totalExpectedFunds
    };
  };

  const handleSaveVendor = () => {
    if (editingVendor) {
      const updatedVendor = {
        ...editingVendor,
        remaining: editingVendor.total - editingVendor.paid
      };
      setVendors(vendors.map(v => v.id === updatedVendor.id ? updatedVendor : v));
      setEditingVendor(null);
    }
  };

  const handleDeleteVendor = (id) => {
    setVendors(vendors.filter(v => v.id !== id));
  };

  const handleAddVendor = () => {
    const vendor = {
      ...newVendor,
      id: Date.now(),
      total: parseFloat(newVendor.total) || 0,
      paid: parseFloat(newVendor.paid) || 0,
      remaining: (parseFloat(newVendor.total) || 0) - (parseFloat(newVendor.paid) || 0)
    };
    setVendors([...vendors, vendor]);
    setNewVendor({
      name: '',
      total: 0,
      paid: 0,
      paidBy: '',
      remaining: 0,
      remainingBy: 'Us',
      responsibility: 'Us',
      dueDate: '',
      status: 'pending',
      notes: '',
      link: ''
    });
    setShowAddVendor(false);
  };

  const handleAddFund = () => {
    const fund = {
      ...newFund,
      id: Date.now(),
      amount: parseFloat(newFund.amount) || 0
    };
    setIncomingFunds([...incomingFunds, fund]);
    setNewFund({
      source: '',
      amount: 0,
      dateExpected: '',
      dateReceived: '',
      status: 'expected',
      notes: ''
    });
    setShowAddFund(false);
  };

  const handleSaveFund = () => {
    if (editingFund) {
      setIncomingFunds(incomingFunds.map(f => f.id === editingFund.id ? editingFund : f));
      setEditingFund(null);
    }
  };

  const handleDeleteFund = (id) => {
    setIncomingFunds(incomingFunds.filter(f => f.id !== id));
  };

  const markFundReceived = (id) => {
    setIncomingFunds(incomingFunds.map(f => 
      f.id === id 
        ? { ...f, status: 'received', dateReceived: new Date().toISOString().split('T')[0] }
        : f
    ));
  };

  const markVendorCompleted = (vendorId) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor) {
      setCompletedVendors([...completedVendors, { ...vendor, completedDate: new Date().toISOString().split('T')[0] }]);
      setVendors(vendors.filter(v => v.id !== vendorId));
    }
  };

  const restoreVendor = (vendorId) => {
    const completedVendor = completedVendors.find(v => v.id === vendorId);
    if (completedVendor) {
      const { completedDate, ...vendorData } = completedVendor;
      setVendors([...vendors, vendorData]);
      setCompletedVendors(completedVendors.filter(v => v.id !== vendorId));
    }
  };

  const budgetSummary = calculateBudgetSummary();

  // Calculate totals for Our Payments page (Us + Michaela only)
  const calculateOurPaymentsSummary = () => {
    console.log('All vendors with their responsibilities:');
    vendors.forEach((vendor, index) => {
      console.log(`${index + 1}. ${vendor.name} - Responsibility: "${vendor.responsibility}"`);
    });
    
    const ourVendors = vendors.filter(vendor => vendor.responsibility === 'Us' || vendor.responsibility === 'Michaela');
    console.log('Total vendors:', vendors.length);
    console.log('Our vendors (Us/Michaela):', ourVendors.length);
    console.log('Our vendors:', ourVendors);
    
    return ourVendors.reduce((acc, vendor) => ({
      total: acc.total + vendor.total,
      paid: acc.paid + vendor.paid,
      remaining: acc.remaining + vendor.remaining
    }), { total: 0, paid: 0, remaining: 0 });
  };

  const ourPaymentsSummary = calculateOurPaymentsSummary();

  // Group vendors by exact due date for timeline view
  const groupVendorsByDate = () => {
    const today = new Date();
    const dateGroups = {};
    const noDateVendors = [];

    vendors.forEach(vendor => {
      if (!vendor.dueDate) {
        noDateVendors.push(vendor);
        return;
      }

      const dateKey = vendor.dueDate; // Use the date string as key
      if (!dateGroups[dateKey]) {
        dateGroups[dateKey] = {
          date: vendor.dueDate,
          vendors: [],
          isOverdue: false,
          monthYear: new Date(vendor.dueDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
      }
      
      dateGroups[dateKey].vendors.push(vendor);
      
      // Check if overdue
      const dueDate = new Date(vendor.dueDate);
      if (dueDate < today) {
        dateGroups[dateKey].isOverdue = true;
      }
    });

    // Sort dates chronologically
    const sortedDates = Object.values(dateGroups).sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      dateGroups: sortedDates,
      noDate: noDateVendors
    };
  };

  // Filter vendors based on date filter
  const getFilteredVendors = () => {
    return vendors.filter(vendor => {
      // Handle no date filter
      if (!vendor.dueDate) {
        return dateFilter.showNoDate;
      }

      const vendorDate = new Date(vendor.dueDate);
      const today = new Date();
      
      // Check overdue/upcoming filter
      const isOverdue = vendorDate < today;
      if (isOverdue && !dateFilter.showOverdue) return false;
      if (!isOverdue && !dateFilter.showUpcoming) return false;

      // Check date range filter
      if (dateFilter.startDate) {
        const startDate = new Date(dateFilter.startDate);
        if (vendorDate < startDate) return false;
      }
      
      if (dateFilter.endDate) {
        const endDate = new Date(dateFilter.endDate);
        if (vendorDate > endDate) return false;
      }

      return true;
    });
  };

  const filteredVendors = getFilteredVendors();

  // Group filtered vendors by date
  const groupFilteredVendorsByDate = () => {
    const today = new Date();
    const dateGroups = {};
    const noDateVendors = [];

    filteredVendors.forEach(vendor => {
      if (!vendor.dueDate) {
        noDateVendors.push(vendor);
        return;
      }

      const dateKey = vendor.dueDate;
      if (!dateGroups[dateKey]) {
        dateGroups[dateKey] = {
          date: vendor.dueDate,
          vendors: [],
          isOverdue: false,
          monthYear: new Date(vendor.dueDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
      }
      
      dateGroups[dateKey].vendors.push(vendor);
      
      const dueDate = new Date(vendor.dueDate);
      if (dueDate < today) {
        dateGroups[dateKey].isOverdue = true;
      }
    });

    const sortedDates = Object.values(dateGroups).sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      dateGroups: sortedDates,
      noDate: noDateVendors
    };
  };

  const vendorsByDate = groupFilteredVendorsByDate();

  // Calculate totals for filtered Our Payments table (Us + Michaela only from filtered vendors)
  const calculateFilteredOurPaymentsSummary = () => {
    const ourFilteredVendors = filteredVendors.filter(vendor => vendor.responsibility === 'Us' || vendor.responsibility === 'Michaela');
    
    return ourFilteredVendors.reduce((acc, vendor) => ({
      total: acc.total + vendor.total,
      paid: acc.paid + vendor.paid,
      remaining: acc.remaining + vendor.remaining
    }), { total: 0, paid: 0, remaining: 0 });
  };

  const filteredOurPaymentsSummary = calculateFilteredOurPaymentsSummary();

  // Calculate totals for vendors due on September 4th only (for header dashboard)
  const calculateSept4Summary = () => {
    const sept4Vendors = vendors.filter(vendor => 
      vendor.dueDate === '2025-09-04' && 
      (vendor.responsibility === 'Us' || vendor.responsibility === 'Michaela')
    );
    
    return sept4Vendors.reduce((acc, vendor) => ({
      total: acc.total + vendor.total,
      paid: acc.paid + vendor.paid,
      remaining: acc.remaining + vendor.remaining
    }), { total: 0, paid: 0, remaining: 0 });
  };

  const sept4Summary = calculateSept4Summary();

  // Calculate total savings
  const totalSavings = ourFinances.michaelaSavings + ourFinances.arringtonSavings + ourFinances.jointSavings;

  // Sorting functions
  const handleSort = (column) => {
    const newDirection = tableSorting.column === column && tableSorting.direction === 'asc' ? 'desc' : 'asc';
    setTableSorting({ column, direction: newDirection });
  };

  // Wedding Todo functions
  const addWeddingTodo = () => {
    if (newTodo.task.trim()) {
      const todo = {
        ...newTodo,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      setWeddingTodos([...weddingTodos, todo]);
      setNewTodo({ task: '', dueDate: '', completed: false });
      setShowAddTodo(false);
    }
  };

  const toggleTodoComplete = (id) => {
    setWeddingTodos(weddingTodos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setWeddingTodos(weddingTodos.filter(todo => todo.id !== id));
  };

  const getSortedVendors = (vendorsToSort) => {
    if (!tableSorting.column) return vendorsToSort;

    return [...vendorsToSort].sort((a, b) => {
      let aValue, bValue;

      switch (tableSorting.column) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'total':
          aValue = a.total;
          bValue = b.total;
          break;
        case 'paid':
          aValue = a.paid;
          bValue = b.paid;
          break;
        case 'remaining':
          aValue = a.remaining;
          bValue = b.remaining;
          break;
        case 'dueDate':
          aValue = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31'); // Put items without dates at the end
          bValue = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
          break;
        case 'responsibility':
          aValue = a.responsibility || 'Us';
          bValue = b.responsibility || 'Us';
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return tableSorting.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return tableSorting.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const getSortIcon = (column) => {
    if (tableSorting.column !== column) {
      return <ArrowUpDown className="w-4 h-4 ml-1 text-gray-400" />;
    }
    return tableSorting.direction === 'asc' 
      ? <ArrowUp className="w-4 h-4 ml-1 text-blue-600" />
      : <ArrowDown className="w-4 h-4 ml-1 text-blue-600" />;
  };

  // Debug function to reset data
  const resetToDefaultData = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Fix existing vendors that don't have responsibility field
  const fixVendorResponsibilities = () => {
    const updatedVendors = vendors.map(vendor => {
      if (!vendor.responsibility || vendor.responsibility === 'undefined') {
        // Assign responsibility based on vendor name/type
        let responsibility = 'Us'; // default
        
        if (vendor.name.includes('Photography')) responsibility = 'Us';
        else if (vendor.name.includes('Cake')) responsibility = 'Us';
        else if (vendor.name.includes('DJ')) responsibility = 'Us';
        else if (vendor.name.includes('Makeup')) responsibility = 'Michaela';
        else if (vendor.name.includes('Honeymoon')) responsibility = 'Us';
        else if (vendor.name.includes('Bar')) responsibility = 'Us';
        
        return { ...vendor, responsibility };
      }
      return vendor;
    });
    
    setVendors(updatedVendors);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <div></div>
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Wedding Financial Planner
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={fixVendorResponsibilities}
                className="text-xs bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded"
                title="Fix missing responsibilities"
              >
                Fix Responsibilities
              </button>
              <button
                onClick={resetToDefaultData}
                className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                title="Reset to default data"
              >
                Reset Data
              </button>
            </div>
          </div>
          <p className="text-center text-gray-600">October Wedding - M&A</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Due Sept 4th</p>
                  <p className="text-2xl font-bold text-red-700">${sept4Summary.remaining.toLocaleString()}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Saved</p>
                  <p className="text-2xl font-bold text-green-700">${totalSavings.toLocaleString()}</p>
                </div>
                <PiggyBank className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${totalSavings >= sept4Summary.remaining ? 'bg-gradient-to-r from-green-100 to-emerald-100' : 'bg-gradient-to-r from-orange-100 to-red-100'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{totalSavings >= sept4Summary.remaining ? 'Surplus' : 'Shortfall'}</p>
                  <p className={`text-2xl font-bold ${totalSavings >= sept4Summary.remaining ? 'text-green-700' : 'text-red-700'}`}>
                    ${Math.abs(totalSavings - sept4Summary.remaining).toLocaleString()}
                  </p>
                </div>
                <TrendingUp className={`w-8 h-8 ${totalSavings >= sept4Summary.remaining ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Days Until Wedding</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {Math.max(0, Math.ceil((new Date('2025-10-04') - new Date()) / (1000 * 60 * 60 * 24)))}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex space-x-4 mb-6 border-b">
            <button
              onClick={() => setActiveTab('our-payments')}
              className={`pb-2 px-4 font-semibold transition-colors ${
                activeTab === 'our-payments' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Our Payments
            </button>
            <button
              onClick={() => setActiveTab('finances')}
              className={`pb-2 px-4 font-semibold transition-colors ${
                activeTab === 'finances' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Financial Planning
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`pb-2 px-4 font-semibold transition-colors ${
                activeTab === 'vendors' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Vendors & Expenses
            </button>
            <button
              onClick={() => setActiveTab('todos')}
              className={`pb-2 px-4 font-semibold transition-colors ${
                activeTab === 'todos' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Wedding Todo ✨
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`pb-2 px-4 font-semibold transition-colors ${
                activeTab === 'summary' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Summary
            </button>
          </div>

          {activeTab === 'our-payments' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-2 text-center">M&A Wedding Dashboard</h2>
                <p className="text-center text-gray-600 mb-2">Wedding: October 4, 2025 (2 months away)</p>
              </div>

              {/* One-Glance Dashboard */}
              <div className="bg-white p-6 rounded-lg border shadow">
                <h3 className="text-xl font-bold mb-4">📊 One-Glance Dashboard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Total Budget</span>
                      <span className="font-bold text-lg">${ourPaymentsSummary.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Paid so far</span>
                      <div className="text-right">
                        <span className="font-bold text-lg text-green-600">${ourPaymentsSummary.paid.toLocaleString()}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: `${(ourPaymentsSummary.paid/ourPaymentsSummary.total)*100}%`}}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Remaining Balance</span>
                      <div className="text-right">
                        <span className="font-bold text-lg text-red-600">${ourPaymentsSummary.remaining.toLocaleString()}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-red-500 h-2 rounded-full" style={{width: `${(ourPaymentsSummary.remaining/ourPaymentsSummary.total)*100}%`}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Savings on hand</span>
                      <span className="font-bold text-lg text-blue-600">
                        ${(ourFinances.michaelaSavings + ourFinances.arringtonSavings + ourFinances.jointSavings).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Gap to Close</span>
                      <span className="font-bold text-lg text-orange-600">
                        ${Math.max(ourPaymentsSummary.remaining - (ourFinances.michaelaSavings + ourFinances.arringtonSavings + ourFinances.jointSavings), 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Months until Oct 4, 2025</span>
                      <span className="font-bold text-lg">2</span>
                    </div>
                    <div className="flex justify-between py-2 border-b bg-yellow-50 px-2">
                      <span className="font-medium">Monthly Save Target</span>
                      <span className="font-bold text-xl text-purple-700">
                        ${Math.ceil(Math.max(ourPaymentsSummary.remaining - (ourFinances.michaelaSavings + ourFinances.arringtonSavings + ourFinances.jointSavings), 0) / 2).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Tracker */}
              <div className="bg-green-50 p-6 rounded-lg border">
                <h3 className="text-xl font-bold mb-4">💰 Savings Tracker</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Michaela</label>
                    <input
                      type="number"
                      value={ourFinances.michaelaSavings}
                      onChange={(e) => setOurFinances({...ourFinances, michaelaSavings: parseFloat(e.target.value) || 0})}
                      className="w-full px-3 py-2 border rounded-lg text-lg font-semibold"
                      placeholder="2000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Arrington</label>
                    <input
                      type="number"
                      value={ourFinances.arringtonSavings}
                      onChange={(e) => setOurFinances({...ourFinances, arringtonSavings: parseFloat(e.target.value) || 0})}
                      className="w-full px-3 py-2 border rounded-lg text-lg font-semibold"
                      placeholder="7469"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Joint</label>
                    <input
                      type="number"
                      value={ourFinances.jointSavings}
                      onChange={(e) => setOurFinances({...ourFinances, jointSavings: parseFloat(e.target.value) || 0})}
                      className="w-full px-3 py-2 border rounded-lg text-lg font-semibold"
                      placeholder="0"
                    />
                  </div>
                  <div className="bg-white p-3 rounded-lg border-2 border-green-300">
                    <label className="block text-sm font-medium mb-2">Total</label>
                    <div className="text-2xl font-bold text-green-700">
                      ${(ourFinances.michaelaSavings + ourFinances.arringtonSavings + ourFinances.jointSavings).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vendor & Cost Detail Table */}
              <div className="bg-white p-6 rounded-lg border shadow">
                <h3 className="text-xl font-bold mb-4">📋 Vendor & Cost Detail 
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    ({filteredVendors.filter(vendor => vendor.responsibility === 'Us' || vendor.responsibility === 'Michaela').length} filtered vendors)
                  </span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th 
                          className="text-left p-3 font-semibold cursor-pointer hover:bg-gray-100 select-none"
                          onClick={() => handleSort('name')}
                        >
                          <div className="flex items-center">
                            Vendor / Item
                            {getSortIcon('name')}
                          </div>
                        </th>
                        <th 
                          className="text-right p-3 font-semibold cursor-pointer hover:bg-gray-100 select-none"
                          onClick={() => handleSort('total')}
                        >
                          <div className="flex items-center justify-end">
                            Cost
                            {getSortIcon('total')}
                          </div>
                        </th>
                        <th 
                          className="text-right p-3 font-semibold cursor-pointer hover:bg-gray-100 select-none"
                          onClick={() => handleSort('paid')}
                        >
                          <div className="flex items-center justify-end">
                            Paid
                            {getSortIcon('paid')}
                          </div>
                        </th>
                        <th 
                          className="text-right p-3 font-semibold cursor-pointer hover:bg-gray-100 select-none"
                          onClick={() => handleSort('remaining')}
                        >
                          <div className="flex items-center justify-end">
                            Remaining
                            {getSortIcon('remaining')}
                          </div>
                        </th>
                        <th 
                          className="text-center p-3 font-semibold cursor-pointer hover:bg-gray-100 select-none"
                          onClick={() => handleSort('responsibility')}
                        >
                          <div className="flex items-center justify-center">
                            Responsibility
                            {getSortIcon('responsibility')}
                          </div>
                        </th>
                        <th 
                          className="text-center p-3 font-semibold cursor-pointer hover:bg-gray-100 select-none"
                          onClick={() => handleSort('dueDate')}
                        >
                          <div className="flex items-center justify-center">
                            Due Date
                            {getSortIcon('dueDate')}
                          </div>
                        </th>
                        <th className="text-left p-3 font-semibold">Notes / Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSortedVendors(filteredVendors.filter(vendor => vendor.responsibility === 'Us' || vendor.responsibility === 'Michaela')).map(vendor => (
                        <tr key={vendor.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{vendor.name}</td>
                          <td className="text-right p-3">${vendor.total.toLocaleString()}</td>
                          <td className="text-right p-3 text-green-600">${vendor.paid.toLocaleString()}</td>
                          <td className="text-right p-3 text-red-600 font-semibold">${vendor.remaining.toLocaleString()}</td>
                          <td className="text-center p-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              vendor.responsibility === 'Us' ? 'bg-blue-100 text-blue-800' :
                              vendor.responsibility === 'Michaela' ? 'bg-pink-100 text-pink-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {vendor.responsibility || 'Us'}
                            </span>
                          </td>
                          <td className="text-center p-3">
                            <span className="text-sm">
                              {vendor.dueDate ? new Date(vendor.dueDate).toLocaleDateString() : 'TBD'}
                            </span>
                          </td>
                          <td className="p-3 text-sm">{vendor.notes || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-100 font-bold border-t-2">
                        <td className="p-3">Totals</td>
                        <td className="text-right p-3">${filteredOurPaymentsSummary.total.toLocaleString()}</td>
                        <td className="text-right p-3 text-green-600">${filteredOurPaymentsSummary.paid.toLocaleString()}</td>
                        <td className="text-right p-3 text-red-600">${filteredOurPaymentsSummary.remaining.toLocaleString()}</td>
                        <td className="text-center p-3">—</td>
                        <td className="text-center p-3">—</td>
                        <td className="p-3">—</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Date Filter Controls */}
              <div className="bg-gray-50 p-4 rounded-lg border mb-4">
                <h4 className="font-semibold mb-3">Filter by Due Date</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Date Range</label>
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={dateFilter.startDate}
                        onChange={(e) => setDateFilter({...dateFilter, startDate: e.target.value})}
                        className="px-3 py-2 border rounded text-sm"
                        placeholder="Start date"
                      />
                      <input
                        type="date"
                        value={dateFilter.endDate}
                        onChange={(e) => setDateFilter({...dateFilter, endDate: e.target.value})}
                        className="px-3 py-2 border rounded text-sm"
                        placeholder="End date"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Show Items</label>
                    <div className="space-y-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={dateFilter.showOverdue}
                          onChange={(e) => setDateFilter({...dateFilter, showOverdue: e.target.checked})}
                          className="mr-2"
                        />
                        <span className="text-sm">Overdue</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={dateFilter.showUpcoming}
                          onChange={(e) => setDateFilter({...dateFilter, showUpcoming: e.target.checked})}
                          className="mr-2"
                        />
                        <span className="text-sm">Upcoming</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={dateFilter.showNoDate}
                          onChange={(e) => setDateFilter({...dateFilter, showNoDate: e.target.checked})}
                          className="mr-2"
                        />
                        <span className="text-sm">No Date Set</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={() => setDateFilter({
                        startDate: '',
                        endDate: '',
                        showOverdue: true,
                        showUpcoming: true,
                        showNoDate: true
                      })}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Timeline by Date */}
              <div className="bg-white p-6 rounded-lg border shadow">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                  📅 Payment Timeline by Date
                  <span className="ml-2 text-sm font-normal text-gray-600">
                    ({filteredVendors.length} vendors)
                  </span>
                </h3>
                
                <div className="space-y-6">
                  {vendorsByDate.dateGroups.map((dateGroup, index) => {
                    const today = new Date();
                    const groupDate = new Date(dateGroup.date);
                    const isOverdue = groupDate < today;
                    const diffTime = groupDate - today;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    // Determine urgency level
                    let urgencyClass = 'bg-green-50 border-green-200';
                    let textClass = 'text-green-800';
                    let urgencyIcon = <Calendar className="w-4 h-4 mr-1" />;
                    
                    if (isOverdue) {
                      urgencyClass = 'bg-red-50 border-red-200';
                      textClass = 'text-red-800';
                      urgencyIcon = <AlertCircle className="w-4 h-4 mr-1" />;
                    } else if (diffDays <= 7) {
                      urgencyClass = 'bg-orange-50 border-orange-200';
                      textClass = 'text-orange-800';
                      urgencyIcon = <AlertCircle className="w-4 h-4 mr-1" />;
                    } else if (diffDays <= 30) {
                      urgencyClass = 'bg-yellow-50 border-yellow-200';
                      textClass = 'text-yellow-800';
                      urgencyIcon = <Calendar className="w-4 h-4 mr-1" />;
                    }
                    
                    const totalCost = dateGroup.vendors.reduce((sum, vendor) => sum + vendor.remaining, 0);
                    
                    return (
                      <div key={dateGroup.date} className={`p-4 rounded-lg border ${urgencyClass}`}>
                        <h4 className={`font-semibold mb-3 flex items-center ${textClass}`}>
                          {urgencyIcon}
                          {dateGroup.monthYear} - {new Date(dateGroup.date).toLocaleDateString()} ({dateGroup.vendors.length})
                          {isOverdue && <span className="ml-2 px-2 py-1 bg-red-200 text-red-800 text-xs rounded">OVERDUE</span>}
                        </h4>
                        
                        <div className="space-y-2">
                          {dateGroup.vendors.map(vendor => (
                            <div key={vendor.id} className="text-sm">
                              <div className="flex justify-between items-start">
                                <span className={`font-medium ${textClass.replace('800', '700')}`}>{vendor.name}</span>
                                <span className={`font-bold ${textClass.replace('800', '600')}`}>${vendor.remaining.toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                          
                          <div className="border-t pt-2 mt-2">
                            <div className={`flex justify-between font-bold ${textClass}`}>
                              <span>Total:</span>
                              <span>${totalCost.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* No Date Set */}
                  {vendorsByDate.noDate.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        No Date Set ({vendorsByDate.noDate.length})
                      </h4>
                      <div className="space-y-2">
                        {vendorsByDate.noDate.map(vendor => (
                          <div key={vendor.id} className="text-sm">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-gray-700">{vendor.name}</span>
                              <span className="text-gray-600 font-bold">${vendor.remaining.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-bold text-gray-800">
                            <span>Total:</span>
                            <span>${vendorsByDate.noDate.reduce((sum, v) => sum + v.remaining, 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}


          {activeTab === 'finances' && (
            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">M&A Financial Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Our Expenses</h3>
                    <div className="space-y-2">
                      {vendors.filter(v => v.remainingBy === 'Us').map(vendor => (
                        <div key={vendor.id} className="flex justify-between py-1 border-b">
                          <span className="text-gray-700">{vendor.name}</span>
                          <span className="font-semibold">${vendor.remaining.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex justify-between py-2 font-bold text-lg">
                        <span>Total We Owe:</span>
                        <span className="text-purple-700">${budgetSummary.ourRemaining.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Payment Timeline</h3>
                    <div className="space-y-3">
                      {vendors
                        .filter(v => v.remainingBy === 'Us' && v.remaining > 0)
                        .map(vendor => (
                          <div key={vendor.id} className="bg-white p-3 rounded border">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{vendor.name}</p>
                                {vendor.notes && <p className="text-sm text-gray-500">{vendor.notes}</p>}
                              </div>
                              <span className="font-semibold text-red-600">${vendor.remaining.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Incoming Funds Tracker</h3>
                  <button
                    onClick={() => setShowAddFund(true)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Fund Source</span>
                  </button>
                </div>

                {showAddFund && (
                  <div className="bg-white p-4 rounded-lg mb-4 border">
                    <h4 className="font-semibold mb-3">Add New Fund Source</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Source (e.g., Tax Refund, Gift)"
                        value={newFund.source}
                        onChange={(e) => setNewFund({...newFund, source: e.target.value})}
                        className="px-3 py-2 border rounded"
                      />
                      <input
                        type="number"
                        placeholder="Amount"
                        value={newFund.amount}
                        onChange={(e) => setNewFund({...newFund, amount: e.target.value})}
                        className="px-3 py-2 border rounded"
                      />
                      <input
                        type="date"
                        placeholder="Expected Date"
                        value={newFund.dateExpected}
                        onChange={(e) => setNewFund({...newFund, dateExpected: e.target.value})}
                        className="px-3 py-2 border rounded"
                      />
                      <select
                        value={newFund.status}
                        onChange={(e) => setNewFund({...newFund, status: e.target.value})}
                        className="px-3 py-2 border rounded"
                      >
                        <option value="expected">Expected</option>
                        <option value="received">Received</option>
                      </select>
                      <textarea
                        placeholder="Notes"
                        value={newFund.notes}
                        onChange={(e) => setNewFund({...newFund, notes: e.target.value})}
                        className="px-3 py-2 border rounded md:col-span-2"
                        rows="2"
                      />
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={handleAddFund}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Add Fund
                      </button>
                      <button
                        onClick={() => setShowAddFund(false)}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {incomingFunds.map(fund => {
                    const isEditing = editingFund && editingFund.id === fund.id;
                    
                    return (
                      <div key={fund.id} className={`p-4 rounded-lg border ${fund.status === 'received' ? 'bg-green-100 border-green-300' : 'bg-white'}`}>
                        {isEditing ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={editingFund.source}
                                onChange={(e) => setEditingFund({...editingFund, source: e.target.value})}
                                className="px-3 py-2 border rounded"
                              />
                              <input
                                type="number"
                                value={editingFund.amount}
                                onChange={(e) => setEditingFund({...editingFund, amount: parseFloat(e.target.value) || 0})}
                                className="px-3 py-2 border rounded"
                              />
                              <input
                                type="date"
                                value={editingFund.dateExpected}
                                onChange={(e) => setEditingFund({...editingFund, dateExpected: e.target.value})}
                                className="px-3 py-2 border rounded"
                              />
                              <select
                                value={editingFund.status}
                                onChange={(e) => setEditingFund({...editingFund, status: e.target.value})}
                                className="px-3 py-2 border rounded"
                              >
                                <option value="expected">Expected</option>
                                <option value="received">Received</option>
                              </select>
                            </div>
                            <div className="flex space-x-2">
                              <button onClick={handleSaveFund} className="text-green-600 hover:text-green-800">
                                <Save className="w-5 h-5" />
                              </button>
                              <button onClick={() => setEditingFund(null)} className="text-gray-600 hover:text-gray-800">
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold">{fund.source}</h4>
                                {fund.status === 'received' && (
                                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Received</span>
                                )}
                              </div>
                              <p className="text-2xl font-bold text-green-700 mt-1">${fund.amount.toLocaleString()}</p>
                              <div className="text-sm text-gray-600 mt-1">
                                {fund.status === 'expected' ? (
                                  <p>Expected: {fund.dateExpected || 'Not set'}</p>
                                ) : (
                                  <p>Received: {fund.dateReceived}</p>
                                )}
                                {fund.notes && <p className="italic">{fund.notes}</p>}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {fund.status === 'expected' && (
                                <button
                                  onClick={() => markFundReceived(fund.id)}
                                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                >
                                  Mark Received
                                </button>
                              )}
                              <button onClick={() => setEditingFund(fund)} className="text-blue-600 hover:text-blue-800">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteFund(fund.id)} className="text-red-600 hover:text-red-800">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border">
                  <h4 className="font-semibold mb-2">Funds Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Expected:</span>
                      <span className="font-semibold">${budgetSummary.totalExpectedFunds.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Already Received:</span>
                      <span className="font-semibold text-green-600">${budgetSummary.receivedFunds.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Still Pending:</span>
                      <span className="font-semibold text-orange-600">${budgetSummary.pendingFunds.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <span>Our Total Costs:</span>
                        <span className="font-semibold">${budgetSummary.ourRemaining.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold mt-1">
                        <span>{budgetSummary.shortfall > 0 ? 'Shortfall:' : 'Surplus:'}</span>
                        <span className={budgetSummary.shortfall > 0 ? 'text-red-600' : 'text-green-600'}>
                          ${Math.abs(budgetSummary.shortfall).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {budgetSummary.shortfall > 0 && (
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <AlertCircle className="w-6 h-6 mr-2 text-yellow-600" />
                    Action Needed
                  </h3>
                  <p className="text-gray-700 mb-3">
                    You need an additional <span className="font-bold text-red-600">${budgetSummary.shortfall.toLocaleString()}</span> to cover all your wedding expenses.
                  </p>
                  <p className="text-sm text-gray-600">Consider:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                    <li>Setting up a dedicated savings plan</li>
                    <li>Looking for additional income sources</li>
                    <li>Reviewing expenses to see what can be reduced</li>
                    <li>Setting up a payment plan with vendors</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'vendors' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-bold">All Vendors & Expenses</h2>
                  <span className="text-sm text-gray-600">({filteredVendors.length} vendors)</span>
                  {completedVendors.length > 0 && (
                    <button
                      onClick={() => setShowCompletedVendors(!showCompletedVendors)}
                      className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{showCompletedVendors ? 'Hide' : 'Show'} Completed ({completedVendors.length})</span>
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setShowAddVendor(true)}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Vendor</span>
                </button>
              </div>

              {/* Date Filter Controls for Vendors & Expenses */}
              <div className="bg-gray-50 p-4 rounded-lg border mb-4">
                <h4 className="font-semibold mb-3">Filter by Due Date</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Date Range</label>
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={dateFilter.startDate}
                        onChange={(e) => setDateFilter({...dateFilter, startDate: e.target.value})}
                        className="px-3 py-2 border rounded text-sm"
                        placeholder="Start date"
                      />
                      <input
                        type="date"
                        value={dateFilter.endDate}
                        onChange={(e) => setDateFilter({...dateFilter, endDate: e.target.value})}
                        className="px-3 py-2 border rounded text-sm"
                        placeholder="End date"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Show Items</label>
                    <div className="space-y-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={dateFilter.showOverdue}
                          onChange={(e) => setDateFilter({...dateFilter, showOverdue: e.target.checked})}
                          className="mr-2"
                        />
                        <span className="text-sm">Overdue</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={dateFilter.showUpcoming}
                          onChange={(e) => setDateFilter({...dateFilter, showUpcoming: e.target.checked})}
                          className="mr-2"
                        />
                        <span className="text-sm">Upcoming</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={dateFilter.showNoDate}
                          onChange={(e) => setDateFilter({...dateFilter, showNoDate: e.target.checked})}
                          className="mr-2"
                        />
                        <span className="text-sm">No Date Set</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={() => setDateFilter({
                        startDate: '',
                        endDate: '',
                        showOverdue: true,
                        showUpcoming: true,
                        showNoDate: true
                      })}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>

              {showAddVendor && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-3">Add New Vendor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Vendor Name"
                      value={newVendor.name}
                      onChange={(e) => setNewVendor({...newVendor, name: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Total Cost"
                      value={newVendor.total}
                      onChange={(e) => setNewVendor({...newVendor, total: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Amount Paid"
                      value={newVendor.paid}
                      onChange={(e) => setNewVendor({...newVendor, paid: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Paid By"
                      value={newVendor.paidBy}
                      onChange={(e) => setNewVendor({...newVendor, paidBy: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <select
                      value={newVendor.remainingBy}
                      onChange={(e) => setNewVendor({...newVendor, remainingBy: e.target.value})}
                      className="px-3 py-2 border rounded"
                    >
                      <option value="Us">Us (M&A)</option>
                      <option value="Parents">Parents</option>
                      <option value="Michaela">Michaela</option>
                      <option value="Arrington">Arrington</option>
                    </select>
                    <select
                      value={newVendor.responsibility}
                      onChange={(e) => setNewVendor({...newVendor, responsibility: e.target.value})}
                      className="px-3 py-2 border rounded"
                    >
                      <option value="">Responsibility</option>
                      <option value="Us">Us (M&A)</option>
                      <option value="Michaela">Michaela</option>
                      <option value="Parents">Parents</option>
                    </select>
                    <input
                      type="date"
                      placeholder="Due Date"
                      value={newVendor.dueDate}
                      onChange={(e) => setNewVendor({...newVendor, dueDate: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <select
                      value={newVendor.status}
                      onChange={(e) => setNewVendor({...newVendor, status: e.target.value})}
                      className="px-3 py-2 border rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Payment Link"
                      value={newVendor.link}
                      onChange={(e) => setNewVendor({...newVendor, link: e.target.value})}
                      className="px-3 py-2 border rounded"
                    />
                    <textarea
                      placeholder="Notes"
                      value={newVendor.notes}
                      onChange={(e) => setNewVendor({...newVendor, notes: e.target.value})}
                      className="px-3 py-2 border rounded md:col-span-2"
                      rows="2"
                    />
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={handleAddVendor}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Add Vendor
                    </button>
                    <button
                      onClick={() => setShowAddVendor(false)}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3">Vendor</th>
                      <th className="text-right p-3">Total</th>
                      <th className="text-right p-3">Paid</th>
                      <th className="text-right p-3">Remaining</th>
                      <th className="text-center p-3">Due Date</th>
                      <th className="text-center p-3">Responsibility</th>
                      <th className="text-center p-3">Status</th>
                      <th className="text-center p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVendors.map((vendor) => {
                      const paidPercentage = vendor.total > 0 ? (vendor.paid / vendor.total) * 100 : 0;
                      const isEditing = editingVendor && editingVendor.id === vendor.id;
                      
                      return (
                        <tr key={vendor.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            {isEditing ? (
                              <div>
                                <input
                                  type="text"
                                  value={editingVendor.name}
                                  onChange={(e) => setEditingVendor({...editingVendor, name: e.target.value})}
                                  className="w-full px-2 py-1 border rounded mb-1"
                                />
                                <textarea
                                  value={editingVendor.notes || ''}
                                  onChange={(e) => setEditingVendor({...editingVendor, notes: e.target.value})}
                                  className="w-full px-2 py-1 border rounded text-xs"
                                  placeholder="Notes"
                                  rows="2"
                                />
                              </div>
                            ) : (
                              <div>
                                <p className="font-semibold">{vendor.name}</p>
                                {vendor.notes && (
                                  <p className="text-sm text-gray-500 mt-1">{vendor.notes}</p>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="text-right p-3">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editingVendor.total}
                                onChange={(e) => setEditingVendor({...editingVendor, total: parseFloat(e.target.value) || 0})}
                                className="w-24 px-2 py-1 border rounded text-right"
                              />
                            ) : (
                              `$${vendor.total.toLocaleString()}`
                            )}
                          </td>
                          <td className="text-right p-3">
                            {isEditing ? (
                              <div>
                                <input
                                  type="number"
                                  value={editingVendor.paid}
                                  onChange={(e) => setEditingVendor({...editingVendor, paid: parseFloat(e.target.value) || 0})}
                                  className="w-24 px-2 py-1 border rounded text-right mb-1"
                                />
                                <input
                                  type="text"
                                  value={editingVendor.paidBy}
                                  onChange={(e) => setEditingVendor({...editingVendor, paidBy: e.target.value})}
                                  className="w-24 px-2 py-1 border rounded text-xs"
                                  placeholder="Paid by"
                                />
                              </div>
                            ) : (
                              <div>
                                <p>${vendor.paid.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">{vendor.paidBy}</p>
                              </div>
                            )}
                          </td>
                          <td className="text-right p-3">
                            {isEditing ? (
                              <div>
                                <p className="font-semibold text-red-600 mb-1">
                                  ${(editingVendor.total - editingVendor.paid).toLocaleString()}
                                </p>
                                <select
                                  value={editingVendor.remainingBy}
                                  onChange={(e) => setEditingVendor({...editingVendor, remainingBy: e.target.value})}
                                  className="w-24 px-2 py-1 border rounded text-xs"
                                >
                                  <option value="Us">Us</option>
                                  <option value="Parents">Parents</option>
                                  <option value="Michaela">Michaela</option>
                                  <option value="Arrington">Arrington</option>
                                </select>
                              </div>
                            ) : (
                              <div>
                                <p className={`font-semibold ${vendor.remainingBy === 'Us' ? 'text-purple-600' : 'text-gray-600'}`}>
                                  ${vendor.remaining.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">{vendor.remainingBy}</p>
                              </div>
                            )}
                          </td>
                          <td className="text-center p-3">
                            {isEditing ? (
                              <input
                                type="date"
                                value={editingVendor.dueDate || ''}
                                onChange={(e) => setEditingVendor({...editingVendor, dueDate: e.target.value})}
                                className="px-2 py-1 border rounded text-xs"
                              />
                            ) : (
                              <span className="text-sm">
                                {vendor.dueDate ? new Date(vendor.dueDate).toLocaleDateString() : 'TBD'}
                              </span>
                            )}
                          </td>
                          <td className="text-center p-3">
                            {isEditing ? (
                              <select
                                value={editingVendor.responsibility || 'Us'}
                                onChange={(e) => setEditingVendor({...editingVendor, responsibility: e.target.value})}
                                className="px-2 py-1 border rounded text-xs"
                              >
                                <option value="Us">Us</option>
                                <option value="Michaela">Michaela</option>
                                <option value="Parents">Parents</option>
                              </select>
                            ) : (
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                vendor.responsibility === 'Us' ? 'bg-blue-100 text-blue-800' :
                                vendor.responsibility === 'Michaela' ? 'bg-pink-100 text-pink-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {vendor.responsibility || 'Us'}
                              </span>
                            )}
                          </td>
                          <td className="text-center p-3">
                            {isEditing ? (
                              <select
                                value={editingVendor.status || 'pending'}
                                onChange={(e) => setEditingVendor({...editingVendor, status: e.target.value})}
                                className="px-2 py-1 border rounded text-xs"
                              >
                                <option value="pending">Pending</option>
                                <option value="contacted">Contacted</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="paid">Paid</option>
                                <option value="overdue">Overdue</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                vendor.status === 'paid' ? 'bg-green-100 text-green-800' :
                                vendor.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                vendor.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                                vendor.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                vendor.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {vendor.status ? vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1) : 'Pending'}
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  paidPercentage === 100 
                                    ? 'bg-green-500' 
                                    : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                                }`}
                                style={{ width: `${paidPercentage}%` }}
                              />
                            </div>
                            <p className="text-xs text-center mt-1">{Math.round(paidPercentage)}%</p>
                          </td>
                          <td className="text-center p-3">
                            <div className="flex items-center justify-center space-x-2">
                              {isEditing ? (
                                <>
                                  <button
                                    onClick={handleSaveVendor}
                                    className="text-green-600 hover:text-green-800"
                                  >
                                    <Save className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditingVendor(null)}
                                    className="text-gray-600 hover:text-gray-800"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  {vendor.remaining === 0 || paidPercentage === 100 ? (
                                    <button
                                      onClick={() => markVendorCompleted(vendor.id)}
                                      className="text-green-600 hover:text-green-800 bg-green-50 px-2 py-1 rounded text-xs font-medium"
                                      title="Mark as completed and remove from list"
                                    >
                                      ✓ Complete
                                    </button>
                                  ) : null}
                                  <button
                                    onClick={() => setEditingVendor({...vendor})}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteVendor(vendor.id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                  {vendor.link && (
                                    <a 
                                      href={vendor.link} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-purple-600 hover:text-purple-800"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-100 font-semibold">
                      <td className="p-3">Total</td>
                      <td className="text-right p-3">${budgetSummary.total.toLocaleString()}</td>
                      <td className="text-right p-3">${budgetSummary.paid.toLocaleString()}</td>
                      <td className="text-right p-3 text-red-600">
                        ${budgetSummary.remaining.toLocaleString()}
                      </td>
                      <td className="text-center p-3">—</td>
                      <td className="text-center p-3">
                        {Math.round((budgetSummary.paid / budgetSummary.total) * 100)}%
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Completed Vendors Section */}
              {showCompletedVendors && completedVendors.length > 0 && (
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-bold mb-4 text-green-800">✅ Completed Vendors</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-green-100 border-b">
                          <th className="text-left p-3 font-semibold">Vendor / Item</th>
                          <th className="text-right p-3 font-semibold">Total Cost</th>
                          <th className="text-center p-3 font-semibold">Completed Date</th>
                          <th className="text-center p-3 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedVendors.map((vendor) => (
                          <tr key={vendor.id} className="border-b hover:bg-green-100">
                            <td className="p-3 font-medium text-green-800">{vendor.name}</td>
                            <td className="text-right p-3 text-green-700 font-semibold">${vendor.total.toLocaleString()}</td>
                            <td className="text-center p-3 text-green-600">{vendor.completedDate}</td>
                            <td className="text-center p-3">
                              <button
                                onClick={() => restoreVendor(vendor.id)}
                                className="text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded text-xs font-medium"
                                title="Restore to active vendors"
                              >
                                ↶ Restore
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Financial Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-600 mb-2">Total Wedding Cost</h4>
                    <p className="text-3xl font-bold">${budgetSummary.total.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">All vendors combined</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-600 mb-2">Amount Paid</h4>
                    <p className="text-3xl font-bold text-green-600">${budgetSummary.paid.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">{Math.round((budgetSummary.paid / budgetSummary.total) * 100)}% complete</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-600 mb-2">Remaining Balance</h4>
                    <p className="text-3xl font-bold text-red-600">${budgetSummary.remaining.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">Left to pay</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Who Owes What</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span className="font-semibold">M&A (Us)</span>
                      <span className="text-xl font-bold text-purple-600">${budgetSummary.ourRemaining.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span className="font-semibold">Parents</span>
                      <span className="text-xl font-bold text-blue-600">${budgetSummary.parentRemaining.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Funding Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Expected Funds</span>
                      <span className="font-semibold">${budgetSummary.totalExpectedFunds.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Received</span>
                      <span className="font-semibold text-green-600">${budgetSummary.receivedFunds.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pending</span>
                      <span className="font-semibold text-orange-600">${budgetSummary.pendingFunds.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{budgetSummary.shortfall > 0 ? 'Shortfall' : 'Surplus'}</span>
                        <span className={`text-xl font-bold ${budgetSummary.shortfall > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          ${Math.abs(budgetSummary.shortfall).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Key Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded">
                    <h4 className="font-semibold mb-2">Your Largest Expenses</h4>
                    {vendors
                      .filter(v => v.remainingBy === 'Us')
                      .sort((a, b) => b.remaining - a.remaining)
                      .slice(0, 3)
                      .map(vendor => (
                        <div key={vendor.id} className="flex justify-between py-1">
                          <span className="text-sm">{vendor.name}</span>
                          <span className="text-sm font-semibold">${vendor.remaining.toLocaleString()}</span>
                        </div>
                      ))}
                  </div>
                  
                  <div className="bg-white p-4 rounded">
                    <h4 className="font-semibold mb-2">Payment Progress</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall Progress</span>
                          <span>{Math.round((budgetSummary.paid / budgetSummary.total) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${(budgetSummary.paid / budgetSummary.total) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm text-gray-600">
                          {vendors.filter(v => v.remaining === 0).length} of {vendors.length} vendors fully paid
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'todos' && (
            <div className="space-y-6">
              {/* Cute Header */}
              <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 p-8 rounded-2xl text-center">
                <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                  ✨ Wedding Planning To-Do ✨
                </h2>
                <p className="text-gray-600 font-medium">Keep track of all your wedding tasks, one magical moment at a time 💕</p>
              </div>

              {/* Add New Todo */}
              <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Add New Task</h3>
                </div>
                
                {!showAddTodo ? (
                  <button
                    onClick={() => setShowAddTodo(true)}
                    className="w-full py-4 border-2 border-dashed border-pink-200 rounded-xl text-pink-500 hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 font-medium"
                  >
                    ✨ Add a new wedding task ✨
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">What needs to be done? 💭</label>
                      <input
                        type="text"
                        value={newTodo.task}
                        onChange={(e) => setNewTodo({...newTodo, task: e.target.value})}
                        placeholder="e.g., Book wedding cake tasting..."
                        className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">When is it due? 📅</label>
                      <input
                        type="date"
                        value={newTodo.dueDate}
                        onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                        className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={addWeddingTodo}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-200 font-medium"
                      >
                        ✨ Add Task
                      </button>
                      <button
                        onClick={() => {
                          setShowAddTodo(false);
                          setNewTodo({ task: '', dueDate: '', completed: false });
                        }}
                        className="px-6 bg-gray-100 text-gray-600 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Todo List */}
              <div className="space-y-4">
                {weddingTodos.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💝</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks yet!</h3>
                    <p className="text-gray-500">Add your first wedding planning task above to get started</p>
                  </div>
                ) : (
                  <>
                    {/* Incomplete Tasks */}
                    {weddingTodos.filter(todo => !todo.completed).length > 0 && (
                      <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            To Do ({weddingTodos.filter(todo => !todo.completed).length})
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {weddingTodos
                            .filter(todo => !todo.completed)
                            .sort((a, b) => {
                              if (!a.dueDate && !b.dueDate) return 0;
                              if (!a.dueDate) return 1;
                              if (!b.dueDate) return -1;
                              return new Date(a.dueDate) - new Date(b.dueDate);
                            })
                            .map(todo => (
                              <div key={todo.id} className="group bg-pink-25 hover:bg-pink-50 p-4 rounded-xl border border-pink-100 transition-all duration-200">
                                <div className="flex items-start gap-4">
                                  <button
                                    onClick={() => toggleTodoComplete(todo.id)}
                                    className="mt-1 w-6 h-6 border-2 border-pink-300 rounded-full hover:border-pink-400 transition-colors flex items-center justify-center"
                                  >
                                    <Circle className="w-4 h-4 text-pink-300" />
                                  </button>
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-800 mb-1">{todo.task}</p>
                                    {todo.dueDate && (
                                      <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-pink-400" />
                                        <span className="text-sm text-pink-600 font-medium">
                                          {new Date(todo.dueDate).toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric',
                                            year: 'numeric'
                                          })}
                                        </span>
                                        {new Date(todo.dueDate) < new Date() && (
                                          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                            Overdue
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Completed Tasks */}
                    {weddingTodos.filter(todo => todo.completed).length > 0 && (
                      <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            Completed ✨ ({weddingTodos.filter(todo => todo.completed).length})
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {weddingTodos
                            .filter(todo => todo.completed)
                            .sort((a, b) => new Date(b.dueDate || 0) - new Date(a.dueDate || 0))
                            .map(todo => (
                              <div key={todo.id} className="group bg-green-25 hover:bg-green-50 p-4 rounded-xl border border-green-100 transition-all duration-200">
                                <div className="flex items-start gap-4">
                                  <button
                                    onClick={() => toggleTodoComplete(todo.id)}
                                    className="mt-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center hover:from-green-500 hover:to-emerald-500 transition-all"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  </button>
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-600 line-through mb-1">{todo.task}</p>
                                    {todo.dueDate && (
                                      <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-green-400" />
                                        <span className="text-sm text-green-600 font-medium">
                                          {new Date(todo.dueDate).toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric',
                                            year: 'numeric'
                                          })}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Progress Summary */}
              {weddingTodos.length > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Wedding Planning Progress</h3>
                    <div className="flex items-center justify-center gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {weddingTodos.filter(todo => todo.completed).length}
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                      <div className="text-4xl">💕</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">
                          {weddingTodos.filter(todo => !todo.completed).length}
                        </div>
                        <div className="text-sm text-gray-600">To Do</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${weddingTodos.length > 0 ? (weddingTodos.filter(todo => todo.completed).length / weddingTodos.length) * 100 : 0}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {weddingTodos.length > 0 ? Math.round((weddingTodos.filter(todo => todo.completed).length / weddingTodos.length) * 100) : 0}% Complete
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;