/* Plans as shown in Content Studio "Manage your plan" (Figma 5697:9318) and the Billing tab
   (5355:13517). Prices follow the website pricing page. `true` renders as a check mark. */

export const PLANS = [
  {
    id: 'studio',
    rank: 1,
    name: 'Content Studio',
    price: 85,
    desc: 'Enhance your property photos & turn them into videos, web, and branded marketing.',
    groups: [
      [['Projects per year', '24'], ['Uploaded assets per project', '100']],
      [['Workspaces', '1'], ['User count', '1'], ['Free monthly AI credits', '50']],
      [['Content Studio', true], ['Integrations', true]],
      [['Agent Website', '1'], ['Property Websites', true]],
    ],
  },
  {
    id: 'plus',
    rank: 2,
    name: 'Content Studio Plus',
    price: 175,
    desc: 'For teams creating more property marketing, with more capacity.',
    groups: [
      [['Projects per year', '60'], ['Uploaded assets per project', '200']],
      [['Workspaces', '5'], ['User count', '15'], ['Free monthly AI credits', '200']],
      [['Content Studio', true], ['Integrations', true], ['API access', true]],
      [['Priority processing pipeline', true], ['Priority Customer Support', true]],
      [['Agent Website', '5'], ['Custom domain (Agent Website)', true], ['Property Websites', true]],
    ],
  },
  {
    id: 'camera',
    rank: 3,
    name: 'Content Studio & Camera',
    price: 360,
    desc: 'Unlock all immersive contents yourself; photos, floor plans, virtual tours, and 3D videos with Giraffe360 capture.',
    cameras: 1,
    groups: [
      [['Projects per year', '192'], ['Uploaded assets per project', '200']],
      [['Workspaces', '15'], ['User count', 'Unlimited'], ['Free monthly AI credits', '200']],
      [['Content Studio', true], ['Integrations', true], ['API access', true]],
      [['Priority processing pipeline', true], ['Priority Customer Support', true]],
      [['Agent Website', '15'], ['Custom domain (Agent Website)', true], ['Property Websites', true]],
    ],
    /* Photographer program: the same plan at $0 for approved partners */
    program: {
      unit: '/ photographers program',
      note: 'Free camera and subscription for approved photographers in the US and Canada.',
    },
  },
]

/* Prototype account types and the plan each one is on today. */
export const ACCOUNTS = {
  new: { label: 'New user (from website)', planId: null, rank: 0, hasBilling: false },
  demo: { label: 'Demo account (Free)', planId: 'free', rank: 0, hasBilling: false },
  plus: { label: 'Content Studio Plus (paid)', planId: 'plus', rank: 2, hasBilling: true },
}

/* Current-plan card on the Billing tab */
export const CURRENT_PLAN_CARD = {
  free: {
    name: 'Free',
    price: 0,
    renew: null,
    limits: [
      ['Projects per year', '20 / 24'],
      ['Uploaded assets per project', '25'],
      ['Workspaces', '1'],
      ['User count', '1'],
      ['Free monthly AI credits', '5'],
    ],
  },
  plus: {
    name: 'Content Studio Plus',
    price: 175,
    renew: 'Monthly, renews November 20',
    limits: [
      ['Projects per year', '20 / 60'],
      ['Uploaded assets per project', '200'],
      ['Workspaces', '5'],
      ['User count', '15'],
      ['Free monthly AI credits', '200'],
    ],
  },
}

export const INVOICES = [
  { number: 'IN0924938881923', due: 'November 13, 2025', status: 'Current', tone: 'current', total: '$50' },
  { number: 'IN0238847123994', due: 'October 13, 2025', status: 'Paid', tone: 'paid', total: '$175' },
  { number: 'IN9726488817247', due: 'September 13, 2025', status: 'Paid', tone: 'paid', total: '$175' },
]
