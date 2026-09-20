# Process overview

SLOP8350, "Generation Loss," asks two questions: are these copies
identical, and what evidence shows one was made from another? Each week
asks them about something specific: a legibility card, five copies of the
*Ordinance of the Copy-House*, the file records for Output 7. I replaced
the starter content with this course
([`4b30563`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/4b30563)).
My standard was that students should be able to investigate a claim using
the materials provided.

Week 4 passed 75 tests and still could not be done. Nothing in the pack
could produce the predictions it withheld, the evidence menu offered three
items the pack lacked, and one forensic claim was not defensible.
The tests checked the authored data, never whether a student could act. I
published the predictions, shipped each evidence item as its own file, and replaced the claim with a record the exercise supports
([`d7863b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/d7863b6)).
A second review found evidence marked inconclusive whose contents read
`quality=78` — decisive between the two processing routes. I gave both the
same final save setting and added checks comparing labels with the files
students open, then reintroduced the faults to confirm the checks caught
them
([`11fa9c5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/11fa9c5)).
My standard now covered internal consistency and whether students had what
they needed to act.

Other courses shaped my instructions to the agent. From Calling Bullshit I
took two `CLAUDE.md` rules: give every reading a locator plus a link or
original summary, and name each week's example specifically
([`7d0a745`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7d0a745)).
My policy already said a resolving URL is not proof of a claim; it said
nothing about a correctly cited reading a student cannot reach. The
reading rule gained an automated check for citation wording; source
accessibility and example selection remain editorial
([`ca7cbb2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/ca7cbb2)).
CS 007's slide-only delivery decided me against it: a week's content here
is its evidence pack, not its lecture. I also required every deck to end
with a written walkthrough. The deck test checks that linked files exist
and carry the walkthrough heading; the section's content and placement
remain editorial
([`9ec7c71`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9ec7c71)).

To protect the predict-then-check sequence I removed direct answer links
from several workshops and added a test scanning built pages for links
into `reveal/` folders
([`bf9f600`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/bf9f600),
[`7c7c89f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7c7c89f)).
Unlinking was safe but cost the feedback students learn from, so instead I
made the links unlock once a student locks in a prediction. The answers
stay publicly reachable; the lock guides the order of learning, not access
to the files
([`671776e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/671776e),
[`08195f5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/08195f5)).
Week 1's answer sits outside that test's scope, so I checked it
separately: a Node script simulating the page confirmed the link stayed
inactive before a prediction was locked and carried the correct path after
([`9b257b5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9b257b5),
[`4c83ef8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/4c83ef8)).

In a Week 6 screenshot the comparison tool sat beside the five-document
investigation, implying it checked the students' evidence; it actually
used three example documents. I asked for it to move beside its own
example and both sections to say which documents it used, and checked the
generated page before accepting
([`9896cef`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9896cef),
[`37bb699`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/37bb699)).

I added the prediction-comparison feature only to the five workshops that
already publish their findings, reusing that text beside the student's
prediction, and kept it out of the other seven so no comparison invented a
result or released an answer early
([`0718709`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/0718709)).
These decisions shaped how I directed the agent: supply usable evidence,
label examples clearly, back each accepted change with a fitting check.

Every check here is author verification: file and page inspection, and a
simulated browser. Nobody but me has attempted these activities, so the
standard I set remains a reasoned claim, not an observed result.
