import got from 'got';
const getData = async () => {
	try {
		const res = await got
			.get('https://jsonplaceholder.typicode.com/posts/1')
			.json();
		console.log(res);
	} catch (err) {
		console.log(err);
	}
};

getData();