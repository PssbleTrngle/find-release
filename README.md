# PssbleTrngle/find-release

```yaml
- uses: PssbleTrngle/find-release
  id: action
  with:
    type: draft
    token: ${{ secrets.GITHUB_TOKEN }}

- run: echo ${{ steps.action.outputs.tag }}
```

## Inputs

| key    | description                                           | Required |
| ------ | ----------------------------------------------------- | -------- |
| token  | the github token to be used                           | yes      |
| branch | the head branch this release has been created against | no       |
| type   | either `draft` or `released`                          | no       |

## Outputs

| key     | description                                | Type    |
| ------- | ------------------------------------------ | ------- |
| matched | whether or not a release was found         | boolean |
| match   | the entire github release as a JSON string | JSON    |
| tag     | the tag name of the found release          | no      |
