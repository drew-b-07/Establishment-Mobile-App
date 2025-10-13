import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://mjftoxillyjatgwubonn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZnRveGlsbHlqYXRnd3Vib25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MjQ2NzYsImV4cCI6MjA3NDQwMDY3Nn0.unc6SZs6NunWAJcs1QzvzCeCWxtmVWwOsyGsdiy9vAY'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;