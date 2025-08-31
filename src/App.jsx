import React, { useState } from 'react';

export default function App() {
  const [route, setRoute] = useState('home');
  const [message, setMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      {/* --- Responsive Header/Nav --- */}
      <header className="bg-white shadow-sm w-full">
        <div className="w-full px-6 py-4 flex items-center justify-between max-w-full mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold">NC</div>
            <div>
              <h1 className="text-lg font-semibold">Nurse Connect</h1>
              <p className="text-xs text-gray-500">Connecting nurses to hospitals & homes — locally & internationally</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-3 items-center">
            <button onClick={() => setRoute('home')} className="text-sm hover:underline">Home</button>
            <button onClick={() => setRoute('nurse')} className="text-sm hover:underline">For Nurses</button>
            <button onClick={() => setRoute('employer')} className="text-sm hover:underline">For Employers</button>
            <button onClick={() => setRoute('playbooks')} className="text-sm hover:underline">Country Playbooks</button>
            <button onClick={() => setRoute('policies')} className="text-sm text-teal-600 font-medium">Compliance</button>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 border rounded">
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-2 w-full">
            <button onClick={() => { setRoute('home'); setMobileMenuOpen(false); }} className="text-sm hover:underline">Home</button>
            <button onClick={() => { setRoute('nurse'); setMobileMenuOpen(false); }} className="text-sm hover:underline">For Nurses</button>
            <button onClick={() => { setRoute('employer'); setMobileMenuOpen(false); }} className="text-sm hover:underline">For Employers</button>
            <button onClick={() => { setRoute('playbooks'); setMobileMenuOpen(false); }} className="text-sm hover:underline">Country Playbooks</button>
            <button onClick={() => { setRoute('policies'); setMobileMenuOpen(false); }} className="text-sm text-teal-600 font-medium">Compliance</button>
          </nav>
        )}
      </header>

      <main className="w-full px-6 py-10">
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

      <footer className="bg-white border-t mt-12 w-full">
        <div className="w-full px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
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
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');

  return (
    <div className="w-full">
      {/* -------- Hero Section -------- */}
      <section className="relative w-full h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1588776814546-6d10a9a2e39e?auto=format&fit=crop&w=1950&q=80"
            alt="Healthcare hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Connecting Nurses <br /> to Opportunities Worldwide
          </h1>
          <p className="mt-4 text-white text-lg md:text-xl max-w-xl">
            Licensed, vetted nurses matched to hospitals and patients across the US, UK, Canada, and Australia — fast, transparent, and secure.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button
              onClick={() => onSelect('nurse')}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium shadow hover:bg-teal-700 transition"
            >
              I’m a Nurse — Apply
            </button>
            <button
              onClick={() => onSelect('employer')}
              className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-teal-600 transition"
            >
              I’m an Employer — Hire
            </button>
          </div>

          <div className="mt-10 w-full md:w-96 bg-white rounded-lg p-6 shadow-lg">
            <h3 className="font-semibold text-gray-700 mb-4">Quick Nurse Signup</h3>
            <NurseMiniForm
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              country={country}
              setCountry={setCountry}
            />
          </div>
        </div>
      </section>

      {/* -------- Features / Stats Section -------- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Nurse Connect?</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We streamline international nurse recruitment with compliance, transparency, and speed.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-xl mb-2">Global Opportunities</h3>
              <p className="text-gray-600 text-sm">
                Match with hospitals across the US, UK, Canada, and Australia — wherever your career goals take you.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-xl mb-2">Verified Credentials</h3>
              <p className="text-gray-600 text-sm">
                All nurses are vetted and licensed. Upload your credentials and start applying in minutes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-xl mb-2">Transparent Process</h3>
              <p className="text-gray-600 text-sm">
                No hidden fees, no surprises. Every contract is clear and compliant with ethical recruitment standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------- Country Playbooks Preview -------- */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">Explore Country Pathways</h2>
        <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
          Step-by-step guides to licensing, registration, and employment for nurses in each country.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <PlaybookCard
            country="United States"
            bullets={["NCLEX & state licensure", "Nurse Licensure Compact (NLC)", "EB-3 Schedule A (immigration)"]}
          />
          <PlaybookCard
            country="United Kingdom"
            bullets={["NMC registration", "IELTS Academic / OET required", "Visa routes & employer sponsorship"]}
          />
          <PlaybookCard
            country="Canada"
            bullets={["NNAS assessment", "Provincial registration", "Language tests & bridging programs"]}
          />
          <PlaybookCard
            country="Australia"
            bullets={["AHPRA registration", "Qualification assessment", "Possible OBA route & bridging"]}
          />
        </div>
      </section>

      {/* -------- Testimonials Section -------- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Hear from Our Nurses</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm">"Nurse Connect helped me secure a position in Canada smoothly and ethically. Highly recommend!"</p>
              <p className="mt-4 font-semibold">— Jane D., RN</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm">"Transparent and efficient. I felt supported every step of the way." </p>
              <p className="mt-4 font-semibold">— Samuel K., RN</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm">"Quick verification of credentials made my international application effortless."</p>
              <p className="mt-4 font-semibold">— Amina T., RN</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------- Call to Action Section -------- */}
      <section className="py-20 bg-teal-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to take your nursing career global?</h2>
        <p className="mt-4 max-w-2xl mx-auto">Start your application or post a job for qualified nurses today.</p>
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => onSelect('nurse')}
            className="px-6 py-3 bg-white text-teal-600 rounded-lg font-medium shadow hover:bg-gray-100 transition"
          >
            Apply as Nurse
          </button>
          <button
            onClick={() => onSelect('employer')}
            className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-teal-600 transition"
          >
            Hire Nurses
          </button>
        </div>
      </section>
    </div>
  );
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
  const [profile, setProfile] = useState({ fullName: '', email: '', country: '', licenseFile: '', locations: [], shift: '' })

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)

  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-500 mb-4">← Back</button>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Nurse Application</h2>
        <p className="text-sm text-gray-600 mt-1">Create a profile, upload credentials, and get matched faster.</p>

        <Progress steps={["Profile", "Credentials", "Preferences", "Review"]} current={step} />

        {step === 1 && (
          <div className="mt-4 space-y-4">
            <label className="block text-sm">Full name</label>
            <input value={profile.fullName} onChange={(e) => setProfile({...profile, fullName: e.target.value})} className="w-full p-2 border rounded" />
            <label className="block text-sm">Email</label>
            <input value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full p-2 border rounded" />
            <label className="block text-sm">Country of qualification</label>
            <select value={profile.country} onChange={(e) => setProfile({...profile, country: e.target.value})} className="w-full p-2 border rounded">
              <option value="">Select</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-teal-600 text-white rounded" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 space-y-4">
            <label className="block text-sm">Upload license / registration (PDF/JPG)</label>
            <input type="file" onChange={(e) => setProfile({...profile, licenseFile: e.target.files[0]})} />
            <div className="flex justify-between mt-4">
              <button className="px-3 py-2 border rounded" onClick={handleBack}>Back</button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-4 space-y-4">
            <label className="block text-sm">Preferred locations</label>
            <div className="grid grid-cols-2 gap-2">
              {["United States","United Kingdom","Canada","Australia"].map(loc => (
                <label key={loc} className="flex items-center gap-2">
                  <input type="checkbox" checked={profile.locations.includes(loc)} 
                    onChange={(e) => {
                      const newLocations = e.target.checked ? [...profile.locations, loc] : profile.locations.filter(l => l!==loc);
                      setProfile({...profile, locations: newLocations});
                    }} />
                  {loc}
                </label>
              ))}
            </div>

            <label className="block text-sm">Shift preferences</label>
            <select className="w-full p-2 border rounded" value={profile.shift} onChange={(e)=>setProfile({...profile, shift: e.target.value})}>
              <option value="">Select shift</option>
              <option>Day</option>
              <option>Night</option>
              <option>Any</option>
            </select>

            <div className="flex justify-between mt-4">
              <button className="px-3 py-2 border rounded" onClick={handleBack}>Back</button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="mt-4 space-y-4">
            <h4 className="font-semibold">Review & Submit</h4>
            <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
              <div><strong>Name:</strong> {profile.fullName}</div>
              <div><strong>Email:</strong> {profile.email}</div>
              <div><strong>Country:</strong> {profile.country}</div>
              <div><strong>Locations:</strong> {profile.locations.join(", ")}</div>
              <div><strong>Shift:</strong> {profile.shift}</div>
              <div><strong>License File:</strong> {profile.licenseFile ? profile.licenseFile.name : "None"}</div>
            </div>

            <div className="flex justify-between mt-4">
              <button className="px-3 py-2 border rounded" onClick={handleBack}>Back</button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded" onClick={() => {
                setMessage('Application submitted — we will verify and match you.');
                setStep(1);
                setProfile({ fullName:'', email:'', country:'', licenseFile:'', locations:[], shift:'' });
              }}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EmployerFlow({ onBack, setMessage }) {
  const [form, setForm] = useState({ org: '', contact: '', role: '' })
  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-500 mb-4">← Back</button>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Employer Intake</h2>
        <form onSubmit={(e) => { e.preventDefault(); setMessage('Request received'); }} className="space-y-4 mt-4">
          <input value={form.org} onChange={(e) => setForm({...form, org: e.target.value})} placeholder="Organization" className="w-full p-2 border rounded" />
          <input value={form.contact} onChange={(e) => setForm({...form, contact: e.target.value})} placeholder="Contact email / phone" className="w-full p-2 border rounded" />
          <input value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} placeholder="Role & skills needed" className="w-full p-2 border rounded" />
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded">Submit request</button>
        </form>
      </div>
    </div>
  )
}

