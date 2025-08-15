-- Enable RLS on the enquiries table (if not already enabled)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow anyone to insert enquiries (for public form submissions)
CREATE POLICY "Allow public enquiry submissions" ON enquiries
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Policy 2: Allow authenticated users to read all enquiries (for admin dashboard)
CREATE POLICY "Allow authenticated users to read enquiries" ON enquiries
    FOR SELECT 
    TO authenticated 
    USING (true);

-- Policy 3: Allow authenticated users to update enquiries (optional)
CREATE POLICY "Allow authenticated users to update enquiries" ON enquiries
    FOR UPDATE 
    TO authenticated 
    USING (true);

-- Policy 4: Allow authenticated users to delete enquiries (optional)
CREATE POLICY "Allow authenticated users to delete enquiries" ON enquiries
    FOR DELETE 
    TO authenticated 
    USING (true);
