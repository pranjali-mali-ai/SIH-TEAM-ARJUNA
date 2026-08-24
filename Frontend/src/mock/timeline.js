export const timelineData = [
  {
    timestamp: '2026-08-17T21:42:15Z',
    source: 'CCTV',
    event_type: 'Person Detected',
    user: 'Unidentified',
    ip_address: 'N/A',
    device: 'CAM-01',
    related_evidence: 'EVD-2041',
    correlation_information: 'Person detected outside gate before abnormal network traffic.'
  },
  {
    timestamp: '2026-08-17T21:42:17Z',
    source: 'Firewall',
    event_type: 'Connection Attempt',
    user: 'admin',
    ip_address: '10.40.15.7',
    device: 'FW-01',
    related_evidence: 'EVD-2041',
    correlation_information: 'Outbound connection to external host observed within 2 seconds.'
  },
  {
    timestamp: '2026-08-17T21:42:20Z',
    source: 'System Log',
    event_type: 'Unauthorized Login',
    user: 'guest',
    ip_address: '192.168.10.44',
    device: 'Server-03',
    related_evidence: 'EVD-2043',
    correlation_information: 'Failed login spike matches access irregularity.'
  }
]
