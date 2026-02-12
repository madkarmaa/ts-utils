import { cancel, intro, isCancel, outro, text } from '@clack/prompts';
import { $ } from 'bun';

const HOOKS_DIR = '.githooks' as const;

const currentHooksDir = await $`git config --get core.hooksPath`
    .nothrow()
    .quiet()
    .text('utf-8');
const isAlreadySetup = currentHooksDir.trim() === HOOKS_DIR;

if (process.env.CI || isAlreadySetup) process.exit(0);

await $`git config core.hooksPath ${HOOKS_DIR}`.quiet();

const FILES_TO_UPDATE = [
    'package.json',
    'README.md',
    'bun.lock',
    'LICENSE'
].map((file) => file.trim());

intro('Setup');

const packageDescription = await text({
    message: 'Provide a short description of the package:'
});

if (isCancel(packageDescription)) {
    cancel('Operation cancelled.');
    process.exit(1);
}

const githubUrl = await $`git remote get-url origin`.quiet().text('utf-8');

const parts = githubUrl.trim().split('/');
const owner = parts[parts.length - 2].trim();
const repoName = parts[parts.length - 1].replace('.git', '').trim();

const year = new Date().getFullYear();

for (const filePath of FILES_TO_UPDATE)
    try {
        let content = await Bun.file(filePath).text();

        content = content
            .replaceAll('{{package.name}}', `@${owner}/${repoName}`)
            .replaceAll('{{package.description}}', packageDescription.trim())
            .replaceAll('{{github.url}}', githubUrl.trim())
            .replaceAll('{{github.owner}}', owner)
            .replaceAll('{{github.repo}}', repoName)
            .replaceAll('{{year}}', year.toString());

        await Bun.write(filePath, content);
    } catch {}

outro('Setup complete!');
