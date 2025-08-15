-- First, let's check and fix the RLS policies
-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow public enquiry submissions" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to read enquiries" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to update enquiries" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to delete enquiries" ON enquiries;

-- Create comprehensive policies
-- 1. Allow anyone (including anonymous users) to insert enquiries
CREATE POLICY "Enable insert for all users" ON enquiries
    FOR INSERT 
    WITH CHECK (true);

-- 2. Allow authenticated users to read all enquiries
CREATE POLICY "Enable read for authenticated users" ON enquiries
    FOR SELECT 
    TO authenticated
    USING (true);

-- 3. Allow authenticated users to update enquiries
CREATE POLICY "Enable update for authenticated users" ON enquiries
    FOR UPDATE 
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Allow authenticated users to delete enquiries
CREATE POLICY "Enable delete for authenticated users" ON enquiries
    FOR DELETE 
    TO authenticated
    USING (true);

-- Ensure RLS is enabled
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON enquiries TO anon;
GRANT ALL ON enquiries TO authenticated;
