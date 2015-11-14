# Contributing to the generator-avionic

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

## Issue tracker

+ The [issue tracker](https://github.com/reedia/generator-avionic/issues) is
the preferred channel for [bug reports](#bugs), [features requests](#features)
and [submitting pull requests](#pull-requests).

<a name="bugs"></a>
## Bug reports

+ A bug is a _demonstrable problem_ that is caused by the code in the repository.

+ Guidelines for bug reports:
 
  + **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.
  + **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.
  + **Isolate the problem** &mdash; ideally create a reduced test
   case -  a demo/example you create which reproduces the problem.


Example:

 **Short and descriptive example bug report title**

A summary of the issue and environment in which it occurs. If suitable, include the steps required to reproduce the bug.

1. This is the first step
2. This is the second step
3. Further steps, etc.
4. `<url>` - a link to the reduced test case

Any other information you want to share that is relevant to the issue being reported. This might include the lines of code that you have identified as causing the bug, and potential solutions (and your opinions on their merits).


<a name="features"></a>
## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project.

It's up to *you* really to make a strong case to convince us of the merits of this feature. Please provide as much detail and context as possible.

<a name="pull-requests"></a>
## Pull requests

Good pull requests - patches, improvements, new features - are a fantastic help.
They should remain focused in scope and avoid containing unrelated commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code), otherwise you risk spending a lot of
time working on something that the project's developers might not want to merge
into the project.

Please adhere to the coding conventions used throughout a project (indentation,
accurate comments, etc.) and any other requirements (such as test coverage).

Adhering to the following this process is the best way to get your work
included in the project:

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   + Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/server-configs-gae.git
   + Navigate to the newly cloned directory
   cd server-configs-gae
   + Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/h5bp/server-configs-gae
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description.

#### IMPORTANT
By submitting a patch, you agree to allow the project owner to license your work under the same license as that used by the project.

## Our fleet

[AVIONIC ✈](http://avionic.io) is beautifully crafted by these people and a bunch of awesome [contributors](https://github.com/reedia/generator-avionic/graphs/contributors)

[![Sebastien Rousseau](https://avatars0.githubusercontent.com/u/1394998?s=117)](http://sebastienrousseau.com) |
|:---:
[Sebastien Rousseau](https://github.com/sebastienrousseau) |

Credit also to [Thomas Maximini](http://thomasmaximini.com) for the work and inspiration surrounding the [generator-ionic-gulp](https://github.com/tmaximini/generator-ionic-gulp).

## Our Values
1. We believe perfection must consider everything.
2. We take our passion beyond Code into our daily practices.
3. We are just obsessed about creating and delivering exceptional solutions.

## History

* See [Avionic ✈ Release](https://github.com/reedia/generator-avionic/releases) list.

## License

* [MIT License](http://reedia.mit-license.org/) Copyright © Reedia Limited 2015. All rights reserved.
