import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import PageContainer from './components/layout/PageContainer'
import StatCard from './components/dashboard/StatCard'
import EventChart from './components/dashboard/EventChart'
import IncidentChart from './components/dashboard/IncidentChart'
import IntegrityCard from './components/dashboard/IntegrityCard'
import Button from './components/common/Button'
import Badge from './components/common/Badge'
import { evidenceData } from './mock/evidence'
import { logData } from './mock/logs'
import { videoEvents } from './mock/videoEvents'
import { incidentsData } from './mock/incidents'
import { timelineData } from './mock/timeline'
import { integrityData } from './mock/integrity'
import { Camera, FileSearch, ShieldCheck } from 'lucide-react'

const videoEventDistribution = Object.entries(
  videoEvents.reduce((acc, event) => {
    const name = event.event_type || 'Unknown'
    acc[name] = (acc[name] || 0) + 1
    return acc
  }, {})
).map(([name, value]) => ({ name, value }))

const incidentChartData = incidentsData.length > 0 ? [{ name: 'Incidents', value: incidentsData.length }] : []

function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ username: 'investigator@arjuna', password: 'password123' })

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      if (!form.username || !form.password) {
        setError('Please enter both username and password.')
        setLoading(false)
        return
      }
      localStorage.setItem('arjuna_token', 'demo-token')
      window.location.href = '/'
    }, 900)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-soft lg:flex">
        <div className="flex-1 bg-slate-950 p-10">
          <div className="mb-6 inline-block rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-sky-300">
            ARJUNA
          </div>
          <h1 className="text-4xl font-semibold text-slate-100">Digital Forensic Investigation Platform</h1>
          <p className="mt-4 max-w-md text-slate-400">
            Securely investigate CCTV, DVR/NVR evidence, logs, and correlation events through a unified forensic workflow.
          </p>

          <div className="mt-10 space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Investigation Flow</div>
              <div className="mt-4 text-sm text-slate-300">Evidence → Logs → AI Events → Correlation → Integrity → Timeline → Incident → Result</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="rounded-lg border border-slate-800 bg-slate-900 p-3"><span className="text-sky-300">—</span> Active cases</div>
              <div className="rounded-lg border border-slate-800 bg-slate-900 p-3"><span className="text-emerald-300">Pending</span> Integrity status</div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center p-8">
          <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-950/50 p-6">
            <div className="mb-6">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Investigator Login</div>
              <h2 className="mt-2 text-2xl font-semibold text-slate-100">Access ARJUNA</h2>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>
            )}

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-300">Username / Email</label>
                <input
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-100 outline-none placeholder:text-slate-500"
                  placeholder="investigator@arjuna"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-300">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-100 outline-none placeholder:text-slate-500"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
                <a href="#" className="text-sky-300">Forgot password?</a>
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Login'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function DashboardPage() {
  const totalEvidence = evidenceData.length
  const totalLogs = logData.length
  const totalVideoEvents = videoEvents.length
  const totalIncidents = incidentsData.length

  return (
    <PageContainer title="Dashboard" subtitle="Mock demo data for development — API-driven values will replace this">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Evidence" value={String(totalEvidence)} detail="Number of Student 1 evidence records" tone="info" />
        <StatCard label="Total Log Files" value={String(totalLogs)} detail="Number of Student 2 normalized log records" tone="default" />
        <StatCard label="Video Events" value={String(totalVideoEvents)} detail="Number of Student 3 video event records" tone="warning" />
        <StatCard label="Correlated Incidents" value={String(totalIncidents)} detail="Number of Student 4 incidents" tone="default" />
        <StatCard label="Critical Incidents" value="—" detail="Pending backend severity field" tone="danger" />
        <StatCard label="Verified Evidence" value="Pending" detail="Backend integrity status is not yet defined in the frozen contract" tone="success" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <EventChart data={videoEventDistribution} title="Event type distribution" />
        <IncidentChart data={incidentChartData} title="Incident data status" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <IntegrityCard title="Evidence Integrity" value="Pending" tone="warning" />
        <IntegrityCard title="Verification Status" value="Pending" tone="warning" />
        <IntegrityCard title="Correlation Confidence" value="Pending" tone="warning" />
      </div>
    </PageContainer>
  )
}

