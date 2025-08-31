import React, { useState, useEffect } from 'react';
import heroImg from '../hero.png'; // <-- updated import
// Removed duplicate imports of NurseFlow / EmployerFlow if you keep them in this file
// other imports...

// ------------------------
// Custom Hook
// ------------------------
export function useValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validators = {
    fullName: v => v.trim() ? '' : 'Required',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Invalid email',
    country: v => v ? '' : 'Required',
    org: v => v.trim() ? '' : 'Required',
    contact: v => v.trim() ? '' : 'Required',
    role: v => v.trim() ? '' : 'Required',
  };

  useEffect(() => {
    const newErrors = {};
    for (const field in values) {
      if (validators[field]) newErrors[field] = validators[field](values[field]);
    }
    setErrors(newErrors);
  }, [values]);

  const handleChange = (field, value) => {
    setValues({ ...values, [field]: value });
    setTouched({ ...touched, [field]: true });
  };

  const isValid = Object.values(errors).every(e => e === '');

  return { values, errors, touched, handleChange, isValid, setValues };
}

// ------------------------
// App Component
// ------------------------
function App() {
  const [route, setRoute] = useState('home');
  const [message, setMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      {/* --- Responsive Header/Nav --- */}
      <header className="bg-white shadow-sm w-full sticky top-0 z-50">
        <div className="w-full px-6 py-4 flex items-center justify-between max-w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold shadow">NC</div>
            <div>
              <h1 className="text-lg font-semibold">Nurse Connect</h1>
              <p className="text-xs text-gray-500">Connecting nurses to hospitals & homes — locally & internationally</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-5 items-center">
            <button onClick={() => setRoute('home')} className="text-sm hover:text-teal-600 transition">Home</button>
            <button onClick={() => setRoute('nurse')} className="text-sm hover:text-teal-600 transition">For Nurses</button>
            <button onClick={() => setRoute('employer')} className="text-sm hover:text-teal-600 transition">For Employers</button>
            <button onClick={() => setRoute('playbooks')} className="text-sm hover:text-teal-600 transition">Country Playbooks</button>
            <button onClick={() => setRoute('policies')} className="text-sm text-teal-600 font-medium hover:underline">Compliance</button>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button 
              aria-label="Toggle mobile menu" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-3 w-full shadow-md animate-fadeIn">
            <button onClick={() => { setRoute('home'); setMobileMenuOpen(false); }} className="text-sm hover:text-teal-600">Home</button>
            <button onClick={() => { setRoute('nurse'); setMobileMenuOpen(false); }} className="text-sm hover:text-teal-600">For Nurses</button>
            <button onClick={() => { setRoute('employer'); setMobileMenuOpen(false); }} className="text-sm hover:text-teal-600">For Employers</button>
            <button onClick={() => { setRoute('playbooks'); setMobileMenuOpen(false); }} className="text-sm hover:text-teal-600">Country Playbooks</button>
            <button onClick={() => { setRoute('policies'); setMobileMenuOpen(false); }} className="text-sm text-teal-600 font-medium hover:underline">Compliance</button>
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
          <div className="mt-6 p-4 rounded border-l-4 border-teal-500 bg-teal-50 text-teal-800 animate-fadeIn">
            {message}
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-12 w-full">
        <div className="w-full px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold">Nurse Connect</h3>
            <p className="text-sm text-gray-700">Ethical international recruitment. Transparent contracts. Secure credentialing.</p>
          </div>
          <div>
            <h4 className="font-medium">Quick links</h4>
            <ul className="text-sm text-gray-700 mt-2 space-y-1">
              <li><button onClick={() => setRoute('nurse')} className="hover:text-teal-600">For Nurses</button></li>
              <li><button onClick={() => setRoute('employer')} className="hover:text-teal-600">For Employers</button></li>
              <li><button onClick={() => setRoute('playbooks')} className="hover:text-teal-600">Country Playbooks</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Contact</h4>
            <p className="text-sm text-gray-700 mt-2">hello@nurseconnect.example</p>
            <p className="text-sm text-gray-700">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 py-4">© {new Date().getFullYear()} Nurse Connect — All rights reserved</div>
      </footer>
    </div>
  )
}

export default App;

// ---------------- Supporting Components ----------------


// ---------------- Supporting Components ----------------