function CountryPlaybooks({ onBack }) {
  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-500 mb-4">← Back</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PlaybookCard country="United States" bullets={["NCLEX & state licensure","Nurse Licensure Compact (NLC)","EB-3 Schedule A (immigration)"]} />
        <PlaybookCard country="United Kingdom" bullets={["NMC registration","IELTS Academic / OET required","Visa routes & employer sponsorship"]} />
        <PlaybookCard country="Canada" bullets={["NNAS assessment","Provincial registration","Language tests & bridging programs"]} />
        <PlaybookCard country="Australia" bullets={["AHPRA registration","Qualification assessment","Possible OBA route & bridging"]} />
      </div>
    </div>
  )
}

function PlaybookCard({ country, bullets }) {
  return (
    <div className="bg-white p-5 rounded shadow">
      <h4 className="font-semibold">{country}</h4>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        {bullets.map(b => <li key={b}>{b}</li>)}
      </ul>
      <button className="mt-4 px-3 py-2 bg-teal-600 text-white rounded">Start pathway</button>
    </div>
  )
}

function Policies({ onBack }) {
  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-500 mb-4">← Back</button>
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="font-semibold">Compliance & Policies</h3>
        <section>
          <h4 className="font-medium">Privacy & Data</h4>
          <p className="text-sm text-gray-600">Secure storage with encryption and access logging.</p>
        </section>
        <section>
          <h4 className="font-medium">Ethical Recruitment</h4>
          <p className="text-sm text-gray-600">Follow WHO Global Code — no recruitment fees, transparent contracts.</p>
        </section>
        <section>
          <h4 className="font-medium">Employer Compliance</h4>
          <p className="text-sm text-gray-600">EEO language, BAA, and trust signals for hiring.</p>
        </section>
      </div>
    </div>
  )
}

function Progress({ steps, current }) {
  return (
    <div className="flex items-center gap-3 my-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i+1 <= current ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{i+1}</div>
          <div className={`text-sm ${i+1 <= current ? 'text-gray-800' : 'text-gray-400'}`}>{s}</div>
        </div>
      ))}
    </div>
  )
}
