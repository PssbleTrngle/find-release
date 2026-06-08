# PssbleTrngle/find-release

```yaml
- uses: PssbleTrngle/find-release@v1
  id: action
  with:
    type: draft
    token: ${{ secrets.GITHUB_TOKEN }}

- run: echo ${{ steps.action.outputs.tag }}
```

## Inputs

| key    | description                                        | Default                  | Required |
| ------ | -------------------------------------------------- | ------------------------ | -------- |
| token  | the github token to be used                        | `null`                   | yes      |
| branch | the head branch of the release, pass `*` to ignore | parsed from `github.ref` | no       |
| type   | either `draft` or `released`                       | `null`                   | no       |

## Outputs

| key     | description                                | Type    |
| ------- | ------------------------------------------ | ------- |
| matched | whether or not a release was found         | boolean |
| match   | the entire github release as a JSON string | JSON    |
| tag     | the tag name of the found release          | no      |