function EvidenceUploadPage() {
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleUpload = () => {
    setUploading(true)
    setTimeout(() => {
      setUploading(false)
      setUploadSuccess(true)
    }, 1400)
  }

  return (
    <PageContainer title="Evidence Upload" subtitle="Upload CCTV, DVR or NVR evidence">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6">
        <div className="rounded-xl border border-dashed border-sky-500/40 bg-slate-900/60 p-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/10 text-sky-300">
            <Camera size={28} />
          </div>
          <div className="text-xl font-medium text-slate-100">Drop CCTV / DVR / NVR evidence here</div>
          <p className="mt-2 text-slate-400">Drag and drop files or browse from local storage.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="primary" onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Browse Files'}
            </Button>
            {uploadSuccess && <Badge tone="success">Upload complete</Badge>}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {evidenceData.slice(0, 3).map((item) => (
            <div key={item.evidence_id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium text-white">{item.evidence_id}</div>
                <Badge tone="default">Pending</Badge>
              </div>
              <div className="mt-3 text-sm text-slate-300">{item.filename}</div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-400">
                <div>Size: {Math.round(item.file_size / 1024 / 1024)} MB</div>
                <div>Format: {item.file_format}</div>
                <div>Duration: {item.duration}s</div>
                <div>Created: {new Date(item.creation_time).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}

function EvidenceRepositoryPage() {
  return (
    <PageContainer title="Evidence Repository" subtitle="Search, filter and inspect forensic assets">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none" placeholder="Search evidence..." />
          <div className="flex gap-2">
            <Button variant="secondary">Filter</Button>
            <Button variant="primary">Export</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="p-3">Evidence ID</th>
                <th className="p-3">Filename</th>
                <th className="p-3">Type</th>
                <th className="p-3">Format</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Integrity</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {evidenceData.map((item) => (
                <tr key={item.evidence_id} className="border-t border-slate-800 text-slate-300">
                  <td className="p-3">{item.evidence_id}</td>
                  <td className="p-3">{item.filename}</td>
                  <td className="p-3">CCTV</td>
                  <td className="p-3">{item.file_format}</td>
                  <td className="p-3">{item.duration}s</td>
                  <td className="p-3"><Badge tone="default">Pending</Badge></td>
                  <td className="p-3 space-x-2">
                    <button type="button" className="text-sky-300">View</button>
                    <button type="button" className="text-sky-300">Analyze</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  )
}

function AnalysisWorkspacePage() {
  const sampleEvidence = evidenceData[0]

  return (
    <PageContainer title="Analysis Workspace" subtitle="Forensic review and AI event inspection">
      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">CCTV Evidence</div>
              <div className="text-xl font-semibold text-slate-100">{sampleEvidence.filename}</div>
            </div>
            <Badge tone="success">Integrity verified</Badge>
          </div>

          <div className="flex aspect-video items-center justify-center rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-center">
            <div>
              <div className="text-4xl text-sky-300">◉</div>
              <div className="mt-3 text-slate-300">Video playback preview</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
            <span>00:00:00</span>
            <div className="mx-4 h-2 flex-1 rounded-full bg-slate-700">
              <div className="h-full w-1/4 rounded-full bg-sky-400" />
            </div>
            <span>00:13:44</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Evidence Information</div>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div><span className="text-slate-500">Evidence ID:</span> {sampleEvidence.evidence_id}</div>
              <div><span className="text-slate-500">Filename:</span> {sampleEvidence.filename}</div>
              <div><span className="text-slate-500">Format:</span> {sampleEvidence.file_format}</div>
              <div><span className="text-slate-500">Duration:</span> {sampleEvidence.duration}s</div>
              <div><span className="text-slate-500">Creation:</span> {new Date(sampleEvidence.creation_time).toLocaleString()}</div>
              <div><span className="text-slate-500">Modification:</span> {new Date(sampleEvidence.modification_time).toLocaleString()}</div>
              <div><span className="text-slate-500">Integrity:</span> Pending</div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">AI Event Panel</div>
            <div className="mt-4 space-y-3">
              {videoEvents.slice(0, 4).map((event) => (
                <button type="button" key={`${event.evidence_id}-${event.timestamp}`} className="block w-full rounded-lg border border-slate-800 bg-slate-900/80 p-3 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-slate-100">{event.event_type}</div>
                    <Badge tone="warning">{event.detected_object}</Badge>
                  </div>
                  <div className="mt-2 text-xs text-slate-400">{event.timestamp} · {event.frame_number} frames</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

function LogsPage() {
  return (
    <PageContainer title="Normalized Log Viewer" subtitle="Source-normalized forensic events">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none" placeholder="Search logs..." />
          <div className="flex gap-2">
            <Button variant="secondary">Timestamp Filter</Button>
            <Button variant="primary">Apply</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="p-3">Source</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Event Type</th>
                <th className="p-3">User</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Device</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {logData.map((log, index) => (
                <tr key={`${log.timestamp}-${index}`} className="border-t border-slate-800 text-slate-300">
                  <td className="p-3">{log.source}</td>
                  <td className="p-3">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-3">{log.event_type}</td>
                  <td className="p-3">{log.user}</td>
                  <td className="p-3">{log.ip_address}</td>
                  <td className="p-3">{log.device}</td>
                  <td className="p-3">{log.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  )
}

function TimelinePage() {
  return (
    <PageContainer title="Unified Forensic Timeline" subtitle="Cross-source event correlation">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
        <div className="space-y-5">
          {timelineData.map((event, index) => (
            <div key={`${event.timestamp}-${index}`} className="relative pl-8">
              <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-sky-400" />
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-lg font-semibold text-slate-100">{new Date(event.timestamp).toLocaleTimeString()}</div>
                  <Badge tone={event.severity === 'Critical' ? 'danger' : event.severity === 'High' ? 'warning' : 'default'}>{event.severity || 'Pending'}</Badge>
                </div>
                <div className="mt-3 text-sm text-slate-300">{event.source} · {event.event_type}</div>
                <div className="mt-3 grid gap-2 text-xs text-slate-400 md:grid-cols-3">
                  <div>User: {event.user}</div>
                  <div>IP: {event.ip_address}</div>
                  <div>Device: {event.device}</div>
                </div>
                <div className="mt-3 text-sm text-slate-300">{event.correlation_information}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}

function IncidentsPage() {
  return (
    <PageContainer title="Incident Details" subtitle="Correlated investigation views">
      <div className="space-y-4">
        {incidentsData.map((incident) => (
          <div key={incident.incident_id} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Incident ID</div>
                <div className="text-xl font-semibold text-slate-100">{incident.incident_id}</div>
              </div>
              <Badge tone="default">Pending</Badge>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-4 text-sm text-slate-300">
              <div>Investigation ID: {incident.investigation_id}</div>
              <div>Evidence ID: {incident.evidence_id}</div>
              <div>Status: Pending</div>
              <div>Correlation: {incident.correlation_information?.score ?? '—'}</div>
            </div>

            <div className="mt-5">
              <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">Related Events</div>
              <ul className="space-y-2 text-sm text-slate-300">
                {incident.events.map((event, index) => (
                  <li key={`${incident.incident_id}-${index}`} className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                    {event.source} · {event.event_type} · {event.timestamp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  )
}

function IntegrityPage() {
  return (
    <PageContainer title="Evidence Integrity" subtitle="Verification and hash status">
      <div className="grid gap-4 lg:grid-cols-3">
        {integrityData.map((item) => (
          <div key={item.evidence_id} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="text-lg font-semibold text-slate-100">{item.evidence_id}</div>
              <Badge tone="default">Pending</Badge>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <div>Hash algorithm: {item.hash_algorithm || '—'}</div>
              <div className="break-all">Hash value: {item.hash_value || '—'}</div>
              <div>Verification result: Pending</div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  )
}

function ResultsPage() {
  return (
    <PageContainer title="Investigation Results" subtitle="Final forensic summary">
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Investigation Summary</div>
            <div className="mt-3 grid gap-3 md:grid-cols-2 text-sm text-slate-300">
              <div>Investigation ID: INV-4401</div>
              <div>Evidence count: {evidenceData.length}</div>
              <div>Log count: {logData.length}</div>
              <div>Video event count: {videoEvents.length}</div>
              <div>Correlated incident count: {incidentsData.length}</div>
              <div>Critical incidents: —</div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
            <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">Important Events</div>
            <ul className="space-y-3 text-sm text-slate-300">
              {timelineData.map((event) => (
                <li key={event.timestamp} className="rounded-lg border border-slate-800 bg-slate-900 p-3">{new Date(event.timestamp).toLocaleString()} · {event.source} · {event.event_type}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
            <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">Evidence Summary</div>
            <div className="space-y-2 text-sm text-slate-300">
              {evidenceData.map((item) => (
                <div key={item.evidence_id} className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                  {item.evidence_id} · {item.filename}
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full">Generate Forensic Report</Button>
        </div>
      </div>
    </PageContainer>
  )
}

function ReportsPage() {
  return (
    <PageContainer title="Reports" subtitle="Investigation reporting and export queue">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center gap-2 text-slate-100"><FileSearch size={18} /><span>Case Summary</span></div>
          <p className="mt-4 text-sm text-slate-400">Prepared report summary with evidence integrity, timeline events, and forensic recommendations.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center gap-2 text-slate-100"><ShieldCheck size={18} /><span>Integrity Report</span></div>
          <p className="mt-4 text-sm text-slate-400">Hash verification status for all archived forensic evidence and chain-of-custody checkpoints.</p>
        </div>
      </div>
    </PageContainer>
  )
}

function SettingsPage() {
  return (
    <PageContainer title="Settings" subtitle="Investigation environment configuration">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6">
        <div className="space-y-4 text-sm text-slate-300">
          <div>Default investigation ID: INV-4401</div>
          <div>API base: {import.meta.env.VITE_API_BASE_URL || '/api'}</div>
          <div>JWT ready: Yes</div>
        </div>
      </div>
    </PageContainer>
  )
}

function AppShell() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/evidence" element={<EvidenceRepositoryPage />} />
          <Route path="/upload" element={<EvidenceUploadPage />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route path="/video" element={<AnalysisWorkspacePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/incidents" element={<IncidentsPage />} />
          <Route path="/integrity" element={<IntegrityPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  const isAuthenticated = !!localStorage.getItem('arjuna_token')

  return (
    <BrowserRouter>
      {isAuthenticated ? <AppShell /> : <LoginPage />}
    </BrowserRouter>
  )
}
