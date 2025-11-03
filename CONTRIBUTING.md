# Contributing

Thank you so much for taking the time to read and contribute to this project! We deeply appreciate your interest in making this project better. By following these guidelines, we can ensure that everyone has a smooth, productive, and enjoyable experience collaborating together. Let's dive in and see how you can contribute!

## How to Contribute

We believe that open-source collaboration thrives when contributions are clear, structured, and in line with a common vision. Whether you're fixing a bug, suggesting an improvement, or submitting a new feature, we encourage you to contribute in the best possible way.

### Open an Issue

Before jumping into development, we recommend that you **open an issue**. This serves as the first step in the collaboration process. By opening an issue, you're ensuring that everyone is on the same page and aware of the work that is being proposed. It helps reduce the chances of duplicating work and fosters an open discussion where everyone, whether experienced or new to the project, can participate.

- **Provide a clear description** of the issue or feature request.
- **Share steps to reproduce** (for bugs) or **expected behavior** (for feature requests).
- **Label issues** with appropriate tags (bug, enhancement, help wanted, etc.).

By opening an issue first, you invite feedback and collaboration, helping to guide your efforts toward the most effective solution.

### Scope Your Work

Once the issue is open, it's time to get to work! **Scope your work** so that each change can be described in a single commit message. This is crucial as we will be squashing commits when merging pull requests. The goal is to keep each change atomic and manageable so it can be described with a concise commit message.

For an example of how to structure your commits, we follow the [Conventional Commits](https://conventionalcommits.org/) style. This will help maintain clarity and uniformity across the project.

Here's a basic breakdown of commit message format:
- **type(scope): message**
  - **type**: What the commit is doing, e.g., `fix`, `feat`, `docs`, `test`, or `refactor`.
  - **scope**: A brief reference to the affected part of the codebase (e.g., `api`, `sc`, `wallet`).
  - **message**: A short, clear description of what is being done.

By following this style, we make it easier for everyone to understand the purpose of each change and how it fits into the bigger picture.

### Work from `dev`

To keep things organized, **work from the `dev` branch** for all development work. Here's how you can proceed:

1. **Create a new branch off `dev`**:
   - This helps to ensure that you're working on the latest version of the codebase and avoids conflicts with other contributors.
   - Branches should have descriptive names like `feature/add-new-endpoint` or `bugfix/fix-null-pointer`.

2. **All changes should stay on this new branch**:
   - Make sure you commit your work regularly.
   - Once your work is done, submit a **Pull Request (PR)** from this branch to either `dev` (for new features) or `master` (for bug fixes).

During the development process, make sure to follow these guidelines:
- **Format your code** using the linter: `pnpm run lint`.
- **Ensure unit tests pass** by running `pnpm run test:unit`. This will check that individual components function as expected.
- **Before submitting your PR**, run `pnpm run test` to ensure all integration tests pass as well. This helps to verify that the system works as a whole. Avoid running integration tests in "watch mode" since they interact with the blockchain and perform real transactions, which should only be done in the final test step.

### Submit Your Pull Request (PR)

Once your work is ready, it's time to **submit your PR**. This is where the real magic happens! When creating your PR, make sure to:

1. **Title the PR** with a conventional commit message. This is a clear way to communicate the changes you've made.

   Example:
   ```
   feat(wallet): add support for multi-currency transactions
   ```

2. **Choose the correct target branch**:
   - For **bug fixes**, submit your PR to the `master` branch.
   - For **new features**, submit it to the `dev` branch.

3. **Review your PR** before submitting:
   - Check that your code follows the style guide and adheres to the project’s standards.
   - Ensure that the description clearly explains the purpose of the PR and any relevant details.

### And You Are Done!

Once your PR has been submitted, the maintainer will review your work and provide feedback. We may ask for some changes before merging, but rest assured, your contribution will be reviewed with care and respect. After merging, your change will become part of the project!

We appreciate every contribution, no matter how big or small, and encourage you to submit more PRs if you have more ideas to improve the project. Thank you for being a part of the community and helping make this project better!

---

We truly appreciate your efforts and look forward to seeing the improvements and features you bring to the table. If you have any questions or need further clarification, feel free to reach out. Happy coding!

---

**Made with ❤️ by the EpicChain Labs Team**