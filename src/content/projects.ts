export interface ProjectMetric { label: string; value: string }
export interface Project {
  id: string
  island: 'oss-ridge' | 'monument-valley'
  title: string
  tagline: string
  problem: string
  stack: string[]
  metrics: ProjectMetric[]
  outcome: string
  link: { label: string; url: string } | null
}
export const PROJECTS: Project[] = [
  {
    id: 'harshal-mcp-proxy',
    island: 'oss-ridge',
    title: 'harshal-mcp-proxy',
    tagline: 'One gateway instead of twelve MCP servers',
    problem: 'AI coding agents juggle a dozen Model Context Protocol servers, burning tokens and setup time on every session.',
    stack: ['TypeScript', 'MCP', 'Node.js'],
    metrics: [
      { label: 'GitHub stars', value: '17★' },
      { label: 'Servers replaced', value: '12+' },
      { label: 'Token overhead cut', value: '~99%' },
      { label: 'Tools exposed', value: '6' },
    ],
    outcome: 'A single proxy serves six tools that cover the surface of 12+ upstream servers — agents connect once and spend their budget on work, not plumbing.',
    link: { label: 'View on GitHub', url: 'https://github.com/harshalrathore/harshal-mcp-proxy' },
  },
  {
    id: 'code-intel-mcp',
    island: 'oss-ridge',
    title: 'code-intel-mcp',
    tagline: 'Code intelligence as an agent tool',
    problem: 'Agents read repositories blind — no structural map, no symbol graph, just raw text.',
    stack: ['TypeScript', 'ts-morph', 'ArangoDB'],
    metrics: [
      { label: 'GitHub stars', value: '10★' },
      { label: 'Tools shipped', value: '20' },
    ],
    outcome: 'A code-intelligence server backed by a graph database gives agents twenty structural lenses over any codebase.',
    link: { label: 'View on GitHub', url: 'https://github.com/harshalrathore/code-intel-mcp' },
  },
  {
    id: 'repeato',
    island: 'monument-valley',
    title: 'Repeato',
    tagline: 'Hyperlocal commerce platform — designed, built and run solo',
    problem: 'Small local sellers need multi-tier pricing and trustworthy books without enterprise software costs.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    metrics: [
      { label: 'Transaction types in ledger', value: '40+' },
      { label: 'Pricing tiers', value: '3' },
      { label: 'Dashboard roles', value: 'RBAC' },
    ],
    outcome: 'My own product: double-entry accounting core with 40+ transaction types, three-tier pricing and role-gated dashboards — shipped end to end by me.',
    link: null,
  },
  {
    id: 'tcs-analytics',
    island: 'monument-valley',
    title: 'Client Analytics Dashboard',
    tagline: 'TCS · Assistant System Engineer · since Jan 2025',
    problem: 'Client relationship data was slow to retrieve and under-tested in delivery pipelines.',
    stack: ['React', 'Node.js', 'Testing pipelines'],
    metrics: [
      { label: 'Retrieval speed', value: '+25%' },
      { label: 'Test coverage', value: '+40%' },
    ],
    outcome: 'Shipped dashboard improvements that sped retrieval by a quarter and hardened delivery with 40% more coverage.',
    link: null,
  },
  {
    id: 'lossy-compression',
    island: 'monument-valley',
    title: 'Lossy Image Compression',
    tagline: 'Smaller images, honest quality math',
    problem: 'Image payloads dominate page weight; naive compression destroys perceptual quality.',
    stack: ['Python', 'Image codecs', 'Quality metrics'],
    metrics: [
      { label: 'Size reduction', value: '91.67%' },
      { label: 'PSNR', value: '22 dB' },
      { label: 'SSIM', value: '0.85' },
    ],
    outcome: 'Compression pipeline cutting size by 91.67% while holding PSNR 22 dB and SSIM 0.85 — quality measured, not guessed.',
    link: null,
  },
  {
    id: 'skin-zen',
    island: 'monument-valley',
    title: 'Skin Zen',
    tagline: 'Deep learning dermatology assistant',
    problem: 'Acne care advice online is anecdotal; sufferers need classification grounded in vision models.',
    stack: ['PyTorch', 'ResNet-101', 'GPT-3 API'],
    metrics: [
      { label: 'Classifier backbone', value: 'ResNet-101' },
      { label: 'Advice engine', value: 'GPT-3' },
    ],
    outcome: 'CNN classifies acne from photos; an LLM layer turns predictions into structured care recommendations.',
    link: null,
  },
]
