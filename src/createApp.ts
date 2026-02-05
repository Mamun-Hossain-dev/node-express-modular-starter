import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createApp(args: string[]) {
    const projectName = args[0];

    if (!projectName) {
        console.error('Please specify the project directory:');
        console.error('  npx create-node-express-modular <project-directory>');
        process.exit(1);
    }

    const targetDir = path.join(process.cwd(), projectName);
    const templateDir = path.join(__dirname, '../template');

    if (fs.existsSync(targetDir)) {
        console.error(`Directory ${projectName} already exists.`);
        process.exit(1);
    }

    console.log(`Creating a new Node Express project in ${targetDir}...`);

    try {
        // Copy template directory
        await fs.copy(templateDir, targetDir);

        // Rename _gitignore back to .gitignore
        const gitignorePath = path.join(targetDir, '_gitignore');
        const targetGitignorePath = path.join(targetDir, '.gitignore');
        if (fs.existsSync(gitignorePath)) {
            await fs.move(gitignorePath, targetGitignorePath);
        }



        // Update package.json name
        const pkgPath = path.join(targetDir, 'package.json');
        if (fs.existsSync(pkgPath)) {
            const pkg = await fs.readJson(pkgPath);
            pkg.name = projectName;
            await fs.writeJson(pkgPath, pkg, { spaces: 2 });
        }

        console.log('\nSuccess! Project created.');
        console.log(`\nNext steps:`);
        console.log(`  cd ${projectName}`);
        console.log('  npm install');
        console.log('  npm run dev');
    } catch (err) {
        console.error('Error creating project:', err);
        process.exit(1);
    }
}
