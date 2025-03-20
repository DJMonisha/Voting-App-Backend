
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://gbkdexfrtoiagglhksfi.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdia2RleGZydG9pYWdnbGhrc2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0Nzc4NjIsImV4cCI6MjA1ODA1Mzg2Mn0.uUXi-N5_5uBklU7S3E1vpYM6QFGCF8FsKU8i_FhmCNY";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const testConnection = async () => {
    const { data, error } = await supabase.from('votes').select('*');
    if (error) {
        console.error("❌ Supabase connection failed:", error);
    } else {
        console.log("✅ Supabase connection successful:", data);
    }
};

testConnection();
