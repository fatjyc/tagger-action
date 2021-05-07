import * as core from '@actions/core'
import {Octokit} from '@octokit/rest'

async function run(): Promise<void> {
  const owner = core.getInput('owner', {required: true})
  const repo = core.getInput('repo', {required: true})
  const token = core.getInput('token', {required: true})
  const tag = core.getInput('tag', {required: true})
  const ref = core.getInput('ref', {required: true})

  const octokit = new Octokit({auth: token})

  octokit.rest.git
    .getRef({owner, repo, ref})
    .then(value => {
      const sha = value.data.object.sha
      octokit.rest.git
        .createRef({owner, repo, ref: `refs/tags/${tag}`, sha})
        .catch(error => console.error('create ref error, ', error))
    })
    .catch(error => {
      console.error('get ref error, ', error)
    })
}

run()
