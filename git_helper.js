const cp = require('child_process');

try {
    console.log("Committing changes...");
    const commitOut = cp.execSync('git commit -m "update logo dan layout"').toString();
    console.log(commitOut);

    console.log("Pushing to origin main...");
    const pushOut = cp.execSync('git push origin main').toString();
    console.log(pushOut);
} catch (error) {
    console.error("Error occurred:");
    if (error.stdout) console.log(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
}
