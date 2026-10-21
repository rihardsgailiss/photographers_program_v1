/* Demo data for the Photographer program dashboard. DAY_ONE is what a photographer sees right
   after ordering the camera. POPULATED mirrors the design reference (month 6, behind target)
   and can be swapped in for demos. */

export const DAY_ONE = {
  agents: [],
  cameraStatus: 'Gen5 · Ordered, shipping',
  cameraSerial: null,
}

export const POPULATED = {
  cameraStatus: 'Gen5 · SN 5G-0421-8873',
  agents: [
    { name: 'Agent name 1', email: 'agent1@agency.com', agency: 'Agency A', status: 'active', subscribed: '2026-10-08', cancelled: null },
    { name: 'Agent name 2', email: 'agent2@agency.com', agency: 'Agency B', status: 'suspended', subscribed: '2026-10-06', cancelled: null },
    { name: 'Agent name 3', email: 'agent3@agency.com', agency: 'Agency B', status: 'active', subscribed: '2026-09-02', cancelled: null },
    { name: 'Agent name 4', email: 'agent4@agency.com', agency: 'Agency C', status: 'suspended', subscribed: '2026-08-19', cancelled: null },
    { name: 'Agent name 5', email: 'agent5@agency.com', agency: 'Agency A', status: 'active', subscribed: '2026-07-04', cancelled: null },
    { name: 'Agent name 6', email: 'agent6@agency.com', agency: 'Agency D', status: 'cancelled', subscribed: '2026-06-12', cancelled: '2026-09-28' },
    { name: 'Agent name 7', email: 'agent7@agency.com', agency: 'Agency C', status: 'active', subscribed: '2026-05-20', cancelled: null },
  ],
}

export const STATUS_LABEL = { active: 'Active', suspended: 'Suspended', cancelled: 'Cancelled' }
export const STATUS_TONE = { active: 'ok', suspended: 'warn', cancelled: 'neutral' }

export function summarise(agents) {
  const count = (s) => agents.filter((a) => a.status === s).length
  return {
    total: agents.length,
    active: count('active'),
    suspended: count('suspended'),
    cancelled: count('cancelled'),
  }
}
