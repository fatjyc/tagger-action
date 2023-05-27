# GitHub Tagger Action

Tags the commit with a given ref

## Getting Started

To use, create a workflow (eg: `.github/workflows/label.yml` see [Creating a Workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file)) and add a step like 'tag commit' on the below sample. A token will be needed so the workflow can make calls to GitHub's rest API.

```yaml
name: 'My workflow'

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Tag commit
        uses: fatjyc/github-tagger@v0.0.1
        with:
          repo: 'repo'
          owner: 'owner'
          token: 'token'
          ref: 'ref'
          tag: 'my_tag'
```
