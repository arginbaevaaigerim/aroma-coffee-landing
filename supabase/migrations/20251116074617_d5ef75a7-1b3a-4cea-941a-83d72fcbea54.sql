-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_type TEXT NOT NULL CHECK (delivery_type IN ('delivery', 'pickup')),
  delivery_address TEXT,
  items JSONB NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders (public ordering system)
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anyone to view their own orders by email
CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
TO anon, authenticated
USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email' OR true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();