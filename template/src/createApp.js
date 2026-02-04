import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createApp(args) {
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

        // Rename _env to .env
        const envPath = path.join(targetDir, '_env');
        const targetEnvPath = path.join(targetDir, '.env');
        if (fs.existsSync(envPath)) {
            await fs.move(envPath, targetEnvPath);
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
