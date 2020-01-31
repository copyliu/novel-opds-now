/**
 * Created by user on 2020/1/31.
 */

import {
	Worker, isMainThread, parentPort, workerData,
} from 'worker_threads';
import FastGlob from '@bluelovers/fast-glob/bluebird';
import { join, parse, normalize, sep, relative } from "path";
import { OUTPUT_DIR } from '../../lib/const';
import { EnumNovelSiteList } from 'novel-downloader/src/all';
import { readFile, writeFile, rename } from 'fs-extra';
import Bluebird from 'bluebird';
import doSegment from '../../lib/doSegment';
import { cn2tw_min } from '../../lib/cn2tw_min';
import handleContext from '../../lib/doLayout';

const handleAsync = function handleAsync(id: string | number, IDKEY: string, outputDir = OUTPUT_DIR): Bluebird<boolean>
{
	return null;
};

export default handleAsync

type IWorkerData = {
	id?: string;
	fn?: never;
	value: string[]
	skipSegment: string[],
	skipContext: string[],
	outputDir: string,
}

if (isMainThread)
{
	const __worker = (() =>
	{
		let p = parse(__filename);
		return join(p.dir, p.name + '.js')
	})();

	function handleAsync(id: string | number, IDKEY: string, outputDir: string): Bluebird<boolean>
	{
		return _list(id, IDKEY, outputDir)
			.then(_rename)
			.then(v => _split(v, outputDir))
			.thenReturn(true)
		;
	}

	function _list(id: string | number, IDKEY: string, outputDir)
	{
		IDKEY = IDKEY.split('/')[0];

		let cwd = join(outputDir, IDKEY, String(id));

		return FastGlob([
			'**/*.txt',
		], {
			cwd,
			absolute: true,
		})
			.tap(list =>
			{
				if (list.length === 0)
				{
					return Promise.reject(`can't found any file, ${{
						siteID: IDKEY,
						id,
						cwd,
					}}`)
				}
			})
			;
	}

	async function _rename(list: string[])
	{
		return Bluebird.resolve(list)
			.map(file => {
				file = normalize(file);
				let p = parse(file);
				let file_new = join(p.dir, cn2tw_min(p.name) + p.ext);
				return rename(file, file_new)
					.then(value => file_new)
					.catch(e => file)
				;
			})
		;
	}

	async function _split(list: string[], outputDir: string, skipSegment: string[] = [], skipContext: string[] = []): Promise<string[]>
	{
		if (!list.length)
		{
			return list;
		}

		let ids: number[] = await _process<{ index: number }[]>({
				value: list,
				skipSegment,
			skipContext,
			outputDir,
			})
			.map(v => v.index)
		;

		if (ids.length || skipContext && skipContext.length)
		{
			list = list.filter((value, index) => {

				if (skipContext && skipContext.includes(value))
				{
					return false;
				}

				return !ids.includes(index)
			});
		}

		if (skipSegment && skipSegment.length)
		{
			list.forEach((value, index) => {

				if (skipSegment.includes(value))
				{
					skipContext = skipContext || [];
					skipContext.push(value)
				}

			});
		}

		if (!ids.length && list.length)
		{
			skipSegment = skipSegment || [];
			skipSegment.push(list[0]);
		}

		return _split(list, outputDir, skipSegment, skipContext)
	}

	function _process<T extends any[]>(workerData: IWorkerData): Bluebird<T>
	{
		return new Bluebird<T>((resolve, reject) =>
		{
			const worker = new Worker(__worker, {
				workerData,
			});

			let timer = setTimeout(resolve, 60 * 1000);
			const values = [] as T;

			worker.on('message', (v) =>
			{
				values.push(v);
			});
			worker.on('error', (e) =>
			{
				clearTimeout(timer);
				if (e)
				{
					console.error(`Worker error`, e);
				}
				// @ts-ignore
				resolve(values);
			});
			worker.on('exit', (code) =>
			{
				clearTimeout(timer);
				if (code !== 0)
				{
					console.error(`Worker stopped with exit code ${code}`)
				}
				// @ts-ignore
				resolve(values);
			});

		});
	}

	exports.default = handleAsync
}
else
{
	let {
		fn,
		value,
		skipSegment,
		skipContext,
		outputDir,
	} = workerData as IWorkerData;

	function _handle(list: string[])
	{
		return Bluebird.resolve(list)
			.then(async (list) =>
			{

				//const cn2tw_min = await import('../../lib/cn2tw_min').then(v => v.default);
				const doSegment = await import('../../lib/doSegment').then(v => v.default);
				const handleContext = await import('../../lib/doLayout').then(v => v.default);

				return Bluebird.resolve(list)
					.each(async (file, index) =>
					{

						console.dir(relative(outputDir, file));

						let text = await readFile(file, 'utf8');

						if (!(skipSegment && skipSegment.includes(file)))
						{
							text = await doSegment(text);
						}

						if (!(skipContext && skipContext.includes(file)))
						{
							text = await handleContext(text);
						}

						text = await cn2tw_min(text);

						await writeFile(file, text);

						parentPort.postMessage({
							index,
						});
					})
					;

			})
			;

	}

	_handle(value)
}