/**
 * Supabase Client Configuration for React Native
 * 
 * This file initializes the Supabase client with proper configuration for React Native apps,
 * including AsyncStorage for session persistence across app restarts.
 * 
 * Environment variables required:
 * - SUPABASE_URL: Your Supabase project URL
 * - SUPABASE_ANON_KEY: Your Supabase anonymous/public key
 * 
 * Best practices for 2025:
 * - Uses AsyncStorage for session persistence
 * - Implements proper TypeScript typing
 * - Includes error handling and validation
 * - Configured for both Android and iOS deployment
 */

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

// Type definitions for better type safety
export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

/**
 * Validate environment variables
 * Ensures that required Supabase credentials are present before initialization
 */
const validateEnvironmentVariables = (): void => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const missingVars: string[] = [];
    if (!SUPABASE_URL) missingVars.push('SUPABASE_URL');
    if (!SUPABASE_ANON_KEY) missingVars.push('SUPABASE_ANON_KEY');
    
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}. ` +
      'Please check your .env file and ensure all Supabase credentials are set.'
    );
  }

  // Validate URL format
  try {
    new URL(SUPABASE_URL);
  } catch (error) {
    throw new Error(
      'Invalid SUPABASE_URL format. Expected a valid URL (e.g., https://your-project.supabase.co)'
    );
  }
};

// Validate environment variables on module load
validateEnvironmentVariables();

/**
 * Initialize Supabase client with React Native specific configuration
 * 
 * Configuration includes:
 * - AsyncStorage: Persists user sessions across app restarts
 * - autoRefreshToken: Automatically refreshes expired tokens
 * - persistSession: Maintains user authentication state
 * - detectSessionInUrl: Disabled for React Native (URL-based auth not applicable)
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Use AsyncStorage for session persistence in React Native
    storage: AsyncStorage,
    
    // Automatically refresh tokens when they expire
    autoRefreshToken: true,
    
    // Persist session across app restarts
    persistSession: true,
    
    // Disable URL-based session detection (not applicable in React Native)
    detectSessionInUrl: false,
    
    // Flow type for OAuth (PKCE is recommended for mobile apps)
    flowType: 'pkce',
  },
});

/**
 * Helper function to check if the Supabase client is properly initialized
 * Useful for debugging and ensuring the client is ready before making requests
 */
export const isSupabaseInitialized = (): boolean => {
  try {
    return Boolean(supabase && SUPABASE_URL && SUPABASE_ANON_KEY);
  } catch (error) {
    console.error('Supabase initialization check failed:', error);
    return false;
  }
};

/**
 * Helper function to test Supabase connection
 * Can be used during app initialization to verify connectivity
 */
export const testSupabaseConnection = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    // Attempt to get the current session (will return null if not authenticated)
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return {
        success: false,
        message: `Connection test failed: ${error.message}`,
      };
    }
    
    return {
      success: true,
      message: 'Successfully connected to Supabase',
    };
  } catch (error) {
    return {
      success: false,
      message: `Connection test error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};

/**
 * Export the Supabase client as default for convenient importing
 * Usage: import supabase from '@/services/supabase';
 */
export default supabase;

/**
 * Usage Examples:
 * 
 * // Authentication
 * const { data, error } = await supabase.auth.signInWithPassword({
 *   email: 'user@example.com',
 *   password: 'password123'
 * });
 * 
 * // Database query
 * const { data, error } = await supabase
 *   .from('meetups')
 *   .select('*')
 *   .eq('status', 'active');
 * 
 * // Real-time subscription
 * const subscription = supabase
 *   .channel('meetups-changes')
 *   .on('postgres_changes', 
 *     { event: '*', schema: 'public', table: 'meetups' },
 *     (payload) => console.log('Change received!', payload)
 *   )
 *   .subscribe();
 * 
 * // Storage upload
 * const { data, error } = await supabase.storage
 *   .from('avatars')
 *   .upload('user-avatar.jpg', file);
 */