# Process overview

SLOP8350, "Generation Loss," asks two questions: are these copies
identical, and what evidence shows one was made from another? Each week
asks them about something specific: a legibility card, five copies of the
*Ordinance of the Copy-House*, the file records for Output 7. I replaced
the starter content with this course
([`4b30563`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/4b30563)).
My standard was that students should be able to investigate a claim using
the materials provided.

Reviewing Week 4 after 75 passing tests sharpened that standard. I supplied
the predictions students needed, added the evidence files they would inspect,
and replaced a forensic claim with a documented record suited to the exercise.
These changes made each investigation step traceable to supplied material
([`d7863b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/d7863b6)).
A second review found evidence marked inconclusive whose contents read
`quality=78` — decisive between the two processing routes. I gave both the
same final save setting and added checks comparing labels with the files
students open. Deliberately reintroducing
faults confirmed that the new checks detected them; I then restored the
corrected version
([`11fa9c5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/11fa9c5)).
My acceptance standard now covered both internal consistency and whether
students had the evidence needed to act.

Other courses helped shape my instructions to the agent. From Calling
Bullshit, I adopted two `CLAUDE.md` rules: give readings a page or section
reference plus a link or original summary, and name each week's example
specifically
([`7d0a745`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7d0a745)).
This joined source accuracy with access to the reading. The reading rule
gained an automated check for citation wording; source accessibility and
clear example selection remain editorial responsibilities
([`ca7cbb2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/ca7cbb2)).
Reviewing CS 007's slide-based delivery helped me choose evidence packs
alongside lectures, giving students the files needed for investigation
([`7d0a745`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7d0a745)).
I also required decks to end with a written walkthrough. The deck test
checks that linked files exist and contain the walkthrough heading;
the section's content and placement remain editorial responsibilities
([`9ec7c71`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9ec7c71)).

I strengthened the prediction-before-feedback sequence by removing direct
answer links from several workshops and adding a test scanning built pages
for links into answer folders named `reveal/`
([`bf9f600`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/bf9f600),
[`7c7c89f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/7c7c89f)).
To preserve access to useful feedback, I then introduced links that unlock
after students lock in a prediction in their browser. The answers remain
publicly accessible; the lock guides the order of learning rather than
restricting access to the files
([`671776e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/671776e),
[`08195f5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/08195f5)).
Week 1's top-level `worked-answer.md` needed a separate check. A Node script
simulating webpage elements confirmed both states: the answer link stayed
inactive before a prediction was locked and activated with the correct path
afterwards
([`9b257b5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9b257b5),
[`4c83ef8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/4c83ef8)).

In a Week 6 screenshot, the comparison tool appeared beside the five-document
investigation, suggesting it checked the students' evidence. It actually used
three example documents. I asked for it to move beside its example and for
both sections to explain which documents it used. Checking the generated page
confirmed the new position. This aligned what the page communicated with what
the tool actually did
([`9896cef`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/9896cef),
[`37bb699`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/37bb699)).

I added the prediction-comparison feature to the five workshops that already
displayed expected findings, reusing that text alongside the student's prediction.
I kept it out of the other seven so each comparison used an existing public
finding and preserved the planned timing of answer releases
([`0718709`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-SharmaKunal14/commit/0718709)).
Together, these decisions shaped how I directed the agent: supply usable
evidence, keep examples clearly labelled, and support each accepted change
with a check suited to the teaching purpose.

Every check reported here is author verification — file and page
inspection, and a simulated browser. Nobody but me has attempted these
activities, so the standard I set remains a reasoned claim, not an
observed result.
