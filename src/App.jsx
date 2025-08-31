import React, { useState } from 'react'

export default function App() {
  const [route, setRoute] = useState('home')
  const [message, setMessage] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold">NC</div>
            <div>
              <h1 className="text-lg font-semibold">Nurse Connect</h1>
              <p className="text-xs text-gray-500">Connecting nurses to hospitals & homes — locally & internationally</p>
            </div>
          </div>
          <nav className="flex gap-3 items-center">
            <button onClick={() => setRoute('home')} className="text-sm hover:underline">Home</button>
            <button onClick={() => setRoute('nurse')} className="text-sm hover:underline">For Nurses</button>
            <button onClick={() => setRoute('employer')} className="text-sm hover:underline">For Employers</button>
            <button onClick={() => setRoute('playbooks')} className="text-sm hover:underline">Country Playbooks</button>
            <button onClick={() => setRoute('policies')} className="text-sm text-teal-600 font-medium">Compliance</button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {route === 'home' && <Home onSelect={(r) => setRoute(r)} />}
        {route === 'nurse' && <NurseFlow onBack={() => setRoute('home')} setMessage={setMessage} />}
        {route === 'employer' && <EmployerFlow onBack={() => setRoute('home')} setMessage={setMessage} />}
        {route === 'playbooks' && <CountryPlaybooks onBack={() => setRoute('home')} />}
        {route === 'policies' && <Policies onBack={() => setRoute('home')} />}

        {message && (
          <div className="mt-6 p-4 rounded border-l-4 border-teal-500 bg-teal-50 text-teal-800">
            {message}
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold">Nurse Connect</h3>
            <p className="text-sm text-gray-600">Ethical international recruitment. Transparent contracts. Secure credentialing.</p>
          </div>
          <div>
            <h4 className="font-medium">Quick links</h4>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li><button onClick={() => setRoute('nurse')} className="hover:underline">For Nurses</button></li>
              <li><button onClick={() => setRoute('employer')} className="hover:underline">For Employers</button></li>
              <li><button onClick={() => setRoute('playbooks')} className="hover:underline">Country Playbooks</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Contact</h4>
            <p className="text-sm text-gray-600 mt-2">hello@nurseconnect.example</p>
            <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 py-4">© {new Date().getFullYear()} Nurse Connect — All rights reserved</div>
      </footer>
    </div>
  )
}

// ---------------- Supporting Components ----------------

function Home({ onSelect }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold">Healthcare staffing that crosses borders — responsibly</h2>
          <p className="mt-4 text-gray-700">We match licensed, vetted nurses to hospitals and patients across the US, UK, Canada and Australia. Dual-path funnels for nurses and employers make matching fast and compliant.</p>
          <div className="mt-6 flex gap-4">
            <button onClick={() => onSelect('nurse')} className="px-5 py-3 rounded-md bg-teal-600 text-white font-medium shadow">I’m a Nurse — Apply</button>
            <button onClick={() => onSelect('employer')} className="px-5 py-3 rounded-md border border-gray-200">I’m an Employer — Hire</button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4">Quick Nurse Signup</h3>
          <NurseMiniForm fullName={fullName} setFullName={setFullName} email={email} setEmail={setEmail} country={country} setCountry={setCountry} />
        </div>
      </div>
    </section>
  )
}

function NurseMiniForm({ fullName, setFullName, email, setEmail, country, setCountry }) {
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Signup received — continue to full profile'); }}>
      <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">Select country</option>
        <option>United States</option>
        <option>United Kingdom</option>
        <option>Canada</option>
        <option>Australia</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded">Start Application</button>
    </form>
  )
}

function NurseFlow({ onBack, setMessage }) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({ fullName: '', email: '', country: '', license: '' })

  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-500 mb-4">← Back</button>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Nurse Application</h2>
        <p className="text-sm text-gray-600 mt-1">Create a profile, upload credentials, and get matched faster.</p>

        <div className="mt-6">
          <Progress steps={["Profile", "Credentials", "Preferences", "Review"]} current={step} />

          {step === 1 && (
            <div className="mt-4 space-y-4">
              <label className="block text-sm">Full name</label>
              <input value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} className="w-full p-2 border rounded" />

              <label className="block text-sm">Email</label>
              <input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full p-2 border rounded" />

              <label className="block text-sm">Country of qualification</label>
              <select value={profile.country} onChange={(e) => setProfile({ ...profile, country: e.target.value })} className="w-full p-2 border rounded">
                <option value="">Select</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>

              <div className="flex justify-between">
                <div></div>
                <button className
