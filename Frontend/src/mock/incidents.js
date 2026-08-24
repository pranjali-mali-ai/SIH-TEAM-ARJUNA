export const incidentsData = [
  {
    incident_id: 'INC-901',
    investigation_id: 'INV-4401',
    events: [
      {
        source: 'CCTV',
        timestamp: '2026-08-17T21:42:15Z',
        event_type: 'Person Detected',
        user: 'Unidentified',
        ip_address: 'N/A',
        device: 'CAM-01',
        description: 'Individual observed near gate.'
      },
      {
        source: 'Firewall',
        timestamp: '2026-08-17T21:42:15Z',
        event_type: 'Connection Attempt',
        user: 'admin',
        ip_address: '10.40.15.7',
        device: 'FW-01',
        description: 'Connection attempt to external endpoint.'
      }
    ],
    correlation_information: {
      score: 0.92,
      reason: 'Person detected near main gate shortly before suspicious outbound connection.'
    },
    evidence_id: 'EVD-2041',
    hash_algorithm: 'SHA-256',
    hash_value: 'c3f2b4f4b8e4d3b7f4e5c2d5a9d10e2f9f0c5eaef8dcbbd54e9b6f741ba2f6a'
  },
  {
    incident_id: 'INC-902',
    investigation_id: 'INV-4401',
    events: [
      {
        source: 'Access Control',
        timestamp: '2026-08-17T21:42:24Z',
        event_type: 'Door Access',
        user: 'security_01',
        ip_address: '10.40.12.12',
        device: 'Door-02',
        description: 'Access outside assigned window.'
      }
    ],
    correlation_information: {
      score: 0.81,
      reason: 'Door access mismatch correlates with failed security checks.'
    },
    evidence_id: 'EVD-2042',
    hash_algorithm: 'SHA-256',
    hash_value: '93c8d0d0e5b2f3ecaa8ad8950d0f39e5c6a823b4c9d630ffe4ec2a9f82d9d1c3'
  }
]
