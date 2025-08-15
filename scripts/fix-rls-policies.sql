-- First, let's check and fix the RLS policies
-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public enquiry submissions" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to read enquiries" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to update enquiries" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to delete enquiries" ON enquiries;

-- Create a comprehensive policy that allows both anon and authenticated users
CREATE POLICY "Enable read access for authenticated users" ON enquiries
    FOR SELECT 
    TO authenticated
    USING (true);

CREATE POLICY "Enable insert for all users" ON enquiries
    FOR INSERT 
    TO public
    WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON enquiries
    FOR UPDATE 
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users" ON enquiries
    FOR DELETE 
    TO authenticated
    USING (true);

-- Grant necessary permissions
GRANT ALL ON enquiries TO authenticated;
GRANT INSERT ON enquiries TO anon;
GRANT SELECT ON enquiries TO authenticated;

-- Also grant permissions on the sequence if using serial IDs
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
