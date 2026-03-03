import React, { useState, useEffect, useRef } from 'react';
import { Upload, Plus, Download, FileText, ArrowLeft, X, Check, Trash2, User, Lock, Mail, Edit2 } from 'lucide-react';
import Papa from 'papaparse';
import { supabase } from './supabaseClient';
import "./App.css";

// Simple loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mb-4"></div>
      <p className="text-slate-600">Loading Ortelius...</p>
    </div>
  </div>
);

// LoginView Component (EXACT same styling)
const LoginView = ({ onLogin, onSwitchToSignup, loginForm, setLoginForm, loginError }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
    <div className="max-w-md w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Ortelius</h1>
          <p className="text-slate-600">Professional surveying calculations</p>
        </div>
        
        <form onSubmit={onLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          
          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {loginError}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-center text-slate-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-slate-900 font-medium hover:text-slate-800 transition-colors"
            >
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
);

// SignupView Component (EXACT same styling)
const SignupView = ({ onSignup, onSwitchToLogin, signupForm, setSignupForm, signupError }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
    <div className="max-w-md w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-600">Join Ortelius to start your surveying projects</p>
        </div>
        
        <form onSubmit={onSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={signupForm.name}
                onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
                required
                autoComplete="name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                value={signupForm.email}
                onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password"
                value={signupForm.password}
                onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
                placeholder="Create a password (min. 6 characters)"
                required
                autoComplete="new-password"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password"
                value={signupForm.confirmPassword}
                onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
              />
            </div>
          </div>
          
          {signupError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {signupError}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
          >
            Create Account
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-center text-slate-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-slate-900 font-medium hover:text-slate-800 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentView, setCurrentView] = useState('login');
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProjectName, setEditingProjectName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Login state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  // Check for existing session
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email);
          await loadUserProfile(session.user.email);
          await loadUserProjects(session.user.email);
          setCurrentView('home');
        } else {
          setCurrentView('login');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setCurrentView('login');
      } finally {
        setIsInitializing(false);
      }
    };
    
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        setUserEmail(session.user.email);
        await loadUserProfile(session.user.email);
        await loadUserProjects(session.user.email);
        setCurrentView('home');
      } else {
        setUserName('');
        setUserEmail('');
        setProjects([]);
        setCurrentProject(null);
        setCurrentView('login');
        setLoginForm({ email: '', password: '' });
        setSignupForm({ name: '', email: '', password: '', confirmPassword: '' });
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);

  // Load user's profile
  const loadUserProfile = async (userEmail) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('email', userEmail)
        .maybeSingle();
      
      if (error) throw error;
      
      if (data && data.full_name) {
        setUserName(data.full_name);
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.user_metadata?.full_name) {
          setUserName(user.user_metadata.full_name);
        } else {
          setUserName(userEmail.split('@')[0]);
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUserName(userEmail.split('@')[0]);
    }
  };

  // Load user's projects
  const loadUserProjects = async (userEmail) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_email', userEmail)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        const formattedProjects = data.map(project => ({
          ...project,
          createdAt: project.created_at
        }));
        setProjects(formattedProjects);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!loginForm.email || !loginForm.password) {
      setLoginError('Please fill in all fields');
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });
      
      if (error) throw error;
      
      setIsAuthenticated(true);
      setUserEmail(loginForm.email);
      await loadUserProfile(loginForm.email);
      await loadUserProjects(loginForm.email);
      setCurrentView('home');
      
    } catch (error) {
      setLoginError(error.message);
    }
  };

  // Handle signup with profile creation
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');
    
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      setSignupError('Please fill in all fields');
      return;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }
    
    if (signupForm.password.length < 6) {
      setSignupError('Password must be at least 6 characters');
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: {
          data: {
            full_name: signupForm.name,
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        let profileCreated = false;
        let retries = 0;
        const maxRetries = 5;
        
        while (!profileCreated && retries < maxRetries) {
          try {
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert({
                id: data.user.id,
                email: data.user.email,
                full_name: signupForm.name
              }, { onConflict: 'id' });
            
            if (!profileError) {
              profileCreated = true;
            } else {
              console.error('Profile creation attempt failed:', profileError);
              retries++;
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          } catch (err) {
            console.error('Profile creation error:', err);
            retries++;
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        if (data.session) {
          setIsAuthenticated(true);
          setUserEmail(signupForm.email);
          setUserName(signupForm.name);
          await loadUserProjects(signupForm.email);
          setCurrentView('home');
        } else {
          alert('Account created successfully! Please check your email for confirmation link.');
          setCurrentView('login');
          setLoginForm({ email: signupForm.email, password: '' });
        }
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setIsAuthenticated(false);
      setUserName('');
      setUserEmail('');
      setProjects([]);
      setCurrentProject(null);
      setCurrentView('login');
      setLoginForm({ email: '', password: '' });
      setSignupForm({ name: '', email: '', password: '', confirmPassword: '' });
    }
  };

  // Create project
  const createProject = async (name) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('You must be logged in to create a project');
        return;
      }
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', user.email)
        .maybeSingle();
      
      if (!profile) {
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || 'User'
          });
      }
      
      const { data, error } = await supabase
        .from('projects')
        .insert([
          { 
            name: name, 
            user_email: user.email 
          }
        ])
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const newProject = {
          ...data[0],
          createdAt: data[0].created_at
        };
        
        setProjects([newProject, ...projects]);
        setCurrentProject(newProject);
        setCurrentView('project');
      }
      
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project: ' + error.message);
    }
  };

  // Delete project
  const deleteProject = async (projectId, projectName) => {
    if (!window.confirm(`Are you sure you want to delete "${projectName}"? This will permanently delete all project data.`)) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);
      
      if (error) throw error;
      
      setProjects(projects.filter(p => p.id !== projectId));
      
      if (currentProject?.id === projectId) {
        setCurrentProject(null);
        setCurrentView('home');
      }
      
      alert('Project deleted successfully');
      
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project: ' + error.message);
    }
  };

  // Update project name
  const updateProjectName = async (projectId, newName) => {
    if (!newName.trim()) {
      alert('Project name cannot be empty');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('projects')
        .update({ name: newName, updated_at: new Date().toISOString() })
        .eq('id', projectId);
      
      if (error) throw error;
      
      setProjects(projects.map(p => 
        p.id === projectId ? { ...p, name: newName } : p
      ));
      
      if (currentProject?.id === projectId) {
        setCurrentProject({ ...currentProject, name: newName });
      }
      
      setEditingProjectId(null);
      setEditingProjectName('');
      
      alert('Project renamed successfully');
      
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project: ' + error.message);
    }
  };

  // Start editing project
  const startEditingProject = (project) => {
    setEditingProjectId(project.id);
    setEditingProjectName(project.name);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingProjectId(null);
    setEditingProjectName('');
  };

  // Utility functions
  const decimalToDMS = (decimal) => {
    const degrees = Math.floor(decimal);
    const minutesDecimal = (decimal - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = Math.round((minutesDecimal - minutes) * 60);
    return `${degrees}° ${minutes}' ${seconds}"`;
  };

  const calculateAzimuth = (e1, n1, e2, n2) => {
    const dE = parseFloat(e2) - parseFloat(e1);
    const dN = parseFloat(n2) - parseFloat(n1);
    
    if (dE === 0 && dN > 0) return 0;
    if (dE > 0 && dN === 0) return 90;
    if (dE === 0 && dN < 0) return 180;
    if (dE < 0 && dN === 0) return 270;
    if (dE > 0 && dN > 0) return Math.atan(dE / dN) * 180 / Math.PI;
    if (dE > 0 && dN < 0) return 180 + (Math.atan(dE / dN) * 180 / Math.PI);
    if (dE < 0 && dN < 0) return 180 + (Math.atan(dE / dN) * 180 / Math.PI);
    if (dE < 0 && dN > 0) return 360 + (Math.atan(dE / dN) * 180 / Math.PI);
    
    return 0;
  };

  const calculateDistance = (e1, n1, e2, n2) => {
    const dE = parseFloat(e2) - parseFloat(e1);
    const dN = parseFloat(n2) - parseFloat(n1);
    return Math.sqrt(dE * dE + dN * dN);
  };

  // ---------- Database utility functions ----------

  // Save project points (project_points table)
  const saveProjectPoints = async (projectId, points, coordinateType, source = 'manual') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No user logged in');
        return { data: null, error: new Error('No user logged in') };
      }
      
      if (!projectId) {
        console.error('No project ID provided');
        return { data: null, error: new Error('No project ID') };
      }
      
      const pointsToInsert = points
        .filter(p => p.id && p.id.trim() !== '' && p.easting && p.northing)
        .map(p => ({
          project_id: projectId,
          point_id: p.id,
          easting: parseFloat(p.easting),
          northing: parseFloat(p.northing),
          coordinate_type: coordinateType,
          source: source
        }));
      
      if (pointsToInsert.length === 0) {
        console.log('No valid points to insert');
        return { data: null, error: null };
      }
      
      const { data, error } = await supabase
        .from('project_points')
        .upsert(pointsToInsert, { 
          onConflict: 'project_id,point_id,coordinate_type',
          ignoreDuplicates: false 
        });
        
      if (error) {
        console.error('Supabase error saving points:', error);
        throw error;
      }
      return { data, error: null };
    } catch (error) {
      console.error('Error saving points:', error);
      return { data: null, error };
    }
  };

  // Get project points
  const getProjectPoints = async (projectId, coordinateType = null) => {
    try {
      if (!projectId) return { data: null, error: new Error('No project ID') };
      
      let query = supabase
        .from('project_points')
        .select('*')
        .eq('project_id', projectId);
      
      if (coordinateType) {
        query = query.eq('coordinate_type', coordinateType);
      }
      
      const { data, error } = await query.order('point_id');
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching points:', error);
      return { data: null, error };
    }
  };

  // Save control lines (control_lines table)
  const saveControlLines = async (projectId, lines) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { data: null, error: new Error('No user logged in') };
      
      if (!projectId) return { data: null, error: new Error('No project ID') };
      
      await supabase
        .from('control_lines')
        .delete()
        .eq('project_id', projectId);
      
      const linesToInsert = lines.map(line => ({
        project_id: projectId,
        utm_from: line.utmFrom || '',
        utm_to: line.utmTo || '',
        local_from: line.localFrom || '',
        local_to: line.localTo || '',
        swing: line.swing || 0,
        scale: line.scale || 0,
        use_for_average: line.useForAverage !== undefined ? line.useForAverage : true
      }));
      
      if (linesToInsert.length === 0) return { data: null, error: null };
      
      const { data, error } = await supabase
        .from('control_lines')
        .insert(linesToInsert)
        .select();
        
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error saving control lines:', error);
      return { data: null, error };
    }
  };

  // Get control lines
  const getControlLines = async (projectId) => {
    try {
      if (!projectId) return { data: null, error: new Error('No project ID') };
      
      const { data, error } = await supabase
        .from('control_lines')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at');
        
      if (error) throw error;
      
      const formattedLines = data.map(line => ({
        id: line.id,
        utmFrom: line.utm_from,
        utmTo: line.utm_to,
        localFrom: line.local_from,
        localTo: line.local_to,
        useForAverage: line.use_for_average,
        swing: line.swing,
        scale: line.scale,
        isCalculated: !!(line.swing && line.scale)
      }));
      
      return { data: formattedLines, error: null };
    } catch (error) {
      console.error('Error fetching control lines:', error);
      return { data: null, error };
    }
  };

  // Save calculation params
  const saveCalculationParams = async (projectId, avgSwing, avgScale, controlLinesUsed) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { data: null, error: new Error('No user logged in') };
      
      if (!projectId) return { data: null, error: new Error('No project ID') };
      
      const { data, error } = await supabase
        .from('calculation_params')
        .upsert({
          project_id: projectId,
          avg_swing: avgSwing || 0,
          avg_scale: avgScale || 0,
          control_lines_used: controlLinesUsed || 0
        }, {
          onConflict: 'project_id'
        })
        .select();
        
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error saving calculation params:', error);
      return { data: null, error };
    }
  };

  // Get calculation params
  const getCalculationParams = async (projectId) => {
    try {
      if (!projectId) return { data: null, error: new Error('No project ID') };
      
      const { data, error } = await supabase
        .from('calculation_params')
        .select('*')
        .eq('project_id', projectId)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching calculation params:', error);
      return { data: null, error };
    }
  };

  // Save conversion results
  const saveConversionResults = async (projectId, results, controlPoint) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No user logged in');
        return { data: null, error: new Error('No user logged in') };
      }
      
      if (!projectId) {
        console.error('No project ID provided');
        return { data: null, error: new Error('No project ID') };
      }
      
      if (!results || results.length === 0) {
        console.log('No results to save');
        return { data: null, error: null };
      }
      
      const { error: deleteError } = await supabase
        .from('conversion_results')
        .delete()
        .eq('project_id', projectId);
      
      if (deleteError) {
        console.error('Error deleting existing results:', deleteError);
        throw deleteError;
      }
      
      const resultsToInsert = results.map((result, index) => ({
        project_id: projectId,
        point_id: result.id,
        easting: parseFloat(result.easting),
        northing: parseFloat(result.northing),
        is_control_point: result.id === controlPoint,
        sequence_order: index + 1
      }));
      
      const { data, error } = await supabase
        .from('conversion_results')
        .insert(resultsToInsert)
        .select();
        
      if (error) {
        console.error('Supabase error saving conversion results:', error);
        throw error;
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Error saving conversion results:', error);
      return { data: null, error };
    }
  };

  // Get conversion results
  const getConversionResults = async (projectId) => {
    try {
      if (!projectId) return { data: [], controlPoint: '', error: null };
      
      const { data, error } = await supabase
        .from('conversion_results')
        .select('*')
        .eq('project_id', projectId)
        .order('sequence_order');
        
      if (error) {
        console.error('Supabase error fetching conversion results:', error);
        throw error;
      }
      
      const formattedResults = data.map(r => ({
        id: r.point_id,
        easting: r.easting,
        northing: r.northing
      }));
      
      const controlPoint = data.find(r => r.is_control_point)?.point_id || '';
      
      return { data: formattedResults, controlPoint, error: null };
    } catch (error) {
      console.error('Error fetching conversion results:', error);
      return { data: [], controlPoint: '', error: null };
    }
  };

  // ---------- Levelling session functions ----------
  const createLevellingSession = async (projectId, sessionName, source = 'manual') => {
    try {
      const { data, error } = await supabase
        .from('levelling_sessions')
        .insert({
          project_id: projectId,
          session_name: sessionName,
          source: source
        })
        .select()
        .single();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating levelling session:', error);
      return { data: null, error };
    }
  };

  const saveLevellingObservations = async (sessionId, observations) => {
    try {
      await supabase
        .from('levelling_observations')
        .delete()
        .eq('session_id', sessionId);

      const obsToInsert = observations.map((obs, idx) => ({
        session_id: sessionId,
        station: obs.station,
        backsight: obs.bs ? parseFloat(obs.bs) : null,
        intermediate_sight: obs.is ? parseFloat(obs.is) : null,
        foresight: obs.fs ? parseFloat(obs.fs) : null,
        rise: obs.rise || 0,
        fall: obs.fall || 0,
        reduced_level: obs.rl ? parseFloat(obs.rl) : null,
        sequence_order: idx + 1
      }));

      const { data, error } = await supabase
        .from('levelling_observations')
        .insert(obsToInsert)
        .select();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error saving levelling observations:', error);
      return { data: null, error };
    }
  };

  const saveLevellingResults = async (sessionId, results) => {
    try {
      const { data, error } = await supabase
        .from('levelling_results')
        .upsert({
          session_id: sessionId,
          sum_bs: results.sumBs,
          sum_fs: results.sumFs,
          sum_rise: results.sumRise,
          sum_fall: results.sumFall,
          first_rl: results.firstRl,
          last_rl: results.lastRl,
          check_passed: results.checkPassed
        }, { onConflict: 'session_id' })
        .select()
        .single();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error saving levelling results:', error);
      return { data: null, error };
    }
  };

  const getLevellingSessionData = async (sessionId) => {
    try {
      const [obsRes, resultsRes] = await Promise.all([
        supabase.from('levelling_observations').select('*').eq('session_id', sessionId).order('sequence_order'),
        supabase.from('levelling_results').select('*').eq('session_id', sessionId).single()
      ]);
      if (obsRes.error) throw obsRes.error;
      if (resultsRes.error && resultsRes.error.code !== 'PGRST116') throw resultsRes.error;

      const observations = obsRes.data.map(o => ({
        station: o.station,
        bs: o.backsight?.toString() || '',
        is: o.intermediate_sight?.toString() || '',
        fs: o.foresight?.toString() || '',
        rise: o.rise,
        fall: o.fall,
        rl: o.reduced_level?.toString() || '',
        remarks: ''
      }));

      return { observations, results: resultsRes.data || null, error: null };
    } catch (error) {
      console.error('Error fetching levelling session:', error);
      return { observations: [], results: null, error };
    }
  };

  // ---------- Azimuth & Distance session functions ----------
  const createAzimuthSession = async (projectId, source = 'manual') => {
    try {
      const { data, error } = await supabase
        .from('azimuth_distance_sessions')
        .insert({
          project_id: projectId,
          source: source
        })
        .select()
        .single();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating azimuth session:', error);
      return { data: null, error };
    }
  };

  const saveAzimuthPoints = async (sessionId, points) => {
    try {
      await supabase
        .from('azimuth_distance_points')
        .delete()
        .eq('session_id', sessionId);

      const ptsToInsert = points
        .filter(p => p.id && p.id.trim() !== '' && p.easting && p.northing)
        .map((p, idx) => ({
          session_id: sessionId,
          point_id: p.id,
          easting: parseFloat(p.easting),
          northing: parseFloat(p.northing),
          sequence_order: idx + 1
        }));

      if (ptsToInsert.length === 0) return { data: null, error: null };

      const { data, error } = await supabase
        .from('azimuth_distance_points')
        .insert(ptsToInsert)
        .select();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error saving azimuth points:', error);
      return { data: null, error };
    }
  };

  const saveAzimuthResults = async (sessionId, results) => {
    try {
      await supabase
        .from('azimuth_distance_results')
        .delete()
        .eq('session_id', sessionId);

      const resToInsert = results.map((r, idx) => ({
        session_id: sessionId,
        from_point: r.from,
        to_point: r.to,
        distance: r.distance,
        azimuth: r.azimuth,
        azimuth_dms: r.azimuthDMS,
        sequence_order: idx + 1
      }));

      const { data, error } = await supabase
        .from('azimuth_distance_results')
        .insert(resToInsert)
        .select();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error saving azimuth results:', error);
      return { data: null, error };
    }
  };

  const getAzimuthSessionData = async (sessionId) => {
    try {
      const [ptsRes, resRes] = await Promise.all([
        supabase.from('azimuth_distance_points').select('*').eq('session_id', sessionId).order('sequence_order'),
        supabase.from('azimuth_distance_results').select('*').eq('session_id', sessionId).order('sequence_order')
      ]);
      if (ptsRes.error) throw ptsRes.error;
      if (resRes.error) throw resRes.error;

      const points = ptsRes.data.map(p => ({
        id: p.point_id,
        easting: p.easting.toString(),
        northing: p.northing.toString()
      }));

      const results = resRes.data.map(r => ({
        from: r.from_point,
        to: r.to_point,
        distance: r.distance,
        azimuth: r.azimuth,
        azimuthDMS: r.azimuth_dms
      }));

      return { points, results, error: null };
    } catch (error) {
      console.error('Error fetching azimuth session:', error);
      return { points: [], results: [], error };
    }
  };

  // ---------- CSV Sorter session functions ----------
  const createCsvSortSession = async (projectId, method, field, prefixPattern, selectedFields, includeHeaders) => {
    try {
      const { data, error } = await supabase
        .from('csv_sort_sessions')
        .insert({
          project_id: projectId,
          user_email: userEmail,
          sorting_method: method,
          sorting_field: field,
          prefix_pattern: method === 'prefix' ? prefixPattern : null,
          selected_fields: selectedFields,
          include_headers: includeHeaders
        })
        .select()
        .single();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating CSV sort session:', error);
      return { data: null, error };
    }
  };

  const saveCsvExportFile = async (sessionId, projectId, fileName, groupKey, rowCount) => {
    try {
      const { data, error } = await supabase
        .from('csv_export_files')
        .insert({
          sort_session_id: sessionId,
          project_id: projectId,
          user_email: userEmail,
          file_name: fileName,
          group_key: groupKey,
          row_count: rowCount
        })
        .select()
        .single();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error saving CSV export file record:', error);
      return { data: null, error };
    }
  };

  const getMostRecentCsvSortSession = async (projectId) => {
    try {
      const { data, error } = await supabase
        .from('csv_sort_sessions')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching recent CSV sort session:', error);
      return { data: null, error };
    }
  };

  // ----- Home View (user top‑right) -----
  const HomeView = () => (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Top bar: nothing on left, user on right */}
      <div className="flex justify-end items-center gap-3 mb-4">
        <span className="text-sm font-medium text-slate-700">{userName || 'User'}</span>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          Sign Out
        </button>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Ortelius</h1>
          <p className="text-slate-600">Professional surveying calculations</p>
        </div>
        
        <button
          onClick={() => {
            const name = prompt('Enter project name:');
            if (name) createProject(name);
          }}
          className="w-full bg-slate-900 text-white px-6 py-4 rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-3"
        >
          <Plus size={20} />
          Create New Project
        </button>
        
        {projects.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Recent Projects</h2>
            <div className="space-y-3">
              {projects.map(project => (
                <div
                  key={project.id}
                  className="bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                >
                  {editingProjectId === project.id ? (
                    <div className="p-4 flex items-center gap-2">
                      <input
                        type="text"
                        value={editingProjectName}
                        onChange={(e) => setEditingProjectName(e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        placeholder="Project name"
                        autoFocus
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            updateProjectName(project.id, editingProjectName);
                          }
                        }}
                      />
                      <button
                        onClick={() => updateProjectName(project.id, editingProjectName)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4">
                      <button
                        onClick={() => { setCurrentProject(project); setCurrentView('project'); }}
                        className="flex items-center gap-3 flex-1 text-left"
                      >
                        <FileText size={20} className="text-slate-400" />
                        <div>
                          <div className="font-medium text-slate-900">{project.name}</div>
                          <div className="text-sm text-slate-500">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditingProject(project)}
                          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit project name"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id, project.name)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete project"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ----- Project View (user top‑right) -----
  const ProjectView = () => (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Top bar: back button left, user right */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => setCurrentView('home')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft size={20} />Back to Projects
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">{userName || 'User'}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2 text-center">{currentProject?.name}</h1>
          <p className="text-slate-600">Select a calculation method</p>
        </div>
        
        <div className="grid gap-4">
          <button onClick={() => setCurrentView('levelling')} className="bg-white border border-slate-200 px-8 py-6 rounded-lg text-left hover:border-slate-300 transition-colors">
            <h3 className="text-lg font-medium text-slate-900 mb-1">Levelling</h3>
            <p className="text-slate-600 text-sm">Calculate reduced levels using rise and fall method</p>
          </button>
          <button onClick={() => setCurrentView('swing-scale')} className="bg-white border border-slate-200 px-8 py-6 rounded-lg text-left hover:border-slate-300 transition-colors">
            <h3 className="text-lg font-medium text-slate-900 mb-1">Swing and Scale</h3>
            <p className="text-slate-600 text-sm">Convert local coordinates to UTM coordinates</p>
          </button>
          <button onClick={() => setCurrentView('azimuth-distance')} className="bg-white border border-slate-200 px-8 py-6 rounded-lg text-left hover:border-slate-300 transition-colors">
            <h3 className="text-lg font-medium text-slate-900 mb-1">Azimuth and Distance</h3>
            <p className="text-slate-600 text-sm">Calculate bearing and distance between points</p>
          </button>
          <button onClick={() => setCurrentView('csv-sorter')} className="bg-white border border-slate-200 px-8 py-6 rounded-lg text-left hover:border-slate-300 transition-colors">
            <h3 className="text-lg font-medium text-slate-900 mb-1">CSV Sorter & Exporter</h3>
            <p className="text-slate-600 text-sm">Sort CSV files by column values and export filtered data</p>
          </button>
        </div>
      </div>
    </div>
  );

  // ----- Swing Scale View (user top‑right) -----
// ----- Swing Scale View (user top‑right) -----
const SwingScaleView = ({ setCurrentView }) => {
  const [utmData, setUtmData] = useState([{ id: '', easting: '', northing: '' }]);
  const [localData, setLocalData] = useState([{ id: '', easting: '', northing: '' }]);
  const [controlLines, setControlLines] = useState([]);
  const [avgSwing, setAvgSwing] = useState(0);
  const [avgScale, setAvgScale] = useState(0);
  const [controlPoint, setControlPoint] = useState('');
  const [convertData, setConvertData] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoadingUTM, setIsLoadingUTM] = useState(false);
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);
  const [isLoadingConvert, setIsLoadingConvert] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState('utm');
  const [showManualInputs, setShowManualInputs] = useState(false);
  const [newPoint, setNewPoint] = useState({ id: '', easting: '', northing: '' });
  const [saveStatus, setSaveStatus] = useState({ saving: false, message: '' });

  useEffect(() => {
    if (currentProject?.id) {
      loadAllData();
    }
  }, [currentProject?.id]);

  const loadAllData = async () => {
    setIsLoadingData(true);
    try {
      const [utmResult, localResult, linesResult, avgResult, resultsResult] = await Promise.all([
        getProjectPoints(currentProject.id, 'utm'),
        getProjectPoints(currentProject.id, 'local'),
        getControlLines(currentProject.id),
        getCalculationParams(currentProject.id),
        getConversionResults(currentProject.id)
      ]);

      if (utmResult.data && utmResult.data.length > 0) {
        setUtmData(utmResult.data.map(p => ({
          id: p.point_id,
          easting: p.easting?.toString() || '',
          northing: p.northing?.toString() || ''
        })));
      }

      if (localResult.data && localResult.data.length > 0) {
        const formattedLocalData = localResult.data.map(p => ({
          id: p.point_id,
          easting: p.easting?.toString() || '',
          northing: p.northing?.toString() || ''
        }));
        
        setLocalData(formattedLocalData);
        
        // Also set convertData from local points that might be used for conversion
        // This ensures any previously uploaded conversion data appears in the Convert tab
        setConvertData(formattedLocalData);
      }

      if (linesResult.data && linesResult.data.length > 0) {
        setControlLines(linesResult.data);
      }

      if (avgResult.data) {
        setAvgSwing(avgResult.data.avg_swing || 0);
        setAvgScale(avgResult.data.avg_scale || 0);
      }

      if (resultsResult.data.length > 0) {
        setResults(resultsResult.data);
        setControlPoint(resultsResult.controlPoint);
      }

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Auto-save functions
  const autoSaveUtmData = async (newData) => {
    if (!currentProject?.id) return;
    setSaveStatus({ saving: true, message: 'Saving UTM points...' });
    const result = await saveProjectPoints(currentProject.id, newData, 'utm');
    if (result.error) {
      setSaveStatus({ saving: false, message: 'Error saving UTM points' });
      console.error('Error saving UTM points:', result.error);
    } else {
      setSaveStatus({ saving: false, message: 'UTM points saved' });
    }
    setTimeout(() => setSaveStatus({ saving: false, message: '' }), 2000);
  };

  const autoSaveLocalData = async (newData) => {
    if (!currentProject?.id) return;
    setSaveStatus({ saving: true, message: 'Saving local points...' });
    const result = await saveProjectPoints(currentProject.id, newData, 'local');
    if (result.error) {
      setSaveStatus({ saving: false, message: 'Error saving local points' });
      console.error('Error saving local points:', result.error);
    } else {
      setSaveStatus({ saving: false, message: 'Local points saved' });
    }
    setTimeout(() => setSaveStatus({ saving: false, message: '' }), 2000);
  };

  const autoSaveControlLines = async (newLines) => {
    if (!currentProject?.id || newLines.length === 0) return;
    setSaveStatus({ saving: true, message: 'Saving control lines...' });
    const result = await saveControlLines(currentProject.id, newLines);
    if (result.error) {
      setSaveStatus({ saving: false, message: 'Error saving control lines' });
      console.error('Error saving control lines:', result.error);
    } else {
      setSaveStatus({ saving: false, message: 'Control lines saved' });
    }
    setTimeout(() => setSaveStatus({ saving: false, message: '' }), 2000);
  };

  const autoSaveAverages = async (swing, scale, linesUsed) => {
    if (!currentProject?.id || (swing === 0 && scale === 0)) return;
    setSaveStatus({ saving: true, message: 'Saving averages...' });
    const result = await saveCalculationParams(currentProject.id, swing, scale, linesUsed);
    if (result.error) {
      setSaveStatus({ saving: false, message: 'Error saving averages' });
      console.error('Error saving averages:', result.error);
    } else {
      setSaveStatus({ saving: false, message: 'Averages saved' });
    }
    setTimeout(() => setSaveStatus({ saving: false, message: '' }), 2000);
  };

  const autoSaveResults = async (newResults, ctrlPoint) => {
    if (!currentProject?.id || newResults.length === 0) return;
    setSaveStatus({ saving: true, message: 'Saving converted results...' });
    const result = await saveConversionResults(currentProject.id, newResults, ctrlPoint);
    if (result.error) {
      setSaveStatus({ saving: false, message: 'Error saving results' });
      console.error('Error saving results:', result.error);
    } else {
      setSaveStatus({ saving: false, message: 'Results saved' });
    }
    setTimeout(() => setSaveStatus({ saving: false, message: '' }), 2000);
  };

  const parseCoordinateCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const row = {};
      headers.forEach((header, i) => {
        row[header] = values[i] || '';
      });
      return {
        id: row.id || row['point id'] || row.point || '',
        easting: row.easting || row.e || row.x || '',
        northing: row.northing || row.n || row.y || ''
      };
    }).filter(row => row.id && row.id.trim() !== '');
  };

  const handleUTMUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoadingUTM(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = parseCoordinateCSV(event.target.result);
        if (parsed.length > 0) {
          setUtmData(parsed);
          await autoSaveUtmData(parsed);
        } else {
          alert('No valid data found in CSV file');
        }
      } catch (error) {
        alert('Error parsing CSV file: ' + error.message);
      }
      setIsLoadingUTM(false);
    };
    reader.readAsText(file);
  };

  const handleLocalUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoadingLocal(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = parseCoordinateCSV(event.target.result);
        if (parsed.length > 0) {
          setLocalData(parsed);
          await autoSaveLocalData(parsed);
        } else {
          alert('No valid data found in CSV file');
        }
      } catch (error) {
        alert('Error parsing CSV file: ' + error.message);
      }
      setIsLoadingLocal(false);
    };
    reader.readAsText(file);
  };

  const handleConvertUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoadingConvert(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = parseCoordinateCSV(event.target.result);
        if (parsed.length > 0) {
          setConvertData(parsed);
          
          // Update localData with these points as well
          const updatedLocalData = [...localData];
          parsed.forEach(newPoint => {
            // Check if point already exists in localData
            const existingIndex = updatedLocalData.findIndex(p => p.id === newPoint.id);
            if (existingIndex >= 0) {
              // Update existing point
              updatedLocalData[existingIndex] = newPoint;
            } else {
              // Add new point
              updatedLocalData.push(newPoint);
            }
          });
          
          // Remove empty rows if any
          const cleanedLocalData = updatedLocalData.filter(p => p.id && p.id.trim() !== '');
          if (cleanedLocalData.length === 0) {
            cleanedLocalData.push({ id: '', easting: '', northing: '' });
          }
          
          setLocalData(cleanedLocalData);
          
          // Save to project_points table with 'local' type
          await saveProjectPoints(currentProject.id, cleanedLocalData, 'local', 'csv');
          
          setSaveStatus({ saving: false, message: 'Local points saved' });
          setTimeout(() => setSaveStatus({ saving: false, message: '' }), 2000);
        } else {
          alert('No valid data found in CSV file');
        }
      } catch (error) {
        alert('Error parsing CSV file: ' + error.message);
      }
      setIsLoadingConvert(false);
    };
    reader.readAsText(file);
  };

  const addControlLine = () => {
    const newLines = [...controlLines, {
      id: Date.now(),
      utmFrom: '', 
      utmTo: '', 
      localFrom: '', 
      localTo: '', 
      useForAverage: true,
      swing: 0, 
      scale: 0,
      isCalculated: false
    }];
    setControlLines(newLines);
    autoSaveControlLines(newLines);
  };

  const removeControlLine = (index) => {
    const newLines = [...controlLines];
    newLines.splice(index, 1);
    setControlLines(newLines);
    autoSaveControlLines(newLines);
  };

  const updateControlLine = (index, field, value) => {
    const newLines = [...controlLines];
    newLines[index][field] = value;
    if (field === 'utmFrom' || field === 'utmTo' || field === 'localFrom' || field === 'localTo') {
      newLines[index].isCalculated = false;
    }
    setControlLines(newLines);
    autoSaveControlLines(newLines);
  };

  const calculateControlLine = (index) => {
    const line = controlLines[index];
    
    const utmFrom = utmData.find(p => p.id === line.utmFrom);
    const utmTo = utmData.find(p => p.id === line.utmTo);
    const localFrom = localData.find(p => p.id === line.localFrom);
    const localTo = localData.find(p => p.id === line.localTo);

    if (!utmFrom || !utmTo || !localFrom || !localTo) {
      alert('Please select all four points for this control line');
      return;
    }

    if (!utmFrom.easting || !utmFrom.northing || !utmTo.easting || !utmTo.northing ||
        !localFrom.easting || !localFrom.northing || !localTo.easting || !localTo.northing) {
      alert('All selected points must have valid coordinates');
      return;
    }

    try {
      const utmAz = calculateAzimuth(
        utmFrom.easting, 
        utmFrom.northing, 
        utmTo.easting, 
        utmTo.northing
      );
      const localAz = calculateAzimuth(
        localFrom.easting, 
        localFrom.northing, 
        localTo.easting, 
        localTo.northing
      );

      const utmDist = calculateDistance(
        utmFrom.easting, 
        utmFrom.northing, 
        utmTo.easting, 
        utmTo.northing
      );
      const localDist = calculateDistance(
        localFrom.easting, 
        localFrom.northing, 
        localTo.easting, 
        localTo.northing
      );

      let swing = utmAz - localAz;
      while (swing > 180) swing -= 360;
      while (swing < -180) swing += 360;

      const scale = localDist !== 0 ? utmDist / localDist : 0;

      const newLines = [...controlLines];
      newLines[index] = {
        ...newLines[index],
        swing: swing,
        scale: scale,
        isCalculated: true
      };
      setControlLines(newLines);
      autoSaveControlLines(newLines);
    } catch (error) {
      alert('Error calculating control line: ' + error.message);
    }
  };

  const calculateAllControlLines = () => {
    controlLines.forEach((line, index) => {
      if (!line.isCalculated) {
        calculateControlLine(index);
      }
    });
  };

  const calculateAverages = async () => {
    const selected = controlLines.filter(line => 
      line.useForAverage && 
      line.isCalculated &&
      !isNaN(line.swing) && 
      !isNaN(line.scale)
    );
    
    if (selected.length === 0) {
      alert('No control lines selected for averaging. Please calculate at least one line and check "Use for averaging"');
      return;
    }

    const totalSwing = selected.reduce((sum, line) => sum + line.swing, 0);
    const totalScale = selected.reduce((sum, line) => sum + line.scale, 0);

    const newAvgSwing = totalSwing / selected.length;
    const newAvgScale = totalScale / selected.length;

    setAvgSwing(newAvgSwing);
    setAvgScale(newAvgScale);
    
    await autoSaveAverages(newAvgSwing, newAvgScale, selected.length);
  };

  const reorderTraversePoints = (data, controlId) => {
    const controlIndex = data.findIndex(p => p.id === controlId);
    if (controlIndex === -1) return data;
    
    const controlPoint = data[controlIndex];
    const afterControl = data.slice(controlIndex + 1);
    const beforeControl = data.slice(0, controlIndex);
    
    return [controlPoint, ...afterControl, ...beforeControl];
  };

  const handleControlPointChange = async (e) => {
    const selectedPoint = e.target.value;
    setControlPoint(selectedPoint);
    
    if (selectedPoint && convertData.length > 0) {
      const reorderedData = reorderTraversePoints(convertData, selectedPoint);
      setConvertData(reorderedData);
      await saveProjectPoints(currentProject.id, reorderedData, 'local', 'manual');
    }
  };

  const convertToUTM = async () => {
    if (!controlPoint) {
      alert('Please select a control point');
      return;
    }
    if (convertData.length === 0) {
      alert('Please add local coordinates to convert');
      return;
    }
    if (avgSwing === 0 && avgScale === 0) {
      alert('Please calculate average swing and scale first');
      return;
    }

    const controlUTM = utmData.find(p => p.id === controlPoint);
    if (!controlUTM || !controlUTM.easting || !controlUTM.northing) {
      alert('Control point must exist in UTM data with valid coordinates');
      return;
    }

    const controlIndex = convertData.findIndex(p => p.id === controlPoint);
    if (controlIndex === -1) {
      alert('Control point must exist in local coordinates to convert');
      return;
    }

    const newResults = new Array(convertData.length);
    newResults[0] = {
      id: controlPoint,
      easting: parseFloat(controlUTM.easting),
      northing: parseFloat(controlUTM.northing)
    };

    try {
      for (let i = 1; i < convertData.length; i++) {
        const prevPoint = convertData[i - 1];
        const currentPoint = convertData[i];
        const prevResult = newResults[i - 1];
        
        const localAz = calculateAzimuth(
          prevPoint.easting,
          prevPoint.northing,
          currentPoint.easting,
          currentPoint.northing
        );
        const localDist = calculateDistance(
          prevPoint.easting,
          prevPoint.northing,
          currentPoint.easting,
          currentPoint.northing
        );

        const newAzimuth = localAz + avgSwing;
        const newDistance = localDist * avgScale;
        const newAzRad = newAzimuth * Math.PI / 180;

        const newEasting = prevResult.easting + (newDistance * Math.sin(newAzRad));
        const newNorthing = prevResult.northing + (newDistance * Math.cos(newAzRad));

        newResults[i] = {
          id: currentPoint.id,
          easting: newEasting,
          northing: newNorthing
        };
      }

      setResults(newResults);
      await autoSaveResults(newResults, controlPoint);
      
    } catch (error) {
      alert('Error converting coordinates: ' + error.message);
    }
  };

  const exportResults = () => {
    const headers = ['Point ID', 'Easting', 'Northing'];
    const rows = results.map(r => [r.id, r.easting.toFixed(4), r.northing.toFixed(4)]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_utm_${Date.now()}.csv`;
    a.click();
  };

  const exportControlLines = () => {
    const headers = ['UTM From', 'UTM To', 'Local From', 'Local To', 'Swing (DMS)', 'Scale Factor', 'Use for Average'];
    const rows = controlLines.map(line => [
      line.utmFrom,
      line.utmTo,
      line.localFrom,
      line.localTo,
      decimalToDMS(line.swing),
      line.scale.toFixed(8),
      line.useForAverage ? 'Yes' : 'No'
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `control_lines_${Date.now()}.csv`;
    a.click();
  };

  const clearAllData = async () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setUtmData([{ id: '', easting: '', northing: '' }]);
      setLocalData([{ id: '', easting: '', northing: '' }]);
      setControlLines([]);
      setAvgSwing(0);
      setAvgScale(0);
      setControlPoint('');
      setConvertData([]);
      setResults([]);
      
      if (currentProject?.id) {
        await supabase.from('project_points').delete().eq('project_id', currentProject.id);
        await supabase.from('control_lines').delete().eq('project_id', currentProject.id);
        await supabase.from('calculation_params').delete().eq('project_id', currentProject.id);
        await supabase.from('conversion_results').delete().eq('project_id', currentProject.id);
      }
    }
  };

  const deleteUTMRow = async (index) => {
    const newData = [...utmData];
    const deletedRow = newData[index];
    newData.splice(index, 1);
    if (newData.length === 0) {
      newData.push({ id: '', easting: '', northing: '' });
    }
    setUtmData(newData);
    
    if (deletedRow.id && currentProject?.id) {
      await supabase
        .from('project_points')
        .delete()
        .eq('project_id', currentProject.id)
        .eq('point_id', deletedRow.id)
        .eq('coordinate_type', 'utm');
    }
  };

  const deleteLocalRow = async (index) => {
    const newData = [...localData];
    const deletedRow = newData[index];
    newData.splice(index, 1);
    if (newData.length === 0) {
      newData.push({ id: '', easting: '', northing: '' });
    }
    setLocalData(newData);
    
    if (deletedRow.id && currentProject?.id) {
      await supabase
        .from('project_points')
        .delete()
        .eq('project_id', currentProject.id)
        .eq('point_id', deletedRow.id)
        .eq('coordinate_type', 'local');
    }
  };

  const deleteConvertRow = async (index) => {
    const newData = [...convertData];
    const deletedRow = newData[index];
    newData.splice(index, 1);
    if (newData.length === 0) {
      newData.push({ id: '', easting: '', northing: '' });
    }
    setConvertData(newData);
    
    if (deletedRow.id && currentProject?.id) {
      await supabase
        .from('project_points')
        .delete()
        .eq('project_id', currentProject.id)
        .eq('point_id', deletedRow.id)
        .eq('coordinate_type', 'local');
    }
  };

  const addConvertRow = () => {
    setShowManualInputs(true);
  };

  const handleAddPoint = async () => {
    if (newPoint.id && newPoint.easting && newPoint.northing) {
      const updatedData = [...convertData, { 
        id: newPoint.id, 
        easting: newPoint.easting, 
        northing: newPoint.northing 
      }];
      setConvertData(updatedData);
      await saveProjectPoints(currentProject.id, updatedData, 'local', 'manual');
      setNewPoint({ id: '', easting: '', northing: '' });
      setShowManualInputs(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleCancelAdd = () => {
    setNewPoint({ id: '', easting: '', northing: '' });
    setShowManualInputs(false);
  };

  const updateUtmData = async (newData) => {
    setUtmData(newData);
    await autoSaveUtmData(newData);
  };

  const updateLocalData = async (newData) => {
    setLocalData(newData);
    await autoSaveLocalData(newData);
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mb-4"></div>
          <p className="text-slate-600">Loading saved data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setCurrentView('project')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft size={20} />Back to Project
          </button>
          <span className="text-sm font-medium text-slate-700">{userName || 'User'}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="text-center flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2 text-center">
              Swing and Scale Calculation
            </h1>
            <p className="text-slate-600 text-center">
              Convert local coordinates to UTM coordinates using control points
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            {saveStatus.message && (
              <div className={`px-4 py-2 rounded-lg text-sm ${
                saveStatus.saving 
                  ? 'bg-blue-50 text-blue-700' 
                  : saveStatus.message.includes('Error')
                    ? 'bg-red-50 text-red-700'
                    : 'bg-green-50 text-green-700'
              }`}>
                {saveStatus.saving && <span className="inline-block animate-spin mr-2">⏳</span>}
                {saveStatus.message}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('utm')}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'utm' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
          >
            UTM Coordinates
          </button>
          <button
            onClick={() => setActiveTab('local')}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'local' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Local Coordinates
          </button>
          <button
            onClick={() => setActiveTab('pairs')}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'pairs' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Control Pairs
          </button>
          <button
            onClick={() => setActiveTab('convert')}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'convert' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Convert to UTM
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <button 
            onClick={clearAllData}
            className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
          >
            <X size={14} />Clear All Data
          </button>
        </div>

        {/* Tab contents */}
        {activeTab === 'utm' && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4 text-center">Step 1: UTM Coordinates (Known Control Points)</h3>
            <div className="mb-6">
              <label className="block mb-3 cursor-pointer">
                <input 
                  type="file" 
                  accept=".csv" 
                  onChange={handleUTMUpload} 
                  style={{ display: 'none' }}
                  disabled={isLoadingUTM} 
                />
                <div className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors border border-slate-300">
                  <Upload size={18} className="text-slate-700" />
                  <span className="font-medium text-slate-700">{isLoadingUTM ? 'Loading...' : 'Upload UTM CSV'}</span>
                </div>
              </label>
              <p className="text-sm text-slate-500 mb-3">CSV format: Point ID, Easting, Northing (e.g., T34, 876553.0000, 7643786.0000)</p>
              <p className="text-sm text-slate-600">UTM coordinates are your known reference points in the UTM coordinate system.</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Or enter manually:</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto p-2">
                {utmData.map((row, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        placeholder="Point ID (e.g., T34)" 
                        value={row.id} 
                        onChange={(e) => { 
                          const newData = [...utmData]; 
                          newData[index].id = e.target.value; 
                          updateUtmData(newData); 
                        }} 
                        style={{ flex: 1, minWidth: 0 }}
                        className="px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400 text-sm" 
                      />
                      <input 
                        type="number" 
                        step="0.0001"
                        placeholder="Easting" 
                        value={row.easting} 
                        onChange={(e) => { 
                          const newData = [...utmData]; 
                          newData[index].easting = e.target.value; 
                          updateUtmData(newData); 
                        }} 
                        style={{ flex: 1, minWidth: 0 }}
                        className="px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400 text-sm" 
                      />
                      <input 
                        type="number" 
                        step="0.0001"
                        placeholder="Northing" 
                        value={row.northing} 
                        onChange={(e) => { 
                          const newData = [...utmData]; 
                          newData[index].northing = e.target.value; 
                          updateUtmData(newData); 
                        }} 
                        style={{ flex: 1, minWidth: 0 }}
                        className="px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400 text-sm" 
                      />
                    </div>
                    <button
                      onClick={() => deleteUTMRow(index)}
                      className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ flexShrink: 0 }}
                      title="Delete row"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => updateUtmData([...utmData, { id: '', easting: '', northing: '' }])} 
                className="mt-3 flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                <Plus size={14} />Add Row
              </button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Status:</span> {utmData.filter(p => p.id && p.easting && p.northing).length} valid UTM points loaded
              </p>
            </div>
          </div>
        )}

        {activeTab === 'local' && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4 text-center">Step 2: Local Coordinates (Available in UT)</h3>
            <div className="mb-6">
              <label className="block mb-3 cursor-pointer">
                <input 
                  type="file" 
                  accept=".csv" 
                  onChange={handleLocalUpload} 
                  style={{ display: 'none' }}
                  disabled={isLoadingLocal} 
                />
                <div className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors border border-slate-300">
                  <Upload size={18} className="text-slate-700" />
                  <span className="font-medium text-slate-700">{isLoadingLocal ? 'Loading...' : 'Upload Local CSV'}</span>
                </div>
              </label>
              <p className="text-sm text-slate-500 mb-3">CSV format: Point ID, Easting (Y), Northing (X) (same points as UTM but in local system)</p>
              <p className="text-sm text-slate-600">Local coordinates are your surveyed points in the local coordinate system.</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Or enter manually:</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto p-2">
                {localData.map((row, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        placeholder="Point ID (must match UTM)" 
                        value={row.id} 
                        onChange={(e) => { 
                          const newData = [...localData]; 
                          newData[index].id = e.target.value; 
                          updateLocalData(newData); 
                        }} 
                        style={{ flex: 1, minWidth: 0 }}
                        className="px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400 text-sm" 
                      />
                      <input 
                        type="number" 
                        step="0.0001"
                        placeholder="Easting (Y)" 
                        value={row.easting} 
                        onChange={(e) => { 
                          const newData = [...localData]; 
                          newData[index].easting = e.target.value; 
                          updateLocalData(newData); 
                        }} 
                        style={{ flex: 1, minWidth: 0 }}
                        className="px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400 text-sm" 
                      />
                      <input 
                        type="number" 
                        step="0.0001"
                        placeholder="Northing (X)" 
                        value={row.northing} 
                        onChange={(e) => { 
                          const newData = [...localData]; 
                          newData[index].northing = e.target.value; 
                          updateLocalData(newData); 
                        }} 
                        style={{ flex: 1, minWidth: 0 }}
                        className="px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400 text-sm" 
                      />
                    </div>
                    <button
                      onClick={() => deleteLocalRow(index)}
                      className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ flexShrink: 0 }}
                      title="Delete row"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => updateLocalData([...localData, { id: '', easting: '', northing: '' }])} 
                className="mt-3 flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                <Plus size={14} />Add Row
              </button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Status:</span> {localData.filter(p => p.id && p.easting && p.northing).length} valid local points loaded
              </p>
              <p className="text-sm text-blue-700 mt-1">
                <span className="font-medium">Matching points:</span> {
                  localData.filter(p => p.id && utmData.find(u => u.id === p.id)).length
                } points exist in both systems
              </p>
            </div>
          </div>
        )}

        {activeTab === 'pairs' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-slate-900 mb-4 text-center">Step 3: Control Line Pairing</h3>
              <p className="text-sm text-slate-600 mb-4">Select pairs of points that exist in both UTM and Local coordinate systems to calculate swing and scale factors.</p>
              
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <h4 className="font-medium text-slate-900 mb-2">Available UTM Points</h4>
                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto p-2 bg-white rounded border border-slate-100">
                    {utmData.filter(p => p.id && p.easting && p.northing).length > 0 ? (
                      utmData.filter(p => p.id && p.easting && p.northing).map((p, i, arr) => (
                        <span key={p.id} className="text-xs text-slate-700">
                          {p.id}{i < arr.length - 1 ? ', ' : ''}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500 p-1">No valid UTM points</span>
                    )}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <h4 className="font-medium text-slate-900 mb-2">Available Local Points</h4>
                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto p-2 bg-white rounded border border-slate-100">
                    {localData.filter(p => p.id && p.easting && p.northing).length > 0 ? (
                      localData.filter(p => p.id && p.easting && p.northing).map((p, i, arr) => (
                        <span key={p.id} className="text-xs text-slate-700">
                          {p.id}{i < arr.length - 1 ? ', ' : ''}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500 p-1">No valid local points</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <button 
                  onClick={calculateAllControlLines} 
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Check size={16} />Calculate All Lines
                </button>
                {controlLines.length > 0 && (
                  <button 
                    onClick={exportControlLines} 
                    className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    <Download size={16} />Export Control Lines
                  </button>
                )}
              </div>

              {controlLines.length > 0 ? (
                <div className="space-y-6">
                  {controlLines.map((line, index) => {
                    const utmFrom = utmData.find(p => p.id === line.utmFrom);
                    const utmTo = utmData.find(p => p.id === line.utmTo);
                    const localFrom = localData.find(p => p.id === line.localFrom);
                    const localTo = localData.find(p => p.id === line.localTo);

                    let utmAz = 0, utmDist = 0, localAz = 0, localDist = 0;
                    if (utmFrom && utmTo && utmFrom.easting && utmFrom.northing && utmTo.easting && utmTo.northing) {
                      utmAz = calculateAzimuth(utmFrom.easting, utmFrom.northing, utmTo.easting, utmTo.northing);
                      utmDist = calculateDistance(utmFrom.easting, utmFrom.northing, utmTo.easting, utmTo.northing);
                    }
                    if (localFrom && localTo && localFrom.easting && localFrom.northing && localTo.easting && localTo.northing) {
                      localAz = calculateAzimuth(localFrom.easting, localFrom.northing, localTo.easting, localTo.northing);
                      localDist = calculateDistance(localFrom.easting, localFrom.northing, localTo.easting, localTo.northing);
                    }

                    return (
                      <div key={line.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-slate-900">Control Line #{index + 1}</h4>
                          <button 
                            onClick={() => removeControlLine(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                          <div style={{ flex: 1 }}>
                            <label className="block text-xs text-slate-600 mb-1">UTM From</label>
                            <select 
                              value={line.utmFrom} 
                              onChange={(e) => updateControlLine(index, 'utmFrom', e.target.value)} 
                              className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-slate-400"
                            >
                              <option value="">Select UTM point...</option>
                              {utmData.filter(p => p.id).map(p => (
                                <option key={p.id} value={p.id}>{p.id}</option>
                              ))}
                            </select>
                          </div>
                          <div style={{ flex: 1 }}>
                            <label className="block text-xs text-slate-600 mb-1">UTM To</label>
                            <select 
                              value={line.utmTo} 
                              onChange={(e) => updateControlLine(index, 'utmTo', e.target.value)} 
                              className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-slate-400"
                            >
                              <option value="">Select UTM point...</option>
                              {utmData.filter(p => p.id).map(p => (
                                <option key={p.id} value={p.id}>{p.id}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                          <div style={{ flex: 1 }}>
                            <label className="block text-xs text-slate-600 mb-1">Local From</label>
                            <select 
                              value={line.localFrom} 
                              onChange={(e) => updateControlLine(index, 'localFrom', e.target.value)} 
                              className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-slate-400"
                            >
                              <option value="">Select Local point...</option>
                              {localData.filter(p => p.id).map(p => (
                                <option key={p.id} value={p.id}>{p.id}</option>
                              ))}
                            </select>
                          </div>
                          <div style={{ flex: 1 }}>
                            <label className="block text-xs text-slate-600 mb-1">Local To</label>
                            <select 
                              value={line.localTo} 
                              onChange={(e) => updateControlLine(index, 'localTo', e.target.value)} 
                              className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-slate-400"
                            >
                              <option value="">Select Local point...</option>
                              {localData.filter(p => p.id).map(p => (
                                <option key={p.id} value={p.id}>{p.id}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
                          <button 
                            onClick={() => calculateControlLine(index)} 
                            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                          >
                            Calculate This Line
                          </button>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <input 
                              type="checkbox" 
                              checked={line.useForAverage} 
                              onChange={(e) => updateControlLine(index, 'useForAverage', e.target.checked)} 
                              style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer', accentColor: '#1b5e20' }}
                              className="rounded" 
                            />
                            <span className="text-sm text-slate-700 font-medium">Use for averaging</span>
                          </label>
                        </div>

                        {line.isCalculated && (
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mt-3">
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead className="bg-slate-100 border-b border-slate-200">
                                  <tr>
                                    <th className="px-3 py-2 text-left font-medium text-slate-700">UTM Azimuth</th>
                                    <th className="px-3 py-2 text-left font-medium text-slate-700">UTM Distance</th>
                                    <th className="px-3 py-2 text-left font-medium text-slate-700">Local Azimuth</th>
                                    <th className="px-3 py-2 text-left font-medium text-slate-700">Local Distance</th>
                                    <th className="px-3 py-2 text-left font-medium text-slate-700">Swing</th>
                                    <th className="px-3 py-2 text-left font-medium text-slate-700">Scale Factor</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-slate-100">
                                    <td className="px-3 py-2 font-mono text-slate-900">{decimalToDMS(utmAz)}</td>
                                    <td className="px-3 py-2 font-mono text-slate-900">{utmDist.toFixed(3)}</td>
                                    <td className="px-3 py-2 font-mono text-slate-900">{decimalToDMS(localAz)}</td>
                                    <td className="px-3 py-2 font-mono text-slate-900">{localDist.toFixed(3)}</td>
                                    <td className="px-3 py-2 font-mono text-slate-900">{decimalToDMS(line.swing)}</td>
                                    <td className="px-3 py-2 font-mono text-slate-900">{line.scale.toFixed(8)}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div className="mt-8 flex justify-center">
                    <button 
                      onClick={addControlLine} 
                      className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors border-2 border-slate-300 border-dashed"
                    >
                      <Plus size={18} />Add Another Control Line
                    </button>
                  </div>

                  <div className="mt-8">
                    <button 
                      onClick={calculateAverages} 
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Calculate Average Swing and Scale
                    </button>

                    {(avgSwing !== 0 || avgScale !== 0) && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-3">Average Values</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-green-100 border-b border-green-200">
                              <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-green-800">Parameter</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-green-800">Value</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-green-800">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-green-100">
                                <td className="px-4 py-2 text-sm text-green-900 font-medium">Average Swing</td>
                                <td className="px-4 py-2 text-sm text-green-900 font-mono">{decimalToDMS(avgSwing)}</td>
                                <td className="px-4 py-2 text-sm text-green-700">UTM Bearing - Local Bearing</td>
                              </tr>
                              <tr className="border-b border-green-100">
                                <td className="px-4 py-2 text-sm text-green-900 font-medium">Average Scale Factor</td>
                                <td className="px-4 py-2 text-sm text-green-900 font-mono">{avgScale.toFixed(8)}</td>
                                <td className="px-4 py-2 text-sm text-green-700">UTM Distance / Local Distance</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-3 text-sm text-green-700">
                          Based on {controlLines.filter(l => l.useForAverage && l.isCalculated).length} selected control lines
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <p>No control lines added yet.</p>
                  <button 
                    onClick={addControlLine} 
                    className="mt-4 flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors mx-auto"
                  >
                    <Plus size={18} />Add Control Line
                  </button>
                  <p className="text-sm mt-4">You need at least 2 control lines to calculate reliable averages.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'convert' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-slate-900 mb-4 text-center">Step 4: Convert Local Coordinates to UTM</h3>
              
              <div className="mb-6">
                <label className="block mb-3 cursor-pointer">
                  <input 
                    type="file" 
                    accept=".csv" 
                    onChange={handleConvertUpload} 
                    style={{ display: 'none' }}
                    disabled={isLoadingConvert} 
                  />
                  <div className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors border border-slate-300">
                    <Upload size={18} className="text-slate-700" />
                    <span className="font-medium text-slate-700">{isLoadingConvert ? 'Loading...' : 'Upload Local Coordinates CSV'}</span>
                  </div>
                </label>
                <p className="text-sm text-slate-500 mb-3">CSV format: Point ID, Easting (Y), Northing (X) (traverse points in local system)</p>
                <p className="text-sm text-slate-600">Upload the local coordinates you want to convert to UTM. They should be in traverse order.</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Start Control Point</label>
                <select 
                  value={controlPoint} 
                  onChange={handleControlPointChange} 
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400"
                >
                  <option value="">Select a point that exists in both UTM and Local...</option>
                  {localData
                    .filter(p => p.id && utmData.find(u => u.id === p.id))
                    .map(p => (
                      <option key={p.id} value={p.id}>{p.id}</option>
                    ))}
                </select>
                <p className="text-sm text-slate-500 mt-1">This point will be used as the starting reference for the conversion. Points above it will be moved to the bottom.</p>
              </div>

              {(avgSwing !== 0 || avgScale !== 0) && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
                  <h4 className="font-medium text-blue-900 mb-2">Current Transformation Parameters</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="text-sm text-blue-700">Average Swing</div>
                      <div className="font-medium text-blue-900">{decimalToDMS(avgSwing)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-700">Average Scale Factor</div>
                      <div className="font-medium text-blue-900">{avgScale.toFixed(8)}</div>
                    </div>
                  </div>
                </div>
              )}

              {convertData.length > 0 ? (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Local Coordinates (Traverse Order)</h4>
                  <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">#</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Point ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Easting (Y)</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Northing (X)</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {convertData.map((row, index) => (
                          <tr key={index} className={`border-b border-slate-100 hover:bg-slate-50 group ${row.id === controlPoint ? 'bg-green-50' : ''}`}>
                            <td className="px-4 py-3 text-sm text-slate-500 font-mono">{index + 1}</td>
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">{row.id}</td>
                            <td className="px-4 py-3 text-sm text-slate-700 font-mono">{row.easting || '-'}</td>
                            <td className="px-4 py-3 text-sm text-slate-700 font-mono">{row.northing || '-'}</td>
                            <td className="px-4 py-3">
                              {row.id === controlPoint ? (
                                <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Control Point</span>
                              ) : (
                                <span className="inline-flex px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">Traverse Point</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => deleteConvertRow(index)}
                                className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete row"
                              >
                                <X size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6">
                    {!showManualInputs ? (
                      <button 
                        onClick={addConvertRow} 
                        className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                      >
                        <Plus size={16} />Add Point Manually
                      </button>
                    ) : (
                      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                        <h5 className="text-sm font-medium text-slate-700 mb-3">Enter New Point Details:</h5>
                        <div className="flex items-center gap-2 mb-3">
                          <input 
                            type="text" 
                            placeholder="Point ID" 
                            value={newPoint.id} 
                            onChange={(e) => setNewPoint({...newPoint, id: e.target.value})}
                            className="flex-1 px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400 text-sm" 
                          />
                          <input 
                            type="number" 
                            step="0.0001"
                            placeholder="Easting (Y)" 
                            value={newPoint.easting} 
                            onChange={(e) => setNewPoint({...newPoint, easting: e.target.value})}
                            className="flex-1 px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400 text-sm" 
                          />
                          <input 
                            type="number" 
                            step="0.0001"
                            placeholder="Northing (X)" 
                            value={newPoint.northing} 
                            onChange={(e) => setNewPoint({...newPoint, northing: e.target.value})}
                            className="flex-1 px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400 text-sm" 
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={handleAddPoint} 
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                          >
                            <Plus size={16} />Add Point
                          </button>
                          <button 
                            onClick={handleCancelAdd} 
                            className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Or enter manually (in traverse order):</h4>
                  <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">#</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Point ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Easting (Y)</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Northing (X)</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {convertData.map((row, index) => (
                          <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 group">
                            <td className="px-4 py-3 text-sm text-slate-500 font-mono">{index + 1}</td>
                            <td className="px-4 py-3">
                              <input 
                                type="text" 
                                placeholder="Point ID" 
                                value={row.id} 
                                onChange={(e) => { 
                                  const newData = [...convertData]; 
                                  newData[index].id = e.target.value; 
                                  setConvertData(newData); 
                                }} 
                                className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400 text-sm" 
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input 
                                type="number" 
                                step="0.0001"
                                placeholder="Easting (Y)" 
                                value={row.easting} 
                                onChange={(e) => { 
                                  const newData = [...convertData]; 
                                  newData[index].easting = e.target.value; 
                                  setConvertData(newData); 
                                }} 
                                className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400 text-sm" 
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input 
                                type="number" 
                                step="0.0001"
                                placeholder="Northing (X)" 
                                value={row.northing} 
                                onChange={(e) => { 
                                  const newData = [...convertData]; 
                                  newData[index].northing = e.target.value; 
                                  setConvertData(newData); 
                                }} 
                                className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-slate-400 text-sm" 
                              />
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => deleteConvertRow(index)}
                                className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete row"
                              >
                                <X size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button 
                    onClick={addConvertRow} 
                    className="mt-3 flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    <Plus size={14} />Add Row
                  </button>
                </div>
              )}

              <div className="mt-8 flex items-center gap-4">
                <button 
                  onClick={convertToUTM} 
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                  disabled={!controlPoint || convertData.length === 0 || (avgSwing === 0 && avgScale === 0)}
                >
                  Convert to UTM
                </button>

                {(!controlPoint || convertData.length === 0 || (avgSwing === 0 && avgScale === 0)) && (
                  <p className="text-sm text-red-600">
                    {!controlPoint && "Select a control point. "}
                    {convertData.length === 0 && "Add coordinates to convert. "}
                    {avgSwing === 0 && avgScale === 0 && "Calculate average swing and scale first."}
                  </p>
                )}
              </div>
            </div>

            {results.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-slate-900">Converted UTM Coordinates</h3>
                  <button 
                    onClick={exportResults} 
                    className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    <Download size={16} />Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">#</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Point ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Easting</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-700">Northing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-3 text-sm text-slate-500 font-mono">{i + 1}</td>
                          <td className="px-4 py-3 text-sm text-slate-900 font-medium">
                            {row.id}
                            {row.id === controlPoint && <span className="ml-2 text-xs text-green-600">(Control)</span>}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-900 font-mono">{row.easting.toFixed(4)}</td>
                          <td className="px-4 py-3 text-sm text-slate-900 font-mono">{row.northing.toFixed(4)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-700">
                    <span className="font-medium">Success!</span> {results.length} points converted to UTM coordinates.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
  // ----- Levelling View (user top‑right) -----
  const LevellingView = ({ setCurrentView }) => {
    const emptyRow = { station: "", bs: "", is: "", fs: "", rise: 0, fall: 0, rl: "", remarks: "" };
    const [data, setData] = useState([emptyRow]);
    const [sessionId, setSessionId] = useState(null);
    const [sessionName, setSessionName] = useState(`Levelling ${new Date().toLocaleString()}`);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const fileInputRef = useRef(null);

    useEffect(() => {
      if (currentProject?.id) {
        loadMostRecentSession();
      }
    }, [currentProject?.id]);

    const loadMostRecentSession = async () => {
      setIsLoadingData(true);
      try {
        const { data: sessions, error } = await supabase
          .from('levelling_sessions')
          .select('id, session_name')
          .eq('project_id', currentProject.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;

        if (sessions && sessions.length > 0) {
          const session = sessions[0];
          setSessionId(session.id);
          setSessionName(session.session_name);
          const { observations } = await getLevellingSessionData(session.id);
          if (observations.length > 0) {
            setData(observations);
          }
        }
      } catch (error) {
        console.error('Error loading levelling session:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    const parseCSV = (text) => {
      const lines = text.trim().split("\n");
      if (lines.length < 2) return [];

      const headers = lines[0].split(",").map(h => h.trim().toLowerCase());

      return lines.slice(1).map(line => {
        const values = line.split(",").map(v => v.trim());
        const row = {};
        headers.forEach((h, i) => (row[h] = values[i] || ""));

        return {
          station: row.station || "",
          bs: row.bs || row["b.s"] || "",
          is: row.is || row["i.s"] || "",
          fs: row.fs || row["f.s"] || "",
          rise: 0,
          fall: 0,
          rl: row.rl || "",
          remarks: row.remarks || ""
        };
      });
    };

    const calculateFrom = (rows) => {
      const out = rows.map(r => ({
        ...r,
        rise: 0,
        fall: 0,
        rl: r.rl === "" ? "" : Number(r.rl)
      }));

      for (let i = 1; i < out.length; i++) {
        const prev = out[i - 1];
        const curr = out[i];

        const prevSum =
          (parseFloat(prev.bs) || 0) +
          (parseFloat(prev.is) || 0);

        const currSum =
          (parseFloat(curr.is) || 0) +
          (parseFloat(curr.fs) || 0);

        if (prevSum > currSum) {
          curr.rise = prevSum - currSum;
          curr.fall = 0;
        } else {
          curr.fall = currSum - prevSum;
          curr.rise = 0;
        }

        const prevRL = parseFloat(prev.rl);
        if (!isNaN(prevRL)) {
          curr.rl = prevRL + curr.rise - curr.fall;
        }
      }

      return out;
    };

    useEffect(() => {
      setData(d => calculateFrom(d));
    }, [data.length]);

    const recalcAll = () => setData(d => calculateFrom(d));

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setIsLoading(true);
      const reader = new FileReader();

      reader.onload = (ev) => {
        try {
          const parsed = parseCSV(ev.target.result);
          const safe = parsed.length ? parsed : [emptyRow];
          setData(calculateFrom(safe));
        } catch {
          alert("CSV parse error");
          setData([emptyRow]);
        }
        setIsLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      };

      reader.readAsText(file);
    };

    const updateCell = (i, field, value) => {
      setData(prev => {
        const copy = [...prev];
        copy[i] = { ...copy[i], [field]: value };
        return calculateFrom(copy);
      });
    };

    const addRow = () => setData(d => [...d, { ...emptyRow }]);

    const removeRow = (i) => {
      if (data.length === 1) return;
      const copy = [...data];
      copy.splice(i, 1);
      setData(calculateFrom(copy));
    };

    const clearAll = () => {
      if (!window.confirm("Clear all data?")) return;
      setData([emptyRow]);
      setSessionId(null);
      setSessionName(`Levelling ${new Date().toLocaleString()}`);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const exportCSV = () => {
      const head = ["Station","B.S","I.S","F.S","Rise","Fall","Reduced Level","Remarks"];
      const body = data.map(r => [
        r.station,
        r.bs,
        r.is,
        r.fs,
        Number(r.rise || 0).toFixed(3),
        Number(r.fall || 0).toFixed(3),
        Number(r.rl || 0).toFixed(3),
        r.remarks
      ]);

      const csv = [head, ...body].map(r => r.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "levelling_results.csv";
      a.click();
      URL.revokeObjectURL(url);
    };

    const checks = data.reduce((a, r) => {
      a.bs += parseFloat(r.bs) || 0;
      a.fs += parseFloat(r.fs) || 0;
      a.rise += r.rise || 0;
      a.fall += r.fall || 0;
      return a;
    }, { bs:0, fs:0, rise:0, fall:0 });

    const firstRL = parseFloat(data[0]?.rl) || 0;
    const lastRL = parseFloat(data[data.length-1]?.rl) || 0;

    const checkPass =
      Math.abs((checks.rise-checks.fall) - (checks.bs-checks.fs)) < 0.001 &&
      Math.abs((checks.rise-checks.fall) - (lastRL-firstRL)) < 0.001;

    const saveToDatabase = async () => {
      if (!currentProject?.id) return;
      try {
        let sid = sessionId;
        if (!sid) {
          const { data: session, error } = await createLevellingSession(currentProject.id, sessionName);
          if (error) throw error;
          sid = session.id;
          setSessionId(sid);
        }
        await saveLevellingObservations(sid, data);
        await saveLevellingResults(sid, {
          sumBs: checks.bs,
          sumFs: checks.fs,
          sumRise: checks.rise,
          sumFall: checks.fall,
          firstRl: firstRL,
          lastRl: lastRL,
          checkPassed: checkPass
        });
        alert('Data saved to database');
      } catch (error) {
        console.error('Error saving levelling data:', error);
        alert('Failed to save data');
      }
    };

    if (isLoadingData) {
      return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mb-4"></div>
            <p className="text-slate-600">Loading saved data...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Top bar: back button left, user right */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setCurrentView('project')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft size={20} />Back to Project
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">{userName || 'User'}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2 text-center">
              Levelling Calculator
            </h1>
            <p className="text-slate-600 text-center">
              Calculate reduced levels using rise and fall method
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 md:p-6 mb-6">
            <div className="flex flex-wrap gap-3">
              <label className="flex-1 min-w-[200px] cursor-pointer">
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept=".csv" 
                  onChange={handleFileUpload} 
                  style={{ display: 'none' }}
                  disabled={isLoading} 
                />
                <div className="flex items-center justify-center gap-3 bg-slate-100 hover:bg-slate-200 px-4 md:px-6 py-3 rounded-lg transition-colors border border-slate-300">
                  <Upload size={20} className="text-slate-700" />
                  <span className="font-medium text-slate-700">
                    {isLoading ? 'Loading...' : 'Upload CSV'}
                  </span>
                </div>
              </label>
              
              <button 
                onClick={recalcAll} 
                className="px-4 md:px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                Calculate
              </button>
              
              <button 
                onClick={exportCSV} 
                className="flex items-center gap-2 px-4 md:px-6 py-3 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                <Download size={20} />
                Export CSV
              </button>
              
              <button 
                onClick={clearAll} 
                className="flex items-center gap-2 px-4 md:px-6 py-3 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                <X size={20} />
                Clear All
              </button>

              <button 
                onClick={saveToDatabase} 
                className="px-4 md:px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Save to Database
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-3 py-3 text-left text-sm font-medium text-slate-700 whitespace-nowrap">Station</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-slate-700 whitespace-nowrap">B.S</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-slate-700 whitespace-nowrap">I.S</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-slate-700 whitespace-nowrap">F.S</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-slate-700 whitespace-nowrap bg-slate-100">Rise</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-slate-700 whitespace-nowrap bg-slate-100">Fall</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-slate-700 whitespace-nowrap">R.L</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-slate-700 whitespace-nowrap">Remarks</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-slate-700 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((r, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-2">
                        <input 
                          type="text" 
                          value={r.station} 
                          onChange={e => updateCell(i, "station", e.target.value)} 
                          className="w-full min-w-[80px] px-2 py-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:border-slate-400" 
                          placeholder="Station"
                        />
                      </td>
                      
                      <td className="px-3 py-2">
                        <input 
                          type="number" 
                          step="0.001" 
                          value={r.bs} 
                          onChange={e => updateCell(i, "bs", e.target.value)} 
                          className="w-full min-w-[80px] px-2 py-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:border-slate-400" 
                          placeholder="0.000"
                        />
                      </td>
                      
                      <td className="px-3 py-2">
                        <input 
                          type="number" 
                          step="0.001" 
                          value={r.is} 
                          onChange={e => updateCell(i, "is", e.target.value)} 
                          className="w-full min-w-[80px] px-2 py-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:border-slate-400" 
                          placeholder="0.000"
                        />
                      </td>
                      
                      <td className="px-3 py-2">
                        <input 
                          type="number" 
                          step="0.001" 
                          value={r.fs} 
                          onChange={e => updateCell(i, "fs", e.target.value)} 
                          className="w-full min-w-[80px] px-2 py-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:border-slate-400" 
                          placeholder="0.000"
                        />
                      </td>
                      
                      <td className="px-3 py-2 bg-slate-50">
                        <input 
                          type="text" 
                          value={Number(r.rise || 0).toFixed(3)} 
                          disabled 
                          className="w-full min-w-[80px] px-2 py-1.5 text-sm bg-slate-100 border border-slate-200 rounded text-slate-600" 
                        />
                      </td>
                      
                      <td className="px-3 py-2 bg-slate-50">
                        <input 
                          type="text" 
                          value={Number(r.fall || 0).toFixed(3)} 
                          disabled 
                          className="w-full min-w-[80px] px-2 py-1.5 text-sm bg-slate-100 border border-slate-200 rounded text-slate-600" 
                        />
                      </td>
                      
                      <td className="px-3 py-2">
                        <input 
                          type="number" 
                          step="0.001" 
                          value={r.rl} 
                          onChange={e => updateCell(i, "rl", e.target.value)} 
                          disabled={i !== 0}
                          className={`w-full min-w-[80px] px-2 py-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:border-slate-400 ${
                            i !== 0 ? 'bg-slate-100 text-slate-600 cursor-not-allowed' : ''
                          }`} 
                          placeholder="0.000"
                        />
                      </td>
                      
                      <td className="px-3 py-2">
                        <input 
                          type="text" 
                          value={r.remarks} 
                          onChange={e => updateCell(i, "remarks", e.target.value)} 
                          className="w-full min-w-[100px] px-2 py-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:border-slate-400" 
                          placeholder="Remarks"
                        />
                      </td>
                      
                      <td className="px-3 py-2">
                        <button
                          onClick={() => removeRow(i)}
                          disabled={data.length === 1}
                          className={`p-1.5 rounded ${
                            data.length === 1 
                              ? 'text-slate-300 cursor-not-allowed' 
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                          title="Remove row"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button 
            onClick={addRow} 
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors mb-6"
          >
            <Plus size={20} />
            Add Row
          </button>

          <div className="bg-white border border-slate-200 rounded-lg p-4 md:p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Arithmetic Check</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">Sum of B.S</div>
                <div className="font-medium text-slate-900 text-lg">{checks.bs.toFixed(3)}</div>
              </div>
              
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">Sum of F.S</div>
                <div className="font-medium text-slate-900 text-lg">{checks.fs.toFixed(3)}</div>
              </div>
              
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">Sum of Rise</div>
                <div className="font-medium text-slate-900 text-lg">{checks.rise.toFixed(3)}</div>
              </div>
              
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">Sum of Fall</div>
                <div className="font-medium text-slate-900 text-lg">{checks.fall.toFixed(3)}</div>
              </div>
              
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">First R.L</div>
                <div className="font-medium text-slate-900 text-lg">{firstRL.toFixed(3)}</div>
              </div>
              
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">Last R.L</div>
                <div className="font-medium text-slate-900 text-lg">{lastRL.toFixed(3)}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xs text-blue-700 mb-1 font-medium">Rise - Fall</div>
                  <div className="font-semibold text-blue-900">{(checks.rise - checks.fall).toFixed(3)}</div>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xs text-blue-700 mb-1 font-medium">Last R.L - First R.L</div>
                  <div className="font-semibold text-blue-900">{(lastRL - firstRL).toFixed(3)}</div>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xs text-blue-700 mb-1 font-medium">Sum B.S - Sum F.S</div>
                  <div className="font-semibold text-blue-900">{(checks.bs - checks.fs).toFixed(3)}</div>
                </div>
              </div>

              <div className={`p-4 rounded-lg text-center font-medium ${
                checkPass 
                  ? 'bg-green-50 text-green-800 border-2 border-green-300' 
                  : 'bg-red-50 text-red-800 border-2 border-red-300'
              }`}>
                {checkPass 
                  ? '✓ Arithmetic Check PASSED - All values match!' 
                  : '✗ Arithmetic Check FAILED - Values do not match'}
              </div>
              
              {!checkPass && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> For the check to pass, all three values above must be equal:
                    <br/>• Sum of Rise - Sum of Fall
                    <br/>• Last R.L - First R.L  
                    <br/>• Sum B.S - Sum F.S
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ----- Azimuth Distance View (user top‑right) -----
  const AzimuthDistanceView = ({ setCurrentView }) => {
    const [data, setData] = useState([{ id: '', easting: '', northing: '' }]);
    const [results, setResults] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
      if (currentProject?.id) {
        loadMostRecentSession();
      }
    }, [currentProject?.id]);

    const loadMostRecentSession = async () => {
      setIsLoadingData(true);
      try {
        const { data: sessions, error } = await supabase
          .from('azimuth_distance_sessions')
          .select('id')
          .eq('project_id', currentProject.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;

        if (sessions && sessions.length > 0) {
          const sid = sessions[0].id;
          setSessionId(sid);
          const { points, results } = await getAzimuthSessionData(sid);
          if (points.length > 0) setData(points);
          if (results.length > 0) setResults(results);
        }
      } catch (error) {
        console.error('Error loading azimuth session:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    const calculateResults = () => {
      const validData = data.filter(row => 
        row.id && row.id.trim() !== '' && 
        !isNaN(parseFloat(row.easting)) && 
        !isNaN(parseFloat(row.northing))
      );
      
      if (validData.length < 2) {
        alert('Please provide at least 2 valid coordinate points');
        return;
      }

      const newResults = [];
      for (let i = 0; i < validData.length - 1; i++) {
        const p1 = validData[i];
        const p2 = validData[i + 1];
        
        try {
          const e1 = parseFloat(p1.easting);
          const n1 = parseFloat(p1.northing);
          const e2 = parseFloat(p2.easting);
          const n2 = parseFloat(p2.northing);
          
          const distance = calculateDistance(e1, n1, e2, n2);
          const azimuth = calculateAzimuth(e1, n1, e2, n2);
          
          newResults.push({ 
            from: p1.id, 
            to: p2.id, 
            distance: distance, 
            azimuth: azimuth, 
            azimuthDMS: decimalToDMS(azimuth),
            fromEasting: e1,
            fromNorthing: n1,
            toEasting: e2,
            toNorthing: n2
          });
        } catch (error) {
          console.error(`Calculation error between ${p1.id} and ${p2.id}:`, error);
        }
      }
      
      setResults(newResults);
    };

    const parseCSV = (text) => {
      try {
        const lines = text.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
        
        if (lines.length < 2) {
          throw new Error('CSV must contain at least one header row and one data row');
        }

        const cleanLine = lines[0].trim();
        let delimiter = ',';
        
        const commaCount = (cleanLine.match(/,/g) || []).length;
        const semicolonCount = (cleanLine.match(/;/g) || []).length;
        const tabCount = (cleanLine.match(/\t/g) || []).length;
        
        if (semicolonCount > commaCount && semicolonCount > tabCount) {
          delimiter = ';';
        } else if (tabCount > commaCount && tabCount > semicolonCount) {
          delimiter = '\t';
        }

        const headers = cleanLine.split(delimiter)
          .map(h => h.trim()
            .toLowerCase()
            .replace(/["']/g, '')
            .replace(/\s+/g, ' ')
          );

        if (headers.length < 3) {
          throw new Error(`CSV must have at least 3 columns. Found ${headers.length}`);
        }

        const parsedData = [];
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const values = [];
          let current = '';
          let inQuotes = false;
          
          for (let char of line) {
            if (char === '"' || char === "'") {
              inQuotes = !inQuotes;
            } else if ((char === delimiter || char === ';' || char === '\t') && !inQuotes) {
              values.push(current.trim().replace(/^["']|["']$/g, ''));
              current = '';
            } else {
              current += char;
            }
          }
          values.push(current.trim().replace(/^["']|["']$/g, ''));

          const row = {};
          headers.forEach((header, idx) => {
            if (idx < values.length) {
              row[header] = values[idx];
            }
          });

          const extractPointId = (row) => {
            const idPatterns = [
              'id', 'point id', 'pointid', 'point', 'station', 'name', 
              'point_id', 'point-id', 'ptid', 'num', 'number', 'no', 
              'point no', 'point number', 'label', 'tag', 'marker'
            ];
            
            for (const pattern of idPatterns) {
              if (row[pattern] !== undefined && row[pattern] !== null && row[pattern] !== '') {
                return String(row[pattern]).trim();
              }
            }
            
            for (const key in row) {
              if (key.includes('id') || key.includes('point') || key.includes('station')) {
                return String(row[key]).trim();
              }
            }
            
            return '';
          };

          const extractCoordinate = (row, patterns) => {
            for (const pattern of patterns) {
              if (row[pattern] !== undefined && row[pattern] !== null && row[pattern] !== '') {
                const val = String(row[pattern]).trim();
                const cleanVal = val.replace(/[^\d.-]/g, '');
                const num = parseFloat(cleanVal);
                if (!isNaN(num)) {
                  return num;
                }
              }
            }
            
            for (const key in row) {
              if (patterns.some(pattern => key.includes(pattern))) {
                const val = String(row[key]).trim();
                const cleanVal = val.replace(/[^\d.-]/g, '');
                const num = parseFloat(cleanVal);
                if (!isNaN(num)) {
                  return num;
                }
              }
            }
            
            return '';
          };

          const pointId = extractPointId(row);
          const easting = extractCoordinate(row, ['easting', 'e', 'x', 'east', 'coordx', 'xcoord']);
          const northing = extractCoordinate(row, ['northing', 'n', 'y', 'north', 'coordy', 'ycoord']);

          if (pointId && easting !== '' && !isNaN(easting) && northing !== '' && !isNaN(northing)) {
            parsedData.push({
              id: pointId,
              easting: easting,
              northing: northing
            });
          }
        }

        if (parsedData.length === 0) {
          throw new Error('No valid data found in CSV file');
        }

        return parsedData;
        
      } catch (error) {
        console.error('CSV parsing error:', error);
        throw error;
      }
    };

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      setIsLoading(true);
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const parsed = parseCSV(event.target.result);
          setData(parsed);
          setSelectedPoint(null);
        } catch (error) {
          alert(`Unable to parse CSV file:\n\n${error.message}\n\nPlease ensure your file has:\n• A header row with column names\n• Point IDs and numeric coordinates\n• Supported formats: CSV, TSV, or semicolon-delimited`);
        }
        setIsLoading(false);
      };
      
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
        setIsLoading(false);
      };
      
      reader.readAsText(file);
      e.target.value = '';
    };

    const handleChooseFileClick = () => {
      fileInputRef.current?.click();
    };

    const exportResults = () => {
      if (results.length === 0) {
        alert('No results available to export');
        return;
      }

      const headers = ['From', 'To', 'Azimuth', 'Distance'];
      const rows = results.map(r => [
        r.from,
        r.to,
        r.azimuthDMS,
        r.distance.toFixed(3)
      ]);
      
      const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `azimuth-distance-results-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const exportCoordinates = () => {
      const validData = data.filter(row => row.id && row.id.trim() !== '');
      
      if (validData.length === 0) {
        alert('No coordinate data available to export');
        return;
      }

      const headers = ['Point ID', 'Easting', 'Northing'];
      const rows = validData.map(row => [
        row.id,
        row.easting,
        row.northing
      ]);
      
      const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `coordinates-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const clearData = () => {
      if (window.confirm('Clear all coordinate data?')) {
        setData([{ id: '', easting: '', northing: '' }]);
        setResults([]);
        setSelectedPoint(null);
        setSessionId(null);
      }
    };

    const removeRow = (index) => {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData.length > 0 ? newData : [{ id: '', easting: '', northing: '' }]);
      setSelectedPoint(null);
    };

    const downloadSampleCSV = () => {
      const sampleData = `Point ID,Easting,Northing
T1,123456.789,9876543.210
T2,123457.890,9876544.321
T3,123458.901,9876545.432
T4,123459.012,9876546.543`;

      const BOM = '\uFEFF';
      const blob = new Blob([BOM + sampleData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sample_data.csv';
      a.click();
    };

    const validPointsCount = data.filter(p => 
      p.id && p.id.trim() !== '' && 
      !isNaN(parseFloat(p.easting)) && 
      !isNaN(parseFloat(p.northing))
    ).length;

    const saveToDatabase = async () => {
      if (!currentProject?.id) return;
      try {
        let sid = sessionId;
        if (!sid) {
          const { data: session, error } = await createAzimuthSession(currentProject.id);
          if (error) throw error;
          sid = session.id;
          setSessionId(sid);
        }
        await saveAzimuthPoints(sid, data);
        await saveAzimuthResults(sid, results);
        alert('Data saved to database');
      } catch (error) {
        console.error('Error saving azimuth data:', error);
        alert('Failed to save data');
      }
    };

    if (isLoadingData) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mb-4"></div>
            <p className="text-slate-600">Loading saved data...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Top bar: back button left, user right */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setCurrentView('project')} className="inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-gray-100 rounded-md transition-colors">
              <ArrowLeft className="w-4 h-4" />Back to Project
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">{userName || 'User'}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Azimuth & Distance Calculator
            </h1>
            <p className="text-gray-600">
              Calculate bearing and distance between consecutive survey points
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Coordinate Input
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {validPointsCount} valid point{validPointsCount !== 1 ? 's' : ''} loaded
                    </p>
                  </div>
                </div>

                <div className="px-6 py-5 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept=".csv,.txt,.tsv"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleChooseFileClick}
                      disabled={isLoading}
                      style={{ 
                        backgroundColor: '#1b5e20',
                        color: 'white',
                        border: 'none',
                        minHeight: '48px',
                        height: '48px',
                        padding: '0 1rem'
                      }}
                      className="flex-1 inline-flex items-center justify-center text-sm font-medium rounded-lg hover:bg-[#0d4b11] transition-colors whitespace-nowrap"
                    >
                      <Upload className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Choose CSV File</span>
                    </button>
                    
                    <button
                      onClick={downloadSampleCSV}
                      style={{ 
                        backgroundColor: 'white',
                        color: '#334155',
                        border: '2px dashed #cbd5e1',
                        minHeight: '48px',
                        height: '48px',
                        padding: '0 1rem'
                      }}
                      className="flex-1 inline-flex items-center justify-center text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-slate-400 transition-colors whitespace-nowrap"
                    >
                      <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Download Sample</span>
                    </button>
                    
                    <button
                      onClick={exportCoordinates}
                      disabled={validPointsCount === 0}
                      style={{ 
                        backgroundColor: 'white',
                        color: validPointsCount === 0 ? '#9ca3af' : '#334155',
                        border: validPointsCount === 0 ? '2px dashed #d1d5db' : '2px dashed #cbd5e1',
                        minHeight: '48px',
                        height: '48px',
                        padding: '0 1rem',
                        cursor: validPointsCount === 0 ? 'not-allowed' : 'pointer'
                      }}
                      className={`flex-1 inline-flex items-center justify-center text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-slate-400 transition-colors whitespace-nowrap`}
                    >
                      <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Export Input</span>
                    </button>
                    
                    <button
                      onClick={clearData}
                      style={{ 
                        backgroundColor: 'white',
                        color: '#dc2626',
                        border: '1px solid #fca5a5',
                        minHeight: '48px',
                        height: '48px',
                        padding: '0 1rem'
                      }}
                      className="flex-1 inline-flex items-center justify-center text-sm font-medium rounded-lg hover:bg-red-50 hover:border-red-400 transition-colors whitespace-nowrap"
                    >
                      <X className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Clear Data</span>
                    </button>
                    
                    <button
                      onClick={calculateResults}
                      disabled={validPointsCount < 2}
                      style={{ 
                        backgroundColor: validPointsCount < 2 ? '#f3f4f6' : '#1b5e20',
                        color: validPointsCount < 2 ? '#9ca3af' : 'white',
                        border: validPointsCount < 2 ? '1px solid #d1d5db' : 'none',
                        minHeight: '48px',
                        height: '48px',
                        padding: '0 1rem'
                      }}
                      className="flex-1 inline-flex items-center justify-center text-sm font-medium rounded-lg hover:bg-[#0d4b11] transition-colors whitespace-nowrap"
                    >
                      <span>Calculate</span>
                    </button>

                    <button
                      onClick={saveToDatabase}
                      disabled={validPointsCount < 2 || results.length === 0}
                      style={{ 
                        backgroundColor: '#16a34a',
                        color: 'white',
                        border: 'none',
                        minHeight: '48px',
                        height: '48px',
                        padding: '0 1rem'
                      }}
                      className="flex-1 inline-flex items-center justify-center text-sm font-medium rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                    >
                      <span>Save to DB</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                          #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Point ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Easting
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Northing
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.map((row, index) => (
                        <tr 
                          key={index}
                          className={`hover:bg-gray-50 transition-colors ${
                            selectedPoint === index ? 'bg-blue-50' : ''
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={row.id}
                              onChange={(e) => {
                                const newData = [...data];
                                newData[index].id = e.target.value;
                                setData(newData);
                              }}
                              onFocus={() => setSelectedPoint(index)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              placeholder="e.g., T1"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              step="0.001"
                              value={row.easting}
                              onChange={(e) => {
                                const newData = [...data];
                                newData[index].easting = e.target.value;
                                setData(newData);
                              }}
                              onFocus={() => setSelectedPoint(index)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              placeholder="0.000"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              step="0.001"
                              value={row.northing}
                              onChange={(e) => {
                                const newData = [...data];
                                newData[index].northing = e.target.value;
                                setData(newData);
                              }}
                              onFocus={() => setSelectedPoint(index)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              placeholder="0.000"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => removeRow(index)}
                              disabled={data.length === 1}
                              className={`p-1.5 rounded-md transition-colors ${
                                data.length === 1
                                  ? 'text-gray-300 cursor-not-allowed'
                                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                              }`}
                              title="Remove row"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-200">
                  <button
                    onClick={() => setData([...data, { id: '', easting: '', northing: '' }])}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add new row
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {results.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Results
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {results.length} line segment{results.length !== 1 ? 's' : ''} calculated
                        </p>
                      </div>
                      <button
                        onClick={exportResults}
                        style={{ 
                          backgroundColor: '#16a34a',
                          color: 'white',
                          border: 'none',
                          minHeight: '40px',
                          height: '40px',
                          padding: '0 1rem'
                        }}
                        className="inline-flex items-center text-sm font-medium rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                      >
                        <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            From
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            To
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Azimuth
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Distance
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {results.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {row.from}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {row.to}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {row.azimuthDMS}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {row.distance.toFixed(3)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          Total Distance
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {results.reduce((sum, r) => sum + r.distance, 0).toFixed(3)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          Avg Distance
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {(results.reduce((sum, r) => sum + r.distance, 0) / results.length).toFixed(3)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          Segments
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {results.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ----- CSV Sorter View (now loads most recent session, user top‑right) -----
  const CSVSorterView = ({ setCurrentView }) => {
    const [csvData, setCsvData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedExportFields, setSelectedExportFields] = useState([]);
    const [selectedGroupsToExport, setSelectedGroupsToExport] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [sortingMethod, setSortingMethod] = useState('unique_values');
    const [prefixPattern, setPrefixPattern] = useState('^([A-Za-z]+)');
    const [includeHeaders, setIncludeHeaders] = useState(true);
    const [isLoadingSession, setIsLoadingSession] = useState(true);
    const fileInputRef = useRef(null);

    // Load most recent CSV sort session
    useEffect(() => {
      if (currentProject?.id) {
        loadMostRecentSession();
      }
    }, [currentProject?.id]);

    const loadMostRecentSession = async () => {
      setIsLoadingSession(true);
      try {
        const { data } = await getMostRecentCsvSortSession(currentProject.id);
        if (data) {
          setSortingMethod(data.sorting_method);
          setSelectedColumn(data.sorting_field);
          if (data.prefix_pattern) setPrefixPattern(data.prefix_pattern);
          setSelectedExportFields(data.selected_fields);
          setIncludeHeaders(data.include_headers);
        }
      } catch (error) {
        console.error('Error loading CSV sort session:', error);
      } finally {
        setIsLoadingSession(false);
      }
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      Papa.parse(file, {
        header: true,
        dynamicTyping: false,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data.length > 0) {
            setCsvData(results.data);
            setHeaders(results.meta.fields || []);
            
            if (results.meta.fields && results.meta.fields.length > 0) {
              const col = selectedColumn || results.meta.fields[0];
              setSelectedColumn(col);
              updateUniqueValues(results.data, col);
              if (!selectedExportFields.length) {
                setSelectedExportFields([...results.meta.fields]);
              }
            }
          }
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          alert('Error parsing CSV file');
        }
      });
    };

    const updateUniqueValues = (data, column) => {
      if (!data || data.length === 0 || !column) return;
      
      if (sortingMethod === 'unique_values') {
        const uniqueValues = [...new Set(data
          .map(row => {
            const value = row[column];
            if (value === null || value === undefined || value === '') return 'Unknown';
            return String(value).trim();
          })
        )].sort();
        
        setSelectedValues(uniqueValues);
        setSelectedGroupsToExport(uniqueValues);
      } else {
        const prefixes = extractPrefixes(data, column);
        setSelectedValues(prefixes);
        setSelectedGroupsToExport(prefixes);
      }
    };

    const handleColumnChange = (column) => {
      setSelectedColumn(column);
      if (csvData.length > 0) {
        updateUniqueValues(csvData, column);
      }
    };

    const handleSortingMethodChange = (method) => {
      setSortingMethod(method);
      if (selectedColumn && csvData.length > 0) {
        updateUniqueValues(csvData, selectedColumn);
      }
    };

    const toggleExportField = (field) => {
      setSelectedExportFields(prev => {
        if (prev.includes(field)) {
          return prev.filter(f => f !== field);
        } else {
          return [...prev, field];
        }
      });
    };

    const toggleAllExportFields = () => {
      if (selectedExportFields.length === headers.length) {
        setSelectedExportFields([]);
      } else {
        setSelectedExportFields([...headers]);
      }
    };

    const toggleGroupExport = (group) => {
      setSelectedGroupsToExport(prev => {
        if (prev.includes(group)) {
          return prev.filter(g => g !== group);
        } else {
          return [...prev, group];
        }
      });
    };

    const toggleAllGroups = () => {
      if (selectedGroupsToExport.length === selectedValues.length) {
        setSelectedGroupsToExport([]);
      } else {
        setSelectedGroupsToExport([...selectedValues]);
      }
    };

    const extractPrefixes = (data, column) => {
      try {
        const prefixRegex = new RegExp(prefixPattern);
        const prefixes = new Set();
        
        data.forEach(row => {
          let value = row[column];
          if (value === null || value === undefined || value === '') {
            value = 'Unknown';
          }
          const strValue = String(value).trim();
          const match = strValue.match(prefixRegex);
          if (match && match[1]) {
            prefixes.add(match[1].toUpperCase());
          }
        });
        
        return [...prefixes].sort();
      } catch (error) {
        console.error('Invalid regex pattern:', error);
        return [];
      }
    };

    const handleSortAndExport = async () => {
      if (csvData.length === 0 || !selectedColumn || selectedExportFields.length === 0) {
        alert('Please upload a CSV file, select a column, and choose fields to export');
        return;
      }

      if (selectedGroupsToExport.length === 0) {
        alert('Please select at least one group to export');
        return;
      }

      setIsProcessing(true);

      try {
        const cleanedData = csvData.map(row => {
          const cleanedRow = { ...row };
          if (selectedColumn in cleanedRow) {
            let value = cleanedRow[selectedColumn];
            if (value === null || value === undefined || value === '') {
              value = 'Unknown';
            }
            cleanedRow[selectedColumn] = String(value).trim();
          }
          return cleanedRow;
        });

        let groups = [];

        if (sortingMethod === 'unique_values') {
          const uniqueValues = [...new Set(cleanedData.map(row => row[selectedColumn]))];
          groups = uniqueValues.map(value => ({
            key: value,
            data: cleanedData.filter(row => row[selectedColumn] === value)
          }));
        } else {
          const prefixRegex = new RegExp(prefixPattern);
          const dataWithPrefix = cleanedData.map(row => {
            const value = row[selectedColumn];
            const match = String(value).match(prefixRegex);
            const prefix = match && match[1] ? match[1].toUpperCase() : 'Unknown';
            return { ...row, __prefix: prefix };
          });
          const uniquePrefixes = [...new Set(dataWithPrefix.map(row => row.__prefix))];
          groups = uniquePrefixes.map(prefix => ({
            key: prefix,
            data: dataWithPrefix
              .filter(row => row.__prefix === prefix)
              .map(row => {
                const { __prefix, ...rest } = row;
                return rest;
              })
          }));
        }

        const filteredGroups = groups.filter(group => selectedGroupsToExport.includes(group.key));

        // Save session to database
        const sessionResult = await createCsvSortSession(
          currentProject.id,
          sortingMethod,
          selectedColumn,
          sortingMethod === 'prefix' ? prefixPattern : null,
          selectedExportFields,
          includeHeaders
        );

        if (sessionResult.error) {
          console.error('Failed to create CSV sort session:', sessionResult.error);
          alert('Failed to save session to database, but files will still be downloaded.');
        }

        const sessionId = sessionResult.data?.id;

        // Create and download each file, and save file record
        let filesCreated = 0;
        for (const group of filteredGroups) {
          if (group.data.length === 0) continue;

          const exportData = group.data.map(row => {
            const exportRow = {};
            selectedExportFields.forEach(field => {
              exportRow[field] = row[field] !== undefined && row[field] !== null ? row[field] : '';
            });
            return exportRow;
          });

          const csv = Papa.unparse(exportData, {
            header: includeHeaders,
            skipEmptyLines: false,
            quotes: false
          });

          const sanitizedKey = group.key.replace(/[^a-z0-9_-]/gi, '_');
          const filename = sortingMethod === 'unique_values'
            ? `${sanitizedKey}_${selectedColumn}.csv`
            : `${sanitizedKey}${selectedColumn}.csv`;

          // Trigger download
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = filename;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Save file record if session was created
          if (sessionId) {
            await saveCsvExportFile(sessionId, currentProject.id, filename, group.key, group.data.length);
          }

          filesCreated++;
        }

        alert(`Successfully exported ${filesCreated} files!`);

      } catch (error) {
        console.error('Error processing CSV:', error);
        alert('Error processing CSV: ' + error.message);
      } finally {
        setIsProcessing(false);
      }
    };

    const downloadSampleCSV = () => {
      const sampleData = [
        { Name: 'ABC001', E: '500123.45', N: '8000234.56', Z: '150.2', Description: 'Type A' },
        { Name: 'ABC002', E: '500145.67', N: '8000256.78', Z: '152.5', Description: 'Type A' },
        { Name: 'DEF001', E: '500167.89', N: '8000278.90', Z: '148.7', Description: 'Type B' },
        { Name: 'DEF002', E: '500189.01', N: '8000290.12', Z: '151.3', Description: 'Type B' },
        { Name: 'XYZ001', E: '500201.23', N: '8000312.34', Z: '155.8', Description: 'Type C' }
      ];
      
      const csv = Papa.unparse(sampleData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'sample_data.csv';
      link.click();
    };

    const handleChooseFileClick = () => {
      fileInputRef.current?.click();
    };

    if (isLoadingSession) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mb-4"></div>
            <p className="text-slate-600">Loading saved session...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="csv-sorter-container">
        <style>{`
          /* All CSS from your code – included here for completeness */
          .csv-sorter-container { min-height: 100vh; background-color: #f8fafc; padding: 2rem 1rem; }
          .csv-sorter-content { max-width: 1200px; margin: 0 auto; }
          .csv-sorter-back-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: none; border: none; color: #475569; font-size: 0.95rem; cursor: pointer; border-radius: 0.375rem; }
          .csv-sorter-back-btn:hover { color: #0f172a; background-color: #f1f5f9; }
          .csv-sorter-title { text-align: center; margin-bottom: 2rem; }
          .csv-sorter-title h1 { font-size: 2rem; font-weight: 600; color: #0f172a; margin-bottom: 0.5rem; }
          .csv-sorter-title p { color: #64748b; font-size: 1rem; }
          .csv-sorter-card { background: white; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
          .csv-sorter-card h2 { font-size: 1.25rem; font-weight: 600; color: #0f172a; margin-bottom: 1rem; }
          .csv-sorter-card h3 { font-size: 1rem; font-weight: 500; color: #334155; margin-bottom: 0.75rem; }
          .csv-sorter-status { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: white; border: 1px solid #e2e8f0; border-radius: 0.5rem; margin-bottom: 1.5rem; }
          .csv-sorter-status-info h3 { font-size: 1rem; font-weight: 500; color: #0f172a; margin-bottom: 0.25rem; }
          .csv-sorter-status-info p { font-size: 0.875rem; color: #64748b; }
          .csv-sorter-clear-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: none; border: 1px solid #fecaca; border-radius: 0.5rem; color: #dc2626; font-size: 0.875rem; font-weight: 500; cursor: pointer; }
          .csv-sorter-clear-btn:hover { background-color: #fef2f2; }
          .csv-sorter-upload-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem; }
          .csv-sorter-primary-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background-color: #1b5e20; color: white; border: none; border-radius: 0.5rem; font-weight: 500; font-size: 0.95rem; cursor: pointer; }
          .csv-sorter-primary-btn:hover { background-color: #0d4b11; }
          .csv-sorter-secondary-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: white; border: 1px solid #cbd5e1; border-radius: 0.5rem; color: #334155; font-weight: 500; font-size: 0.95rem; cursor: pointer; }
          .csv-sorter-secondary-btn:hover { background-color: #f8fafc; border-color: #94a3b8; }
          .csv-sorter-success-message { padding: 0.75rem; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 0.5rem; color: #166534; font-size: 0.875rem; }
          .csv-sorter-preview { overflow-x: auto; margin-top: 1rem; }
          .csv-sorter-preview table { width: 100%; border-collapse: collapse; }
          .csv-sorter-preview th { text-align: left; padding: 0.75rem; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; font-size: 0.875rem; font-weight: 500; color: #475569; }
          .csv-sorter-preview td { padding: 0.75rem; border-bottom: 1px solid #f1f5f9; font-size: 0.875rem; color: #0f172a; }
          .csv-sorter-radio-group { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.5rem; }
          .csv-sorter-radio-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.95rem; color: #334155; }
          .csv-sorter-radio-label input[type="radio"] { width: 1rem; height: 1rem; accent-color: #1b5e20; }
          .csv-sorter-select { width: 100%; max-width: 320px; padding: 0.625rem 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; font-size: 0.95rem; color: #0f172a; background-color: white; }
          .csv-sorter-select:focus { outline: none; border-color: #1b5e20; box-shadow: 0 0 0 3px rgba(27,94,32,0.1); }
          .csv-sorter-input { width: 100%; max-width: 480px; padding: 0.625rem 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; font-size: 0.95rem; color: #0f172a; }
          .csv-sorter-input:focus { outline: none; border-color: #1b5e20; box-shadow: 0 0 0 3px rgba(27,94,32,0.1); }
          .csv-sorter-hint { font-size: 0.875rem; color: #64748b; margin-top: 0.25rem; }
          .csv-sorter-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
          .csv-sorter-tag { padding: 0.375rem 0.75rem; background-color: #f1f5f9; border-radius: 0.375rem; font-size: 0.875rem; font-family: monospace; color: #334155; }
          .csv-sorter-tag-more { padding: 0.375rem 0.75rem; background-color: #f1f5f9; border-radius: 0.375rem; font-size: 0.875rem; color: #64748b; }
          .csv-sorter-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem; }
          .csv-sorter-action-btn { padding: 0.5rem 1rem; background: white; border: 1px solid #cbd5e1; border-radius: 0.5rem; color: #334155; font-size: 0.875rem; font-weight: 500; cursor: pointer; }
          .csv-sorter-action-btn:hover { background-color: #f8fafc; border-color: #94a3b8; }
          .csv-sorter-checkbox-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem 2rem; margin: 1.5rem 0; }
          .csv-sorter-checkbox-item { display: flex; align-items: center; padding: 0.5rem 0.75rem; border-radius: 0.375rem; cursor: pointer; min-width: 0; }
          .csv-sorter-checkbox-item:hover { background-color: #f1f5f9; }
          .csv-sorter-checkbox-item input[type="checkbox"] { width: 1rem; height: 1rem; accent-color: #1b5e20; cursor: pointer; flex-shrink: 0; margin-right: 0.75rem; }
          .csv-sorter-checkbox-item label { font-size: 0.875rem; font-weight: 500; color: #0f172a; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          @media (max-width: 1024px) { .csv-sorter-checkbox-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 768px) { .csv-sorter-checkbox-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 480px) { .csv-sorter-checkbox-grid { grid-template-columns: repeat(1, 1fr); } }
          .csv-sorter-info-box { padding: 0.75rem; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 0.5rem; margin-top: 1rem; }
          .csv-sorter-info-box p { font-size: 0.875rem; color: #1d4ed8; }
          .csv-sorter-stats-box { padding: 0.5rem 1rem; background-color: #f8fafc; border-radius: 0.5rem; color: #334155; font-size: 0.875rem; }
          .csv-sorter-stats-box span { font-weight: 600; color: #0f172a; }
          .csv-sorter-export-btn { width: 100%; padding: 1rem; border: none; border-radius: 0.5rem; font-weight: 600; font-size: 1rem; cursor: pointer; background-color: #16a34a; color: white; }
          .csv-sorter-export-btn:hover:not(:disabled) { background-color: #15803d; }
          .csv-sorter-export-btn:disabled { background-color: #cbd5e1; color: #64748b; cursor: not-allowed; }
          .csv-sorter-export-info { margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
          .csv-sorter-export-info p { font-size: 0.875rem; color: #475569; }
          .csv-sorter-guide-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
          .csv-sorter-guide-item { padding: 0.75rem; background-color: #f8fafc; border-radius: 0.5rem; }
          .csv-sorter-guide-item h4 { font-weight: 500; color: #0f172a; margin-bottom: 0.25rem; font-size: 0.875rem; }
          .csv-sorter-guide-item p { font-size: 0.75rem; color: #64748b; }
          .csv-sorter-example-box { padding: 0.75rem; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 0.5rem; }
          .csv-sorter-example-box p { font-size: 0.75rem; color: #1d4ed8; }
          @media (max-width: 640px) { .csv-sorter-guide-grid { grid-template-columns: 1fr; } }
        `}</style>

        <div className="csv-sorter-content">
          {/* Top bar: back button left, user right */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setCurrentView('project')} className="csv-sorter-back-btn">
              <ArrowLeft size={20} />Back to Project
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">{userName || 'User'}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="csv-sorter-title">
            <h1>CSV Sorter & Exporter</h1>
            <p>Upload CSV files, sort by column values or prefix patterns, and export filtered data</p>
          </div>

          {csvData.length > 0 && (
            <div className="csv-sorter-status">
              <div className="csv-sorter-status-info">
                <h3>File Loaded</h3>
                <p>{csvData.length} rows, {headers.length} columns</p>
              </div>
              <button 
                onClick={() => {
                  setCsvData([]);
                  setHeaders([]);
                  setSelectedColumn('');
                  setSelectedValues([]);
                  setSelectedExportFields([]);
                  setSelectedGroupsToExport([]);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="csv-sorter-clear-btn"
              >
                <X size={16} />Clear Data
              </button>
            </div>
          )}

          <div className="csv-sorter-card">
            <h2>1. Upload CSV File</h2>
            <input type="file" accept=".csv,.txt" onChange={handleFileUpload} ref={fileInputRef} style={{ display: 'none' }} />
            <div className="csv-sorter-upload-actions">
              <button onClick={handleChooseFileClick} className="csv-sorter-primary-btn">
                <Upload size={20} /> Choose CSV File
              </button>
              <button onClick={downloadSampleCSV} className="csv-sorter-secondary-btn">
                <Download size={20} /> Download Sample
              </button>
            </div>
            {csvData.length > 0 && (
              <div className="csv-sorter-success-message">
                ✓ Successfully loaded {csvData.length} rows with {headers.length} columns
              </div>
            )}
          </div>

          {csvData.length > 0 && (
            <>
              <div className="csv-sorter-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2>Data Preview (First 5 rows)</h2>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Total: {csvData.length} rows</span>
                </div>
                <div className="csv-sorter-preview">
                  <table>
                    <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
                    <tbody>
                      {csvData.slice(0, 5).map((row, i) => (
                        <tr key={i}>{headers.map(h => <td key={h}>{row[h] !== undefined ? String(row[h]) : ''}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="csv-sorter-card">
                <h2>2. Configure Sorting</h2>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3>Sorting Method:</h3>
                  <div className="csv-sorter-radio-group">
                    <label className="csv-sorter-radio-label">
                      <input type="radio" value="unique_values" checked={sortingMethod === 'unique_values'} onChange={(e) => handleSortingMethodChange(e.target.value)} />
                      <span>Group by unique values</span>
                    </label>
                    <label className="csv-sorter-radio-label">
                      <input type="radio" value="prefix" checked={sortingMethod === 'prefix'} onChange={(e) => handleSortingMethodChange(e.target.value)} />
                      <span>Group by prefix pattern (regex)</span>
                    </label>
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3>Sort by Column:</h3>
                  <select value={selectedColumn} onChange={(e) => handleColumnChange(e.target.value)} className="csv-sorter-select">
                    {headers.map(header => <option key={header} value={header}>{header}</option>)}
                  </select>
                </div>
                {sortingMethod === 'prefix' && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3>Prefix Pattern (regex):</h3>
                    <input type="text" value={prefixPattern} onChange={(e) => { setPrefixPattern(e.target.value); if (selectedColumn && csvData.length > 0) setTimeout(() => updateUniqueValues(csvData, selectedColumn), 100); }} placeholder="e.g., ^([A-Za-z]+)" className="csv-sorter-input" />
                    <p className="csv-sorter-hint">Extracts the first capturing group and converts to uppercase (e.g., ABC from ABC001)</p>
                  </div>
                )}
                <div>
                  <h3>{sortingMethod === 'unique_values' ? 'Unique Values' : 'Unique Prefixes'} Found ({selectedValues.length}):</h3>
                  <div className="csv-sorter-tags">
                    {selectedValues.slice(0, 20).map((v, i) => <span key={i} className="csv-sorter-tag">{v}</span>)}
                    {selectedValues.length > 20 && <span className="csv-sorter-tag-more">+{selectedValues.length - 20} more...</span>}
                  </div>
                </div>
              </div>

              <div className="csv-sorter-card">
                <h2>3. Select Fields to Export</h2>
                <div className="csv-sorter-actions">
                  <button onClick={toggleAllExportFields} className="csv-sorter-action-btn">
                    {selectedExportFields.length === headers.length ? 'Deselect All' : 'Select All'}
                  </button>
                  <label className="csv-sorter-action-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={includeHeaders} onChange={(e) => setIncludeHeaders(e.target.checked)} style={{ width: '1rem', height: '1rem' }} />
                    <span>Include column headers</span>
                  </label>
                </div>
                <div className="csv-sorter-checkbox-grid">
                  {headers.map(field => (
                    <div key={field} className="csv-sorter-checkbox-item" onClick={() => toggleExportField(field)}>
                      <input type="checkbox" id={`field-${field}`} checked={selectedExportFields.includes(field)} onChange={() => {}} onClick={(e) => e.stopPropagation()} />
                      <label htmlFor={`field-${field}`} title={field}>{field}</label>
                    </div>
                  ))}
                </div>
                <div className="csv-sorter-info-box"><p>Selected: {selectedExportFields.length} of {headers.length} fields</p></div>
              </div>

              <div className="csv-sorter-card">
                <h2>4. Select CSV Files to Export</h2>
                <div className="csv-sorter-actions">
                  <button onClick={toggleAllGroups} className="csv-sorter-action-btn">
                    {selectedGroupsToExport.length === selectedValues.length ? 'Deselect All' : 'Select All'}
                  </button>
                  <div className="csv-sorter-stats-box"><span>{selectedGroupsToExport.length}</span> of {selectedValues.length} files selected</div>
                </div>
                <div className="csv-sorter-checkbox-grid">
                  {selectedValues.map(group => (
                    <div key={group} className="csv-sorter-checkbox-item" onClick={() => toggleGroupExport(group)}>
                      <input type="checkbox" id={`group-${group}`} checked={selectedGroupsToExport.includes(group)} onChange={() => {}} onClick={(e) => e.stopPropagation()} />
                      <label htmlFor={`group-${group}`} title={group}>{group}</label>
                    </div>
                  ))}
                </div>
                <div className="csv-sorter-info-box"><p>✓ {selectedGroupsToExport.length} CSV {selectedGroupsToExport.length === 1 ? 'file will' : 'files will'} be exported</p></div>
              </div>

              <div className="csv-sorter-card">
                <button onClick={handleSortAndExport} disabled={isProcessing || selectedExportFields.length === 0 || selectedGroupsToExport.length === 0} className="csv-sorter-export-btn">
                  {isProcessing ? 'Processing...' : `Sort & Export ${selectedGroupsToExport.length} ${selectedGroupsToExport.length === 1 ? 'File' : 'Files'}`}
                </button>
                <div className="csv-sorter-export-info">
                  {sortingMethod === 'unique_values' && <p>✓ Creates {selectedValues.length} CSV files, one for each unique value in "{selectedColumn}"</p>}
                  {sortingMethod === 'prefix' && <p>✓ Creates {selectedValues.length} CSV files, one for each prefix pattern found in "{selectedColumn}"</p>}
                  <p>✓ Only selected fields ({selectedExportFields.length}) will be included</p>
                  <p>✓ Only {selectedGroupsToExport.length} of {selectedValues.length} CSV {selectedGroupsToExport.length === 1 ? 'file will' : 'files will'} be exported</p>
                  <p>✓ Headers will {includeHeaders ? 'be included' : 'NOT be included'} in exported files</p>
                </div>
              </div>
            </>
          )}

          <div className="csv-sorter-card">
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Quick Guide</h3>
            <div className="csv-sorter-guide-grid">
              <div className="csv-sorter-guide-item"><h4>Method 1: Unique Values</h4><p>Groups by exact matches. Ideal for splitting by categories or descriptions.</p></div>
              <div className="csv-sorter-guide-item"><h4>Method 2: Prefix Pattern</h4><p>Uses regex to extract prefixes. Perfect for point codes like ABC001, DEF002.</p></div>
            </div>
            <div className="csv-sorter-example-box">
              <p><strong>Example:</strong> Upload survey data → Choose sorting column (Name or Description) → Select export fields (E, N, Z) → Choose which CSV files to export → Export selected files</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ----- Main render with initialisation check -----
  if (isInitializing) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {!isAuthenticated && currentView === 'login' && (
        <LoginView 
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentView('signup')}
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          loginError={loginError}
        />
      )}
      
      {!isAuthenticated && currentView === 'signup' && (
        <SignupView 
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentView('login')}
          signupForm={signupForm}
          setSignupForm={setSignupForm}
          signupError={signupError}
        />
      )}
      
      {isAuthenticated && currentView === 'home' && <HomeView />}
      {isAuthenticated && currentView === 'project' && <ProjectView />}
      {isAuthenticated && currentView === 'levelling' && <LevellingView setCurrentView={setCurrentView} />}
      {isAuthenticated && currentView === 'azimuth-distance' && <AzimuthDistanceView setCurrentView={setCurrentView} />}
      {isAuthenticated && currentView === 'swing-scale' && <SwingScaleView setCurrentView={setCurrentView} />}
      {isAuthenticated && currentView === 'csv-sorter' && <CSVSorterView setCurrentView={setCurrentView} />}
    </>
  );
};

export default App;