function Home({ onSelect }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');

  return (
    <div className="w-full">
      {/* -------- Hero Section -------- */}
    {/* -------- Hero Section with Curved Bottom -------- */}
<section className="relative w-full h-screen">
  <div className="absolute inset-0">
    <img
      src={heroImg}
      alt="Healthcare hero"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50"></div>
  </div>

  <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-6xl mx-auto px-6 animate-fadeIn">
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-snug drop-shadow-lg">
      Connecting Nurses <br /> to Opportunities Worldwide
    </h1>
    <p className="mt-4 text-white text-base sm:text-lg md:text-xl max-w-xl drop-shadow-md">
      Licensed, vetted nurses matched to hospitals and patients across the US, UK, Canada, and Australia — fast, transparent, and secure.
    </p>
    <div className="mt-6 flex flex-col md:flex-row gap-4">
      <button
        onClick={() => onSelect('nurse')}
        className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium shadow-lg hover:bg-teal-700 transition transform hover:scale-105"
      >
        I’m a Nurse — Apply
      </button>
      <button
        onClick={() => onSelect('employer')}
        className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-teal-600 transition transform hover:scale-105"
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

  {/* SVG Curve at bottom */}
  

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


function NurseMiniForm({ onSubmit }) {
  const { values, errors, touched, handleChange, isValid } = useValidation({
    fullName: '',
    email: '',
    country: ''
  });

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => { e.preventDefault(); if (isValid) onSubmit(values); }}
    >
      {['fullName','email','country'].map(field => (
        <div key={field} className="relative">
          {field !== 'country' ? (
            <input
              type={field==='email' ? 'email' : 'text'}
              value={values[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={field==='fullName' ? 'Full Name' : 'Email'}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition
                ${touched[field] && errors[field] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'}`}
            />
          ) : (
            <select
              value={values[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition
                ${touched[field] && errors[field] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'}`}
            >
              <option value="">Select country</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
          )}

          {touched[field] && (
            <span className="absolute right-3 top-3 text-lg">{errors[field] ? '❌' : '✅'}</span>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full px-4 py-3 rounded-md font-medium transition transform hover:scale-105
          ${isValid ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        Start Application
      </button>
    </form>
  );
}


function NurseFlow({ onBack, setMessage }) {
  const steps = ["Profile", "Credentials", "Preferences", "Review"];
  const [step, setStep] = useState(1);

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "",
    locations: [],
    shift: "",
    licenseFile: null,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Password strength check
  const getPasswordStrength = (password) => {
    if (!password) return "";
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/\d/) && password.length >= 8) return "Strong";
    return "Medium";
  };

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "fullName":
        if (!value.trim()) error = "Full Name is required";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "country":
        if (!value) error = "Country is required";
        break;
      case "licenseFile":
        if (!value) error = "License file is required";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (field, value) => {
    setValues({ ...values, [field]: value });
    setTouched({ ...touched, [field]: true });
    setErrors({ ...errors, [field]: validateField(field, value) });
  };

  const isValid =
    Object.values(errors).every((e) => !e) &&
    ["fullName", "email", "password", "country"].every((f) => values[f]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleFileChange = (e) => handleChange("licenseFile", e.target.files[0]);

  return (
    <div>
      {onBack && <button onClick={onBack} className="text-sm text-gray-500 mb-4">← Back</button>}
      <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
        <h2 className="text-xl font-semibold">Nurse Application</h2>
        <p className="text-sm text-gray-600 mt-1">Create a profile, upload credentials, and get matched faster.</p>

        {/* Progress */}
        <div className="flex justify-between mt-4 mb-6">
          {steps.map((s, i) => (
            <div key={s} className={`flex-1 text-center ${step === i+1 ? "font-bold" : "text-gray-400"}`}>{s}</div>
          ))}
        </div>

        {/* Step 1: Profile */}
        {step === 1 && (
          <div className="space-y-4">
            {["fullName","email","password","country"].map((field) => (
              <div key={field} className="relative">
                {field !== "country" ? (
                  <input
                    type={field==="password" ? "password" : (field==="email" ? "email" : "text")}
                    value={values[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={field==="fullName" ? "Full Name" : field==="email" ? "Email" : "Password"}
                    className={`w-full p-2 border rounded focus:outline-none focus:ring-2 transition
                      ${touched[field] && errors[field] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}`}
                  />
                ) : (
                  <select
                    value={values.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className={`w-full p-2 border rounded focus:outline-none focus:ring-2 transition
                      ${touched.country && errors.country ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}`}
                  >
                    <option value="">Select Country</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                )}
                {touched[field] && <span className="absolute right-3 top-2 text-lg">{errors[field] ? "❌" : "✅"}</span>}
                {field==="password" && values.password && (
                  <p className="text-xs mt-1">Strength: <strong>{getPasswordStrength(values.password)}</strong></p>
                )}
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button
                disabled={!isValid}
                onClick={handleNext}
                className={`px-4 py-2 rounded font-medium ${isValid ? "bg-teal-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >Next</button>
            </div>
          </div>
        )}

        {/* Step 2: Credentials */}
        {step === 2 && (
          <div className="space-y-4">
            <label className="block text-sm">Upload license / registration (PDF/JPG)</label>
            <input type="file" onChange={handleFileChange} className="w-full" />
            {touched.licenseFile && errors.licenseFile && <p className="text-red-500 text-sm">{errors.licenseFile}</p>}
            <div className="flex justify-between mt-4">
              <button className="px-3 py-2 border rounded" onClick={handleBack}>Back</button>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded"
                onClick={handleNext}
              >Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <div className="space-y-4">
            <label className="block text-sm">Preferred locations</label>
            <div className="grid grid-cols-2 gap-2">
              {["United States","United Kingdom","Canada","Australia"].map((loc) => (
                <label key={loc} className="flex items-center gap-2">
                  <input type="checkbox" checked={values.locations.includes(loc)}
                    onChange={(e) => {
                      const newLocations = e.target.checked
                        ? [...values.locations, loc]
                        : values.locations.filter((l) => l !== loc);
                      handleChange("locations", newLocations);
                    }}
                  />
                  {loc}
                </label>
              ))}
            </div>

            <label className="block text-sm">Shift preferences</label>
            <select
              value={values.shift}
              onChange={(e) => handleChange("shift", e.target.value)}
              className="w-full p-2 border rounded"
            >
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

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-4">
            <h4 className="font-semibold">Review & Submit</h4>
            <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
              <div><strong>Name:</strong> {values.fullName}</div>
              <div><strong>Email:</strong> {values.email}</div>
              <div><strong>Country:</strong> {values.country}</div>
              <div><strong>Locations:</strong> {values.locations.join(", ")}</div>
              <div><strong>Shift:</strong> {values.shift}</div>
              <div><strong>License File:</strong> {values.licenseFile ? values.licenseFile.name : "None"}</div>
            </div>
            <div className="flex justify-between mt-4">
              <button className="px-3 py-2 border rounded" onClick={handleBack}>Back</button>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded"
                onClick={() => {
                  setMessage("Application submitted — we will verify and match you.");
                  setStep(1);
                  setValues({
                    fullName: "",
                    email: "",
                    password: "",
                    country: "",
                    locations: [],
                    shift: "",
                    licenseFile: null,
                  });
                  setErrors({});
                  setTouched({});
                }}
              >Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}





function EmployerFlow({ onBack, setMessage }) {
  const steps = ["Profile", "Positions", "Review"];
  const [step, setStep] = useState(1);

  const [values, setValues] = useState({
    org: "",
    contact: "",
    password: "",
    country: "",
    roles: "",
    locations: [],
    shift: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const getPasswordStrength = (password) => {
    if (!password) return "";
    if (password.length < 6) return "Weak";
    if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)) return "Strong";
    return "Medium";
  };

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "org": if (!value.trim()) error="Organization required"; break;
      case "contact": 
        if (!value.trim()) error="Contact required";
        else if (!/^\S+@\S+\.\S+$/.test(value)) error="Invalid email"; 
        break;
      case "password":
        if (!value) error="Password required";
        else if (value.length < 6) error="Password too short"; 
        break;
      case "country": if (!value) error="Country required"; break;
      case "roles": if (!value.trim()) error="Roles required"; break;
      default: break;
    }
    return error;
  };

  const handleChange = (field, value) => {
    setValues({ ...values, [field]: value });
    setTouched({ ...touched, [field]: true });
    setErrors({ ...errors, [field]: validateField(field, value) });
  };

  const isValid = Object.values(errors).every(e=>!e) &&
                  ["org","contact","password","country","roles"].every(f=>values[f]);

  const handleNext = () => setStep(step+1);
  const handleBack = () => setStep(step-1);

  return (
    <div>
      {onBack && <button onClick={onBack} className="text-sm text-gray-500 mb-4">← Back</button>}
      <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
        <h2 className="text-xl font-semibold">Employer Application</h2>
        <p className="text-sm text-gray-600 mt-1">Post job openings and connect with qualified nurses.</p>

        {/* Progress */}
        <div className="flex justify-between mt-4 mb-6">
          {steps.map((s,i)=><div key={s} className={`flex-1 text-center ${step===i+1?"font-bold":"text-gray-400"}`}>{s}</div>)}
        </div>

        {/* Step 1: Profile */}
        {step===1 && (
          <div className="space-y-4">
            {["org","contact","password","country"].map(field=>(
              <div key={field} className="relative">
                {field!=="country" ? (
                  <input
                    type={field==="password"?"password":(field==="contact"?"email":"text")}
                    value={values[field]}
                    onChange={e=>handleChange(field,e.target.value)}
                    placeholder={field==="org"?"Organization":field==="contact"?"Email":"Password"}
                    className={`w-full p-2 border rounded focus:outline-none focus:ring-2 transition
                      ${touched[field] && errors[field]?"border-red-500 focus:ring-red-500":"border-gray-300 focus:ring-teal-500"}`}
                  />
                ) : (
                  <select value={values.country} onChange={e=>handleChange("country",e.target.value)}
                    className={`w-full p-2 border rounded focus:outline-none focus:ring-2 transition
                      ${touched.country && errors.country?"border-red-500 focus:ring-red-500":"border-gray-300 focus:ring-teal-500"}`}
                  >
                    <option value="">Select Country</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                )}
                {touched[field] && <span className="absolute right-3 top-2 text-lg">{errors[field]?"❌":"✅"}</span>}
                {field==="password" && values.password && (
                  <p className="text-xs mt-1">Strength: <strong>{getPasswordStrength(values.password)}</strong></p>
                )}
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button disabled={!isValid} onClick={handleNext}
                className={`px-4 py-2 rounded font-medium ${isValid?"bg-teal-600 text-white":"bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >Next</button>
            </div>
          </div>
        )}

        {/* Step 2: Positions */}
        {step===2 && (
          <div className="space-y-4">
            <label className="block text-sm">Role / Skills Needed</label>
            <input type="text" value={values.roles} onChange={e=>handleChange("roles",e.target.value)}
              className="w-full p-2 border rounded" placeholder="e.g., RN, LPN, ICU Nurse" />
            
            <label className="block text-sm">Preferred Locations</label>
            <div className="grid grid-cols-2 gap-2">
              {["United States","United Kingdom","Canada","Australia"].map(loc=>(
                <label key={loc} className="flex items-center gap-2">
                  <input type="checkbox" checked={values.locations.includes(loc)}
                    onChange={e=>{
                      const newLocs = e.target.checked ? [...values.locations,loc] : values.locations.filter(l=>l!==loc);
                      handleChange("locations",newLocs);
                    }}
                  />
                  {loc}
                </label>
              ))}
            </div>

            <label className="block text-sm">Shift Preference</label>
            <select value={values.shift} onChange={e=>handleChange("shift",e.target.value)} className="w-full p-2 border rounded">
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

        {/* Step 3: Review */}
        {step===3 && (
          <div className="space-y-4">
            <h4 className="font-semibold">Review & Submit</h4>
            <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
              <div><strong>Organization:</strong> {values.org}</div>
              <div><strong>Contact:</strong> {values.contact}</div>
              <div><strong>Country:</strong> {values.country}</div>
              <div><strong>Password:</strong> {values.password ? "********" : "None"}</div>
              <div><strong>Roles:</strong> {values.roles}</div>
              <div><strong>Locations:</strong> {values.locations.join(", ")}</div>
              <div><strong>Shift:</strong> {values.shift}</div>
            </div>
            <div className="flex justify-between mt-4">
              <button className="px-3 py-2 border rounded" onClick={handleBack}>Back</button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded"
                onClick={()=>{
                  setMessage("Employer request submitted successfully.");
                  setStep(1);
                  setValues({org:"",contact:"",password:"",country:"",roles:"",locations:[],shift:""});
                  setErrors({});
                  setTouched({});
                }}
              >Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
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
