Chain of custody -- week 11 pack
Authored teaching scenario. The manifests, the stripping log and the checksums below were written for this exercise, not extracted from a real file or a real publishing pipeline. This is a plain, unsigned JSON manifest, not a C2PA-style cryptographically signed credential, and the audit below never claims otherwise.

manifest-before.json is the metadata recorded on image/output-7 (from week 4), deposit copy versus its public archive copy at deposit.
manifest-after.json is the metadata on the public archive copy.
stripping-log.txt is the publishing pipeline's own account of what it changed.

Compare all three before filling in audit-worksheet.csv: for each field, is
it retained, a documented removal, an undocumented change, or a field that
was never captured at any stage (and so its absence is not the stripping
operation's doing)?

reveal/ holds the computed answer. Open it after your own worksheet.
