import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are a helpful AI assistant for a restaurant called "Delicious Bites". Your role is to recommend dishes based on customer preferences.

Our menu includes:
- Margherita Pizza ($12) - Classic tomato sauce, fresh mozzarella, basil
- Pepperoni Pizza ($14) - Tomato sauce, mozzarella, pepperoni
- Caesar Salad ($8) - Romaine lettuce, parmesan, croutons, caesar dressing
- Grilled Chicken ($16) - Herb-marinated chicken breast with vegetables
- Spaghetti Carbonara ($15) - Pasta with bacon, eggs, parmesan
- Beef Burger ($13) - Angus beef patty, lettuce, tomato, cheese
- Fish Tacos ($14) - Grilled fish, cabbage slaw, lime crema
- Chocolate Cake ($7) - Rich chocolate cake with ganache

Ask customers about their preferences like:
- Dietary restrictions (vegetarian, gluten-free, etc.)
- Flavor preferences (spicy, savory, sweet)
- Budget
- Meal type (light/heavy)

Based on their answers, recommend 2-3 dishes that best match their preferences. Be friendly, concise, and helpful!`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error('AI Gateway request failed');
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    return new Response(JSON.stringify({ message: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-menu-chat:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
