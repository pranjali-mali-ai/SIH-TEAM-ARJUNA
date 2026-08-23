export const logData = [
  {
    source: 'Firewall',
    timestamp: '2026-08-17T21:42:15Z',
    event_type: 'Connection Attempt',
    user: 'admin',
    ip_address: '10.40.15.7',
    device: 'FW-01',
    description: 'Suspicious connection attempt to external host.'
  },
  {
    source: 'System Log',
    timestamp: '2026-08-17T21:42:20Z',
    event_type: 'Unauthorized Login',
    user: 'guest',
    ip_address: '192.168.10.44',
    device: 'Server-03',
    description: 'User login failed after multiple password attempts.'
  },
  {
    source: 'Access Control',
    timestamp: '2026-08-17T21:42:24Z',
    event_type: 'Door Access',
    user: 'security_01',
    ip_address: '10.40.12.12',
    device: 'Door-02',
    description: 'Access granted outside assigned shift window.'
  },
  {
    source: 'Endpoint',
    timestamp: '2026-08-17T21:42:52Z',
    event_type: 'Privilege Escalation',
    user: 'svc-ops',
    ip_address: '10.40.24.86',
    device: 'Workstation-19',
    description: 'Elevation request triggered from unauthorized service context.'
  }
]
