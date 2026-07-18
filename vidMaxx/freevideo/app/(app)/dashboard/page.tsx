import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    return null; // Let middleware handle the redirect
  }

  // --- SYNC LOGIC ---
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const primaryEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;

  try {
    const { data, error: selectError } = await supabase
      .from('users')
      .select('user_id')
      .eq('user_id', user.id)
      .single();

    if (!data) {
      const { error: insertError } = await supabase.from('users').insert({
        user_id: user.id, // The Clerk user ID
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: primaryEmail,
      });

      if (insertError) {
        console.error("Failed to insert user:", insertError);
      }
    }
  } catch (error) {
    console.error("Supabase sync failed:", error);
  }
  // ------------------

  return (
    <div className="w-full">
      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-semibold mb-2 text-white">Welcome back, {user.firstName || 'User'}!</h2>
        <p className="text-zinc-400 font-medium leading-relaxed max-w-2xl">
          This is your central hub for managing your automated video infrastructure. Your account details have been successfully synced with our secure database. 
        </p>
      </div>
    </div>
  );
}
