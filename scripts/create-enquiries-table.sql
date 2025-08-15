-- Create the enquiries table if it doesn't exist
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_name TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    location TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    class TEXT NOT NULL,
    excitement TEXT DEFAULT 'yes',
    date_submitted TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public enquiry submissions" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to read enquiries" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to update enquiries" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to delete enquiries" ON enquiries;

-- Create new policies
CREATE POLICY "Allow public enquiry submissions" ON enquiries
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read enquiries" ON enquiries
    FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY "Allow authenticated users to update enquiries" ON enquiries
    FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Allow authenticated users to delete enquiries" ON enquiries
    FOR DELETE 
    TO authenticated 
    USING (true);
