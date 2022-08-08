const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const mkdir = require('mkdirp');

const base = path.resolve('fake-dir-base');

// Generate a bunch of directories to simulate watchpack runs against.
function makeDirectoryTree(depth, dirsPerLevel) {
	rimraf.sync(base);
	mkdir.sync(base);
	let total = 0;
	let level = [base];
	for (let i = 0; i < depth; i++) {
		let next = [];
		for (const dir of level) {
			for (let j = 0; j < dirsPerLevel; j++) {
				const subdir = path.join(dir, `subdir-${i}-${j}`);
				mkdir.sync(subdir);
				total += 1;
				next.push(subdir);
			}
		}
		level = next;
	}
	console.log(`${total} directories created`)
}

makeDirectoryTree(4, 5);
process.env.WATCHPACK_WATCHER_LIMIT = 100;

const Watchpack = require('./lib/watchpack');
const wp = new Watchpack();
wp.watch({ directories: [base] });
