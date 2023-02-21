/* eslint no-console: 'off' */
import { color, label, say as houston, spinner as load } from '@astrojs/cli-kit'
import { align, sleep } from '@astrojs/cli-kit/utils'

let stdout = process.stdout
/** @internal Used to mock `process.stdout.write` for testing purposes */
export function setStdout(writable: typeof process.stdout) {
  stdout = writable
}

export async function say(messages: string | string[], { clear = false, hat = '' } = {}) {
  return houston(messages, { clear, hat, stdout })
}

export async function spinner(args: { start: string; end: string; while: (...args: any) => Promise<any> }) {
  await load(args, { stdout })
}

export const title = (text: string) => align(label(text), 'end', 7) + ' '

export const log = (message: string) => stdout.write(message + '\n')

export const info = async (prefix: string, text: string) => {
  await sleep(100)
  if (stdout.columns < 80) {
    log(`${' '.repeat(5)} ${color.cyan('◼')}  ${color.cyan(prefix)}`)
    log(`${' '.repeat(9)}${color.green(text)}`)
  } else {
    log(`${' '.repeat(5)} ${color.cyan('◼')}  ${color.cyan(prefix)} ${color.green(text)}`)
  }
}

export const error = async (prefix: string, text: string) => {
  if (stdout.columns < 80) {
    log(`${' '.repeat(5)} ${color.red('▲')}  ${color.red(prefix)}`)
    log(`${' '.repeat(9)}${color.dim(text)}`)
  } else {
    log(`${' '.repeat(5)} ${color.red('▲')}  ${color.red(prefix)} ${color.dim(text)}`)
  }
}

export function printHelp({
	commandName,
	headline,
	usage,
	tables,
	description,
}: {
	commandName: string;
	headline?: string;
	usage?: string;
	tables?: Record<string, [command: string, help: string][]>;
	description?: string;
}) {
	const linebreak = () => '';
	const table = (rows: [string, string][], { padding }: { padding: number }) => {
		const split = stdout.columns < 60;
		let raw = '';

		for (const row of rows) {
			if (split) {
				raw += `    ${row[0]}\n    `;
			} else {
				raw += `${`${row[0]}`.padStart(padding)}`;
			}
			raw += '  ' + color.dim(row[1]) + '\n';
		}

		return raw.slice(0, -1); // remove latest \n
	};

	const message = [];

	if (headline) {
		message.push(
			linebreak(),
			headline
		);
	}

	if (usage) {
		message.push(linebreak(), `${color.green(commandName)} ${color.bold(usage)}`);
	}

	if (tables) {
		function calculateTablePadding(rows: [string, string][]) {
			return rows.reduce((val, [first]) => Math.max(val, first.length), 0);
		}
		const tableEntries = Object.entries(tables);
		const padding = Math.max(...tableEntries.map(([, rows]) => calculateTablePadding(rows)));
		for (const [, tableRows] of tableEntries) {
			message.push(linebreak(), table(tableRows, { padding }));
		}
	}

	if (description) {
		message.push(linebreak(), `${description}`);
	}

	log(message.join('\n') + '\n');
}
