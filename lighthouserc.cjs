module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      url: ['http://localhost:4173/'],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.5 }],
        'categories:best-practices': ['error', { minScore: 0.5 }],
        'categories:accessibility': ['error', { minScore: 0.5 }],
      },
    },
    upload: { target: 'temporary-public-storage' },
  },
}
