# Analysis -- week 11

Authored teaching scenario. The manifests, the stripping log and the checksums below were written for this exercise, not extracted from a real file or a real publishing pipeline. This is a plain, unsigned JSON manifest, not a C2PA-style cryptographically signed credential, and the audit below never claims otherwise.

## Audit worksheet, computed

| Field | In before | In after | Logged as changed | Judgement |
|---|---|---|---|---|
| fileName | true | true | false | retained |
| width | true | true | false | retained |
| height | true | true | false | retained |
| colorProfile | true | true | false | retained |
| software | true | false | false | undocumented-change |
| contributorId | true | false | true | documented-removal |
| depositTimestamp | true | false | true | documented-removal |
| gpsCoordinates | true | true | false | never-captured |
| cameraModel | true | true | false | never-captured |
| metadataChecksum | true | true | false | undocumented-change |
| creationTool | false | true | false | undocumented-change |

The stripping log names two operations, and the audit confirms both: contributorId and depositTimestamp are present in the deposit manifest and absent from the public manifest, exactly as logged. But the log's account of 'what changed' is incomplete. Two further changes exist between the manifests that the log does not mention: the software field was renamed to creationTool (the value survived, only the key changed), and metadataChecksum differs, because it is computed over the whole visible field set and that set changed. Neither is a lie -- the log may simply never have been written to track renames or derived checksums -- but a reader who trusted the log's list as a complete account of the diff would miss both.

## Missing is not false

gpsCoordinates and cameraModel are null in both manifests. That is not the stripping operation's doing, and it is not evidence that a location or a camera was concealed -- per week 4, this output never carried that data at any retained stage. A provenance audit that logs every null field as 'stripped' would manufacture a suspicious history out of a specimen that never had the data to lose.

## Not a signature

Nothing here is cryptographically signed. Both manifests are plain JSON, editable by anyone with file access, and the checksum is a plain SHA-256 digest with no key behind it -- it detects an accidental mismatch between a manifest and the fields it claims to describe, and nothing else. A C2PA-style credential binds a manifest to a signer's key so that tampering after signing is detectable without trusting the file's own claims; this manifest asserts nothing about who wrote it or when, and the audit's conclusions are bounded accordingly.
