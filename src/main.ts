import * as core from '@actions/core'
import {Octokit} from '@octokit/core'

async function run(): Promise<void> {
  try {
    const owner = core.getInput('owner', {required: true})
    const repo = core.getInput('repo', {required: true})
    const token = core.getInput('token', {required: true})
    const tag = core.getInput('tag', {required: true})
    const ref = core.getInput('ref', {required: true})

    const octokit = new Octokit({auth: token})

    const result = await octokit.request(
      'GET /repos/{owner}/{repo}/git/ref/{ref}',
      {
        owner,
        repo,
        ref: `heads/${ref}`
      }
    )

    let sha = ref

    if (
      result.status === 200 &&
      result.data.ref &&
      result.data.object.type === 'commit'
    ) {
      sha = result.data.object.sha
    }

    await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
      owner,
      repo,
      ref: `refs/tags/${tag}`,
      sha
    })
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

run()
