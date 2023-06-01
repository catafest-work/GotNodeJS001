import got from 'got';
import fs from 'node:fs';
import {pipeline as streamPipeline} from 'node:stream/promises';

const url = 'https://jsonplaceholder.typicode.com/posts/1';

// using got.get
const getData = async () => {
	try {
		const res = await got
			.get(url)
			.json();
		console.log(res);
	} catch (err) {
		console.log(err);
	}
};

const data = getData();

// using got.stream
const stream = got.stream(url)
  .once('error', error => {
    console.error(error.response.statusCode);
  });

const outStream = fs.createWriteStream('posts.json');

stream.on('data', chunk => {
  outStream.write(chunk);
});

stream.on('end', async () => {
  outStream.end();
  console.log('Receiving data completed.');
  try {
    await streamPipeline(stream, outStream);
    console.log('Data written to posts.json file.');
  } catch (error) {
    console.error(error);
  }
});