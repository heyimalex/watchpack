// Reproduce FSWatcher.close slowness. Prints csv.

const fs = require('fs');
const { performance } = require('perf_hooks');

const watcherCount = 5000;

const watchers = [];
for (let i = 0; i < watcherCount; i++) {
	watchers.push(fs.watch(process.cwd()));
}

watchers.forEach((watcher, idx) => {
	const start = performance.now();
	watcher.close();
	const duration = performance.now() - start;
	console.log(`${watcherCount - idx},${duration}`);
})