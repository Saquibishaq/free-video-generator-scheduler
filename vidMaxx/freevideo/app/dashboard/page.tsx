import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // --- SYNC LOGIC ---
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const primaryEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;

  const { data } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single();

  if (!data) {
    await supabase.from('users').insert({
      id: user.id,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      email: primaryEmail,
    });
  }
  // ------------------

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-16">
      <h1 className="font-heading text-4xl font-bold tracking-tight mb-8">Dashboard</h1>
      
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-medium mb-4">Welcome back, {user.firstName || 'User'}!</h2>
        <p className="text-zinc-400">
          This is your central hub for managing your automated video infrastructure. Your account details have been successfully synced with our secure database.
        </p>
      </div>
    </div>
  );
}
