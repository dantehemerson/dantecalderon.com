export const getMyGithubInfo = async () => {
  try {
    const res = await fetch('http://api.dantecalderon.dev/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        {
          githubStatus {
            status
            bio
            company
            contributions
          }
          latestCommit {
            message
            createdAt
            url
          }
        }`,
      }),
    })

    const json = await res.json()
    return json.data
  } catch (err) {
    console.log('Error: ', err)
  }
}
